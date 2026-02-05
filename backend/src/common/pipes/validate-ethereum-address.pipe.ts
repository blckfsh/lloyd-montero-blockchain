import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'
import { isAddress } from 'viem'
import { StoreEthereumAccountDto } from '@/ethereum/dto/store-ethereum-account.dto'

@Injectable()
export class ValidateEthereumAddressPipe
  implements PipeTransform<StoreEthereumAccountDto | `0x${string}`>
{
  transform(value: StoreEthereumAccountDto | `0x${string}`) {
    if (typeof value === 'string') {
      if (!isAddress(value)) {
        throw new BadRequestException('Invalid Ethereum address')
      }

      return value
    }

    if (!value?.address || !isAddress(value.address)) {
      throw new BadRequestException('Invalid Ethereum address')
    }

    return value
  }
}

