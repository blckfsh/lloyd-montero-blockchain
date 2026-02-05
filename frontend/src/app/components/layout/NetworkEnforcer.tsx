'use client'

import { useEffect } from 'react'
import { useAppKitNetwork } from '@reown/appkit/react'

import { networks } from '@/app/lib/reown/config'

export default function NetworkEnforcer() {
  const { chainId, switchNetwork } = useAppKitNetwork()
  const targetNetwork = networks[0]
  const targetChainId = targetNetwork.id

  useEffect(() => {
    if (!chainId || chainId === targetChainId) {
      return
    }

    if (switchNetwork) {
      switchNetwork(targetNetwork)
    }
  }, [chainId, targetChainId, targetNetwork, switchNetwork])

  return null
}


