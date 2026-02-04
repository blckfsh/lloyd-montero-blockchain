import { Module } from '@nestjs/common';
import { CommonModule } from '@/common/common.module';
import { EthereumController } from '@/ethereum/ethereum.controller';
import { EthereumRepository } from '@/ethereum/ethereum.repository';
import { EthereumService } from '@/ethereum/ethereum.service';

@Module({
  imports: [CommonModule],
  controllers: [EthereumController],
  providers: [EthereumRepository, EthereumService],
})
export class EthereumModule {}

