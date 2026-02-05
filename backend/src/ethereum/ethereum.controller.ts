import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StoreEthereumAccountDto } from '@/ethereum/dto/store-ethereum-account.dto';
import { ValidateEthereumAddressPipe } from '@/common/pipes/validate-ethereum-address.pipe';
import {
  GetEthereumBalanceResponse,
  StoreEthereumAccountResponse,
} from '@/ethereum/types/balance.types';
import { EthereumService } from '@/ethereum/ethereum.service';

@Controller('ethereum')
export class EthereumController {
  constructor(private readonly ethereumService: EthereumService) {}

  @Post()
  storeEthereumAccount(
    @Body(new ValidateEthereumAddressPipe())
    body: StoreEthereumAccountDto,
  ): Promise<StoreEthereumAccountResponse> {
    return this.ethereumService.storeAccount(body);
  }

  @Get('/:address')
  getAccountBalance(
    @Param('address', new ValidateEthereumAddressPipe())
    address: `0x${string}`,
  ): Promise<GetEthereumBalanceResponse> {
    return this.ethereumService.getBalance(address);
  }
}

