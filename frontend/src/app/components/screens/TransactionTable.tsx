'use client'

import { format } from 'date-fns'
import { formatUnits } from 'viem'

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
  return (
    <div className="mt-6 w-full max-w-3xl">
      <h2 className="text-lg font-semibold">Latest Transactions</h2>
      {isLoading && <p>Loading transactions...</p>}
      {!isLoading && error && <p>Transactions: {error.message}</p>}
      {!isLoading &&
        !error &&
        (!transactions?.result || !Array.isArray(transactions.result)) && (
          <p>No transactions found.</p>
        )}
      {!isLoading &&
        !error &&
        Array.isArray(transactions?.result) && (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2 pr-3">Time</th>
                  <th className="py-2 pr-3">Hash</th>
                  <th className="py-2 pr-3">From</th>
                  <th className="py-2 pr-3">To</th>
                  <th className="py-2 pr-3">Value</th>
                </tr>
              </thead>
              <tbody>
                {transactions.result.map((tx) => (
                  <tr key={tx.hash} className="border-b">
                    <td className="py-2 pr-3 whitespace-nowrap">
                      {format(
                        new Date(Number(tx.timeStamp) * 1000),
                        'MMM d, yyyy h:mm a'
                      )}
                    </td>
                    <td className="py-2 pr-3 break-all">{tx.hash}</td>
                    <td className="py-2 pr-3 break-all">{tx.from}</td>
                    <td className="py-2 pr-3 break-all">{tx.to}</td>
                    <td className="py-2 pr-3 whitespace-nowrap">
                      {Number(formatUnits(BigInt(tx.value), 18)).toFixed(4)} ETH
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  )
}

export default TransactionTable

