import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { getBlockNumber, type GetBlockNumberReturnType } from '@wagmi/core'

import { config } from '@/lib/reown/config'

const useLatestBlockNumber = (
  chainId: number
): UseQueryResult<GetBlockNumberReturnType, Error> => {
  return useQuery({
    queryKey: ['latestBlock', chainId],
    queryFn: async () => {
      const blockNumber = await getBlockNumber(config, {
        chainId
      })
      return blockNumber
    }
  })
}

export default useLatestBlockNumber