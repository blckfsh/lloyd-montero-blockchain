'use client'

import { useAppKit, useAppKitAccount } from '@reown/appkit/react'
import Button from '@/app/components/ui/button'

type WalletConnectionButtonProps = {
  connectLabel?: string
  disconnectLabel?: string
  size?: 'sm' | 'md' | 'lg'
  showDisconnect?: boolean
}

export default function WalletConnectionButton({
  connectLabel = 'Connect Wallet',
  disconnectLabel = 'Disconnect Wallet',
  size = 'lg',
  showDisconnect = true
}: WalletConnectionButtonProps) {
  const { open, close } = useAppKit()
  const { isConnected } = useAppKitAccount()

  if (!isConnected) {
    return (
      <Button variant="primary" size={size} onClick={() => open()}>
        {connectLabel}
      </Button>
    )
  }

  if (!showDisconnect) {
    return null
  }

  return (
    <Button variant="danger" size={size} onClick={() => close()}>
      {disconnectLabel}
    </Button>
  )
}

