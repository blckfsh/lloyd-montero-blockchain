'use client'

import Link from 'next/link'

import WalletConnectionButton from '@/app/components/ui/wallet-connection'

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <nav className="flex items-center gap-4 text-sm font-medium text-slate-700">
        <Link href="/" className="hover:text-slate-900">
          Dashboard
        </Link>
        <Link href="/token/view" className="hover:text-slate-900">
          Token View
        </Link>
        <Link href="/token/mint" className="hover:text-slate-900">
          Mint Token
        </Link>
      </nav>
      <WalletConnectionButton size="md" />
    </header>
  )
}


