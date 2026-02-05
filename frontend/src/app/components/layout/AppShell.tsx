import Header from '@/app/components/layout/Header'
import NetworkEnforcer from '@/app/components/layout/NetworkEnforcer'

type AppShellProps = {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NetworkEnforcer />
      <Header />
      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  )
}

