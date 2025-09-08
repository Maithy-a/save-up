import React from "react"
import { TransactionItemProps } from "@/types"
import { cn } from "@/lib/utils"
import { IconCoins, IconTrendingUp } from "@tabler/icons-react"

const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const isPositive = transaction.amount > 0

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full ring-2",
            transaction.type === "deposit"
              ? "bg-green-600 text-white ring-4 ring-green-200"
              : "bg-red-600 text-white ring-4 ring-red-200"
          )}>
          {transaction.type === "deposit" ? (
            <IconCoins size={16} />
          ) : (
            <IconTrendingUp size={16} />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">{transaction.label}</p>
          <p className="text-xs text-gray-500">{transaction.date}</p>
        </div>
      </div>
      <p
        className={cn(
          "text-sm font-semibold",
          isPositive ? "text-green-600" : "text-red-600"
        )}
      >
        {isPositive ? "+" : ""}
        {transaction.amount.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </p>
    </div>
  )
}

export default TransactionItem