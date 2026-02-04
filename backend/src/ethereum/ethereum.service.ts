import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { RedisService } from '@/common/services/redis.service'
import { ViemService } from '@/common/services/viem.service'
import { EthereumRepository } from '@/ethereum/ethereum.repository'

@Injectable()
export class EthereumService {
  private readonly latestBlockKey = 'ethereum:latestBlockNumber'
  private readonly latestGasKey = 'ethereum:latestGasPrice'

  constructor(
    private readonly viemService: ViemService,
    private readonly redisService: RedisService,
    private readonly ethereumRepository: EthereumRepository,
  ) {}

  async storeAccount(body: { address: `0x${string}` }) {
    try {
      const publicClient = this.viemService.createPublicClient()
      const [balance, cachedBlockNumber, cachedGasPrice] = await Promise.all([
        publicClient.getBalance({ address: body.address }),
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

      await this.ethereumRepository.storeBalance(body.address, Number(balance))

      // Convert BigInt to string to avoid JSON serialization issues
      return {
        balance: balance.toString(),
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
}

