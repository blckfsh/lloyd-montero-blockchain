import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ViemService } from '@/common/services/viem.service';
import { EthereumRepository } from '@/ethereum/ethereum.repository';

@Injectable()
export class EthereumService {
  constructor(
    private readonly viemService: ViemService,
    private readonly ethereumRepository: EthereumRepository,
  ) {}

  async storeAccount(body: { address: `0x${string}` }) {
    try {
      const publicClient = this.viemService.createPublicClient();
      const [balance, latestBlockNumber, latestGasPrice] = await Promise.all([
        publicClient.getBalance({ address: body.address }),
        publicClient.getBlockNumber(),
        publicClient.getGasPrice(),
      ]);

      await this.ethereumRepository.storeBalance(
        body.address,
        Number(balance),
      );

      // Convert BigInt to string to avoid JSON serialization issues
      return {
        balance: balance.toString(),
        latestBlockNumber: latestBlockNumber.toString(),
        latestGasPrice: latestGasPrice.toString(),
      };
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException(
        'Failed to fetch or store account data',
      );
    }
  }
}

