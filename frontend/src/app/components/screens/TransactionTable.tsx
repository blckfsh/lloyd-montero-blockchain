'use client'

import { type ColumnDef } from '@tanstack/react-table'
import { format } from 'date-fns'
import { formatUnits } from 'viem'
import { useMemo, useState } from 'react'

import DataTable from '@/app/components/ui/table'

type TransactionsResponse = {
  result?: Array<{
    hash: string
    timeStamp: string
    from: string
    to: string
    value: string
    isError: string
  }>
}

type TransactionTableProps = {
  transactions?: TransactionsResponse
  isLoading: boolean
  error?: Error | null
}

function TransactionTable({
  transactions,
  isLoading,
  error
}: TransactionTableProps) {
  const [page, setPage] = useState(1)
  const pageSize = 10

  const columns: ColumnDef<{
    timeStamp: string
    hash: string
    from: string
    to: string
    value: string
  }>[] = [
    {
      header: 'Time',
      accessorKey: 'timeStamp',
      cell: ({ getValue }) =>
        format(new Date(Number(getValue<string>()) * 1000), 'MMM d, yyyy h:mm a')
    },
    {
      header: 'Hash',
      accessorKey: 'hash',
      cell: ({ getValue }) => (
        <span className="break-all">{getValue<string>()}</span>
      )
    },
    {
      header: 'From',
      accessorKey: 'from',
      cell: ({ getValue }) => (
        <span className="break-all">{getValue<string>()}</span>
      )
    },
    {
      header: 'To',
      accessorKey: 'to',
      cell: ({ getValue }) => (
        <span className="break-all">{getValue<string>()}</span>
      )
    },
    {
      header: 'Value',
      accessorKey: 'value',
      cell: ({ getValue }) =>
        `${Number(formatUnits(BigInt(getValue<string>()), 18)).toFixed(4)} ETH`
    }
  ]

  const rows = Array.isArray(transactions?.result) ? transactions.result : []
  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize))
  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize
    return rows.slice(start, start + pageSize)
  }, [page, rows])

  const handlePrev = () => setPage((current) => Math.max(1, current - 1))
  const handleNext = () =>
    setPage((current) => Math.min(totalPages, current + 1))

  return (
    <div className="mt-6 w-full max-w-3xl">
      <h2 className="text-lg font-semibold">Latest Transactions</h2>
      {isLoading && <p>Loading transactions...</p>}
      {!isLoading && error && <p>Transactions: {error.message}</p>}
      {!isLoading &&
        !error &&
        Array.isArray(transactions?.result) && (
          <>
            <DataTable
              columns={columns}
              data={pageRows}
              emptyMessage="No transactions found."
              className="mt-3"
            />
            {rows.length > 0 && (
              <div className="mt-3 flex items-center justify-between text-sm">
                <button
                  type="button"
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={handlePrev}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {page} of {totalPages}
                </span>
                <button
                  type="button"
                  className="px-3 py-1 border rounded disabled:opacity-50"
                  onClick={handleNext}
                  disabled={page === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
    </div>
  )
}

export default TransactionTable

