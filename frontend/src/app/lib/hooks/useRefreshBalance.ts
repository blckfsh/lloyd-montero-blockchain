'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

type RefreshBalanceParams = {
  address: `0x${string}`
}

const useRefreshBalance = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['refreshBalance'],
    mutationFn: async ({ address }: RefreshBalanceParams) => {
      const response = await fetch('/api/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        throw new Error(
          typeof payload?.error === 'string'
            ? payload.error
            : 'Failed to refresh balance'
        )
      }

      return response.json()
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['apiBalance', variables.address],
      })
    },
  })
}

export default useRefreshBalance

