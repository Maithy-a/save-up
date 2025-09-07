import React from "react"
import { TransactionItemProps } from "@/types"
import { cn } from "@/lib/utils"
import { CircleDollarSign, TrendingUp } from "lucide-react"

const TransactionItem = ({ transaction }:TransactionItemProps) => {
  const isPositive = transaction.amount > 0

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-8 h-8 flex items-center justify-center rounded-full",
            transaction.type === "deposit"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          )}
        >
          {transaction.type === "deposit" ? (
            <CircleDollarSign size={16} />
          ) : (
            <TrendingUp size={16} />
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{transaction.label}</p>
          <p className="text-xs text-gray-500">{transaction.date}</p>
        </div>
      </div>
      <p
        className={cn(
          "text-sm font-semibold font-numbers ",
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
