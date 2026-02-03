type AccountInfoProps = {
  address?: string | null
  isBalanceLoading: boolean
  balanceError?: Error | null
  balance?: {
    value: bigint
    decimals: number
    symbol: string
  } | null
}

function AccountInfo({
  address,
  isBalanceLoading,
  balanceError,
  balance
}: AccountInfoProps) {
  return (
    <div>
      <p>Address: {address}</p>
      {isBalanceLoading && <p>Balance: Loading...</p>}
      {!isBalanceLoading && balanceError && (
        <p>Balance: {balanceError.message}</p>
      )}
      {!isBalanceLoading && !balanceError && balance && (
        <p>
          Balance: {Number(balance.value) / 10 ** balance.decimals}{' '}
          {balance.symbol}
        </p>
      )}
    </div>
  )
}

export default AccountInfo

