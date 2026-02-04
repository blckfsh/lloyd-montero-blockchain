import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createPublicClient, http } from 'viem'
import { baseSepolia, mainnet } from 'viem/chains'
import { AlchemyConfig } from '@/common/config/alchemy.config'

@Injectable()
export class ViemService {
  constructor(
    private readonly configService: ConfigService,
    private readonly alchemyConfig: AlchemyConfig,
  ) {}

  createPublicClient() {
    const nodeEnv = this.configService.get<string>('NODE_ENV')
    const isProduction = nodeEnv === 'production'
    const chain = isProduction ? mainnet : baseSepolia
    const rpcUrl = isProduction
      ? `https://eth-mainnet.g.alchemy.com/v2/${this.alchemyConfig.alchemyApiKey}`
      : `https://base-sepolia.g.alchemy.com/v2/${this.alchemyConfig.alchemyApiKey}`

    return createPublicClient({
      chain,
      transport: http(rpcUrl),
    })
  }
}
