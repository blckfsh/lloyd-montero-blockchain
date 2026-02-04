'use client'

import { useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react'

export default function TokenViewPage() {
  const { address, isConnected } = useAppKitAccount()
  const { chainId } = useAppKitNetwork()

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1 className="text-xl font-semibold">Token View</h1>
      {isConnected && (
        <div className="text-sm text-slate-700 space-y-1">
          <div>Address: {address}</div>
          <div>Chain Id: {chainId ?? 'Unknown'}</div>
          <div>
            Token: {process.env.NEXT_PUBLIC_TOKEN_ADDRESS ?? 'Not set'}
          </div>
        </div>
      )}
    </div>
  )
}
