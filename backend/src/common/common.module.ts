import { Module } from '@nestjs/common'
import { PrismaService } from '@/common/services/prisma.service'
import { RedisService } from '@/common/services/redis.service'
import { ViemService } from '@/common/services/viem.service'
import { ZenstackService } from '@/common/services/zenstack.service'

@Module({
  providers: [PrismaService, RedisService, ViemService, ZenstackService],
  exports: [PrismaService, RedisService, ViemService, ZenstackService],
})
export class CommonModule {}
