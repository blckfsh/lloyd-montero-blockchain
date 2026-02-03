'use client'

import { useQuery } from '@tanstack/react-query'
import { getBalance } from '@wagmi/core'

import { config } from '@/lib/reown/config'

const useAccountBalance = (
  address?: `0x${string}`,
  chainId?: number
) => {
  return useQuery({
    queryKey: ['balance', address, chainId],
    queryFn: async () => {
      if (!address || !chainId || !config) {
        return null
      }

      const balance = await getBalance(config, {
        address,
        chainId,
        blockTag: 'latest'
      })

      return balance;
    },
  })
}

export default useAccountBalance