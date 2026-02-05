 'use client'

import { useQuery } from '@tanstack/react-query'

type ApiBalanceResponse = {
  balance: string
  tokenBalance: string
}

const useApiAccountBalance = (address?: `0x${string}`) => {
  return useQuery({
    queryKey: ['apiBalance', address],
    queryFn: async () => {
      if (!address) {
        return null
      }

      const response = await fetch(`/api/balance?address=${address}`)
      const data = await response.json()

      if (!response.ok) {
        const message =
          typeof data?.error === 'string'
            ? data.error
            : 'Failed to fetch balance'
        throw new Error(message)
      }

      return data as ApiBalanceResponse
    },
  })
}

export default useApiAccountBalance

