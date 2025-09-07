import { GoalCardProps } from "@/types"
import TransactionList from "@/components/TransactionList"
import { Button } from "@/components/ui/button"
import { IconTargetArrow } from "@tabler/icons-react"
import Counter from "@/components/Counter"

const GoalCard = ({goal, transactions}: GoalCardProps) => {
 return (
    <div className="w-full max-w-4xl bg-white shadow rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

      <div
        className="relative flex flex-col justify-between p-6 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/house.jpg')" }}
      >

        <div className="absolute inset-0 bg-black/30 rounded-l-2xl" />
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-white">{goal.title}</h2>
            <Button
              className="text-xs rounded-full text-gray-200 px-4 bg-black/40 border-0"
            >
              <IconTargetArrow stroke={2} className="w-4 h-4 mr-1" />
              {goal.deadline}
            </Button>
          </div>

          <p className="text-8xl font-normal mt-6 text-white drop-shadow font-numbers ">
            {/* {Math.round((goal.current / goal.target) * 100)}% */}
            <Counter end={Math.round((goal.current / goal.target)* 100)} suffix="%" />
          </p>

          <p className="text-gray-200 font-medium font-numbers ">
            ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6 gap-4">
          <p className="text-gray-600 font-medium text-base">
            Auto-invested with Paystack
          </p>
          <Button className="text-base rounded-full cursor-pointer">
            Add funds
          </Button>
        </div>
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}

export default GoalCard