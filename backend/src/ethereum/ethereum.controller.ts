import { Body, Controller, Post } from '@nestjs/common';
import { StoreEthereumAccountDto } from '@/ethereum/dto/store-ethereum-account.dto';
import { ValidateEthereumAddressPipe } from '@/common/pipes/validate-ethereum-address.pipe';
import { StoreEthereumAccountResponse } from '@/ethereum/types/store-ethereum-account-response.type';
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
}

