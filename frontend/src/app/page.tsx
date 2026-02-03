'use client'

import { useAppKit, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import Button from '@/app/components/ui/button'
import useAccountBalance from '@/app/lib/hooks/useAccountBalance'
import useLatestBlockNumber from '@/app/lib/hooks/useBlock'
import useTransactions from '@/app/lib/hooks/useTransactions'
import AccountInfo from '@/app/components/screens/AccountInfo'
import TransactionTable from '@/app/components/screens/TransactionTable'

export default function Home() {
  const { open, close } = useAppKit();
  const { address, isConnected } =
  useAppKitAccount();
  const { chainId } = useAppKitNetwork()
  const normalizedChainId =
    typeof chainId === 'string' ? Number(chainId) : chainId
  const { data: balance, isLoading: isBalanceLoading, error: balanceError } =
    useAccountBalance(address as `0x${string}` | undefined, normalizedChainId)
  const {
    data: latestBlockNumber,
    isLoading: isLatestBlockLoading,
    error: latestBlockError
  } = useLatestBlockNumber(normalizedChainId ?? 1)
  const {
    data: transactions,
    isLoading: isTransactionsLoading,
    error: transactionsError
  } = useTransactions({
    address: (address ?? '') as `0x${string}`,
    chainid: String(normalizedChainId ?? 1),
    endblock: latestBlockNumber?.toString() ?? '1',
    page: '1',
    offset: '10',
    sort: 'desc',
  })

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {
        !isConnected && (
          <Button variant="primary" size="lg" onClick={() => open()}>Connect Wallet</Button>
        )
      }

      {
        isConnected && (
          <Button variant="danger" size="lg" onClick={() => close()}>Disconnect Wallet</Button>
        )
      }

      {
        isConnected && (
          <div>
            <AccountInfo
              address={address}
              isBalanceLoading={isBalanceLoading}
              balanceError={balanceError}
              balance={balance}
            />
            <TransactionTable
              transactions={transactions}
              isLoading={isTransactionsLoading}
              error={transactionsError}
            />
          </div>
        )
      }
    </div>
  );
}
