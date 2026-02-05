'use client'

import { useQuery } from '@tanstack/react-query'
import { readContracts } from '@wagmi/core'

import { tokenAbi } from '@/app/lib/abi/token'
import { config } from '@/app/lib/reown/config'

const useToken = () => {
  return useQuery({
    queryKey: ['token'],
    queryFn: async () => {
      const tokenAddress = process.env
        .NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}` | undefined
      if (!tokenAddress) {
        return null
      }

      const results = await readContracts(config, {
        contracts: [
          {
            address: tokenAddress,
            abi: tokenAbi,
            functionName: 'name',
          },
          {
            address: tokenAddress,
            abi: tokenAbi,
            functionName: 'symbol',
          },
        ],
      })

      const name = results[0]?.result as string | undefined
      const symbol = results[1]?.result as string | undefined

      return {
        name: name ?? '',
        symbol: symbol ?? '',
      }
    },
  })
}

export default useToken
