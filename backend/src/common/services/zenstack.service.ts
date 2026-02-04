import { Injectable } from '@nestjs/common'
import { enhance } from '@zenstackhq/runtime'
import { PrismaService } from './prisma.service'

@Injectable()
export class ZenstackService {
  constructor(private readonly prismaService: PrismaService) {}

  createClient(user?: unknown) {
    return enhance(this.prismaService, { user })
  }
}

