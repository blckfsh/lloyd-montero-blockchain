import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createClient, RedisClientType } from 'redis'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(RedisService.name)
  private readonly client: RedisClientType
  private readonly defaultTtlSeconds: number
  private ready = false

  constructor(private readonly configService: ConfigService) {
    const redisUrl =
      this.configService.get<string>('REDIS_URL') ?? 'redis://localhost:6379'

    this.client = createClient({ url: redisUrl })
    this.defaultTtlSeconds = Number(
      this.configService.get<string>('REDIS_CACHE_TTL_SECONDS') ?? 10,
    )

    this.client.on('ready', () => {
      this.ready = true
      this.logger.log('Connected to Redis')
    })

    this.client.on('error', (error) => {
      this.ready = false
      this.logger.error(
        'Redis client error',
        error instanceof Error ? error.stack : String(error),
      )
    })
  }

  getDefaultTtlSeconds() {
    return this.defaultTtlSeconds
  }

  async onModuleInit() {
    try {
      await this.client.connect()
    } catch (error) {
      this.ready = false
      this.logger.warn(
        `Redis connection failed, caching disabled: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
  }

  async onModuleDestroy() {
    if (this.client.isOpen) {
      await this.client.quit()
    }
  }

  async get(key: string): Promise<string | null> {
    if (!this.ready) {
      return null
    }

    try {
      return await this.client.get(key)
    } catch (error) {
      this.logger.warn(
        `Redis get failed for ${key}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
      return null
    }
  }

  async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
    if (!this.ready) {
      return
    }

    try {
      if (ttlSeconds && ttlSeconds > 0) {
        await this.client.set(key, value, { EX: ttlSeconds })
      } else {
        await this.client.set(key, value)
      }
    } catch (error) {
      this.logger.warn(
        `Redis set failed for ${key}: ${
          error instanceof Error ? error.message : String(error)
        }`,
      )
    }
  }
}

