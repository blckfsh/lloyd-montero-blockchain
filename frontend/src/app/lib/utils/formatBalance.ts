'use client'

import { formatUnits } from 'viem'

const formatBalance = (value?: string) => {
  if (!value) {
    return null
  }

  if (/^\d+$/.test(value)) {
    return Number(formatUnits(BigInt(value), 18))
  }

  const numericValue = Number(value)
  if (!Number.isFinite(numericValue)) {
    return null
  }

  return numericValue / 1e18
}

export default formatBalance

