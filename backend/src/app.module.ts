import { Module } from '@nestjs/common';
import { ConfigifyModule } from '@itgorillaz/configify';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EthereumModule } from './ethereum/ethereum.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ConfigifyModule.forRootAsync(),
    EthereumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
