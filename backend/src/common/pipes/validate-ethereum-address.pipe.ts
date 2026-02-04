import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isAddress } from 'viem'
import { StoreEthereumAccountDto } from '@/ethereum/dto/store-ethereum-account.dto'

@Injectable()
export class ValidateEthereumAddressPipe
  implements PipeTransform<StoreEthereumAccountDto>
{
  transform(value: StoreEthereumAccountDto) {
    if (!value?.address || !isAddress(value.address)) {
      throw new BadRequestException('Invalid Ethereum address')
    }

    return value
  }
}

