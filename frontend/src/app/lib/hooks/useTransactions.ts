'use client'

import { useQuery } from '@tanstack/react-query'

type TransactionsParams = {
  address: `0x${string}`
  chainid: string
  startblock?: string
  endblock: string
  page: string
  offset: string
  sort: 'asc' | 'desc'
}

const useTransactions = (params: TransactionsParams) => {
  const {
    address,
    chainid,
    startblock,
    endblock,
    page,
    offset,
    sort
  } = params

  return useQuery({
    queryKey: [
      'transactions',
      address,
      chainid,
      startblock,
      endblock,
      page,
      offset,
      sort
    ],
    queryFn: async () => {
      const searchParams = new URLSearchParams({
        address,
        chainid,
        startblock: startblock ?? '1',
        endblock,
        page,
        offset,
        sort
      })

      const response = await fetch(`/api/etherscan?${searchParams.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch transactions')
      }

      return response.json()
    },
    enabled: !!address && !!endblock
  })
}

export default useTransactions

