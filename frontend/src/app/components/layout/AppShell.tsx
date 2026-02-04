'use client'

import WalletConnectionButton from '@/app/components/ui/wallet-connection'

type AppShellProps = {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen">
      <div className="absolute right-6 top-6 z-10">
        <WalletConnectionButton size="md" />
      </div>
      {children}
    </div>
  )
}

