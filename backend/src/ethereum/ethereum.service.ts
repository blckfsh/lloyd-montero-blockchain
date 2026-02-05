import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config'
import { RedisService } from '@/common/services/redis.service'
import { ViemService } from '@/common/services/viem.service'
import { EthereumRepository } from '@/ethereum/ethereum.repository'
import { tokenAbi } from '@/common/abi/token';

@Injectable()
export class EthereumService {
  private readonly latestBlockKey = 'ethereum:latestBlockNumber'
  private readonly latestGasKey = 'ethereum:latestGasPrice'

  constructor(
    private readonly viemService: ViemService,
    private readonly redisService: RedisService,
    private readonly ethereumRepository: EthereumRepository,
    private readonly configService: ConfigService,
  ) {}

  async storeAccount(body: { address: `0x${string}` }) {
    try {
      const publicClient = this.viemService.createPublicClient()
      const tokenAddress =
        this.configService.getOrThrow<string>('TOKEN_ADDRESS') as `0x${string}`
      const [balance, tokenBalance, cachedBlockNumber, cachedGasPrice] =
        await Promise.all([
          publicClient.getBalance({ address: body.address }),
          publicClient.readContract({
            address: tokenAddress,
            abi: tokenAbi,
            functionName: 'balanceOf',
            args: [body.address],
          }),
          this.redisService.get(this.latestBlockKey),
          this.redisService.get(this.latestGasKey),
        ])

      const latestBlockNumberPromise = cachedBlockNumber
        ? Promise.resolve(BigInt(cachedBlockNumber))
        : publicClient.getBlockNumber()
      const latestGasPricePromise = cachedGasPrice
        ? Promise.resolve(BigInt(cachedGasPrice))
        : publicClient.getGasPrice()
      

      const [latestBlockNumber, latestGasPrice] = await Promise.all([
        latestBlockNumberPromise,
        latestGasPricePromise,
      ])

      const cacheWrites: Promise<void>[] = []
      const ttlSeconds = this.redisService.getDefaultTtlSeconds()

      if (!cachedBlockNumber) {
        cacheWrites.push(
          this.redisService.set(
            this.latestBlockKey,
            latestBlockNumber.toString(),
            ttlSeconds,
          ),
        )
      }

      if (!cachedGasPrice) {
        cacheWrites.push(
          this.redisService.set(
            this.latestGasKey,
            latestGasPrice.toString(),
            ttlSeconds,
          ),
        )
      }

      if (cacheWrites.length) {
        await Promise.all(cacheWrites)
      }

      await this.ethereumRepository.storeBalance(
        body.address,
        Number(balance),
        Number(tokenBalance),
      )

      // Convert BigInt to string to avoid JSON serialization issues
      return {
        balance: balance.toString(),
        tokenBalance: tokenBalance.toString(),
        latestBlockNumber: latestBlockNumber.toString(),
        latestGasPrice: latestGasPrice.toString(),
      }
    } catch (error) {
      console.error(error)
      throw new ServiceUnavailableException(
        'Failed to fetch or store account data',
      )
    }
  }

  async getBalance(address: `0x${string}`) {
    const balanceRecord = await this.ethereumRepository.getBalance(address)

    if (!balanceRecord) {
      return {
        balance: '0',
        tokenBalance: '0',
      }
    }

    return {
      balance: balanceRecord.balance.toString(),
      tokenBalance: (balanceRecord.tokenBalance ?? 0).toString(),
    }
  }
}

