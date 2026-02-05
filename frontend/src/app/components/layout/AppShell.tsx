import Header from '@/app/components/layout/Header'
import NetworkEnforcer from '@/app/components/layout/NetworkEnforcer'

type AppShellProps = {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen">
      <NetworkEnforcer />
      <Header />
      {children}
    </div>
  )
}

