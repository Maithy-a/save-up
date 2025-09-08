import { GoalCardProps } from "@/types"
import TransactionList from "@/components/TransactionList"
import { Button } from "@/components/ui/button"
import { IconActivityHeartbeat, IconArrowNarrowLeft, IconArrowNarrowRight, IconTargetArrow } from "@tabler/icons-react"
import Counter from "@/components/Counter"
import ProgressTracker from "@/components/ProgressTracker"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const GoalCard = ({ goal, transactions }: GoalCardProps) => {
  const progressPercentage = Math.round((goal.current / goal.target) * 100)

  return (
    <div className="w-full max-w-4xl shadow-md rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2 ring-6 ring-gray-200">
      {/* Left side */}
      <div className="relative flex flex-col justify-between p-6">
        <Image
          src="/images/house.png"
          width={300}
          height={300}
          alt="goal image"
          className="absolute inset-0 w-full h-full z-0"
        />

        <div className="relative z-10 space-y-5">

          <Button
            variant="secondary"
            className="rounded-full"
            size="icon"
            aria-label="Previous goal">
            <IconArrowNarrowLeft stroke={2} />
          </Button>

          <Separator />

          <div className="flex justify-between items-center gap-4">
            <h2 className="font-semibold text-black">{goal.title}</h2>
            <Badge
              variant="outline"
              className="px-2 py-1 rounded-full flex items-center gap-1">
              <IconTargetArrow stroke={2} className="w-4 h-4" />
              {goal.deadline}
            </Badge>
          </div>

          <div className="text-6xl font-normal text-gray-900">
            <Counter end={progressPercentage} suffix="%" />
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-700 mt-1">
              <span className="font-bold" >${goal.current.toLocaleString()}</span>
              <span>${goal.target.toLocaleString()}</span>
            </div>
            <ProgressTracker progress={progressPercentage} />
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="p-6 flex flex-col bg-white">
        <div className="flex justify-end gap-2 w-full">
          <Button variant="outline" className="rounded-full">
            Edit
          </Button>
          <Button className="rounded-full cursor-pointer">Add funds</Button>
        </div>
        <Separator className="mt-5" />
        <div className="flex py-3 items-center w-full gap-4">
          <div className="w-8 h-8 flex items-center justify-center rounded-full ring-3 ring-red-300 bg-red-100 text-red-600">
            <IconActivityHeartbeat />
          </div>
          <div className="flex-1">
            Auto invested in bm-save
            <div className="font-medium">Earning 1.2% yield</div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            aria-label="View auto-invest details"
          >
            <IconArrowNarrowRight />
          </Button>
        </div>
        <Separator className="mb-2" />
        <TransactionList transactions={transactions} />
      </div>
    </div>
  )
}

export default GoalCard
