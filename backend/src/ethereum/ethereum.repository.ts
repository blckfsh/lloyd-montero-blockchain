import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/common/services/prisma.service'

@Injectable()
export class EthereumRepository {
  constructor(private readonly prismaService: PrismaService) {}

  storeBalance(walletAddress: string, balance: number) {
    return this.prismaService.balance.upsert({
      where: { walletAddress },
      create: {
        walletAddress,
        balance,
      },
      update: {
        balance,
      },
    })
  }
}
