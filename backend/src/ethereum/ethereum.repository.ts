import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/common/services/prisma.service'

@Injectable()
export class EthereumRepository {
  constructor(private readonly prismaService: PrismaService) {}

  getBalance(walletAddress: string) {
    return this.prismaService.balance.findUnique({
      where: { walletAddress },
      select: {
        balance: true,
        tokenBalance: true,
      },
    })
  }

  storeBalance(
    walletAddress: string,
    balance: number,
    tokenBalance?: number,
  ) {
    const tokenBalanceData =
      tokenBalance === undefined ? {} : { tokenBalance }

    return this.prismaService.balance.upsert({
      where: { walletAddress },
      create: {
        walletAddress,
        balance,
        ...tokenBalanceData,
      },
      update: {
        balance,
        ...tokenBalanceData,
      },
    })
  }
}
