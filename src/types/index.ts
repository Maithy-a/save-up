export type TransactionType = "deposit" | "interest"

export interface Transaction {
  id: string
  type: TransactionType
  label: string
  date: string
  amount: number
}

export interface Goal {
  title: string
  target: number
  current: number
  deadline: string
}

export interface TransactionItemProps {
  transaction: Transaction
}

export interface TransactionListProps {
  transactions: Transaction[]
}

export interface GoalCardProps {
  goal: Goal
  transactions: Transaction[]
}

export interface CounterProps{
  end:number,
  suffix?:string,
  className?: string,
}