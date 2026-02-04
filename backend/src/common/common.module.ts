import { Module } from '@nestjs/common'
import { PrismaService } from '@/common/services/prisma.service'
import { ViemService } from '@/common/services/viem.service'
import { ZenstackService } from '@/common/services/zenstack.service'

@Module({
  providers: [PrismaService, ViemService, ZenstackService],
  exports: [PrismaService, ViemService, ZenstackService],
})
export class CommonModule {}
