'use client'

import { useAppKitAccount } from '@reown/appkit/react'
import { type ColumnDef } from '@tanstack/react-table'
import DataTable from '@/app/components/ui/table'
import useApiAccountBalance from '@/app/lib/hooks/useApiAccountBalance'
import useToken from '@/app/lib/hooks/useToken'
import formatBalance from '@/app/lib/utils/formatBalance'

function AccountBalanceTable() {
    const { address, isConnected } = useAppKitAccount()
    const { data, isLoading, error } = useApiAccountBalance(
        address as `0x${string}` | undefined
    )
    const { data: tokenData } = useToken()
    const tokenBalance = formatBalance(data?.tokenBalance)

    const columns: ColumnDef<{ asset: string; balance: string }>[] = [
        {
            header: 'Asset',
            accessorKey: 'asset',
        },
        {
            header: 'Balance',
            accessorKey: 'balance',
        },
    ]

    const rows = [
        {
            asset: tokenData
                ? `${tokenData.name || 'Token'} (${tokenData.symbol || 'TOKEN'})`
                : 'TOKEN',
            balance: tokenBalance !== null ? tokenBalance.toFixed(6) : '0',
        },
    ]

    return (
        <div className="mt-6 w-full max-w-3xl">
            <h2 className="text-lg font-semibold">Account Balance</h2>
            {!isConnected && <p>Connect a wallet to view balances.</p>}
            {isConnected && isLoading && <p>Loading balances...</p>}
            {isConnected && !isLoading && error && (
                <p>Balance: {error.message}</p>
            )}
            {isConnected && !isLoading && !error && (
                <DataTable columns={columns} data={rows} className="mt-3" />
            )}
        </div>
    )
}

export default AccountBalanceTable