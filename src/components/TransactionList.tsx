import { TransactionListProps } from "@/types"
import TransactionItem from "@/components/TransactionItem"

const TransactionList = ({ transactions }: TransactionListProps) => {
  return (
    <div className="mt-4">
      <h2 className="text-sm font-semibold text-gray-600 mb-2">Transactions</h2>
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </div>
    </div>
  )
}

export default TransactionList
