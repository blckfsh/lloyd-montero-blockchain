'use client'

import { useAppKitAccount } from '@reown/appkit/react'
import MintForm from '@/app/components/screens/MintForm'

export default function TokenMintPage() {
  const { isConnected } = useAppKitAccount()

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-xl font-semibold">Mint Token</h1>
        <div className="text-sm text-slate-600">
          Connect your wallet to access the mint form.
        </div>
      </div>
    )
  }

  return <MintForm />
}
