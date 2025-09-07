import { Transaction, Goal } from "@/types"

export const transactions: Transaction[] = [
  { id: "1", type: "deposit", label: "One-time deposit", date: "Yesterday", amount: 1350 },
  { id: "2", type: "interest", label: "Interest payout", date: "June 6", amount: 148.95 },
  { id: "4", type: "deposit", label: "Regular deposit", date: "May 2", amount: 1000 },
  { id: "5", type: "interest", label: "Interest payout", date: "April 15", amount: 128.57 },
  { id: "6", type: "deposit", label: "Regular deposit", date: "April 1", amount: 1000 },
]

export const goal: Goal = {
  title: "Buy a house",
  target: 250000,
  current: 182495,
  deadline: "June 2029",
}
