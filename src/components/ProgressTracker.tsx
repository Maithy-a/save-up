"use client"
import { Tracker } from "@/components/ui/Tracker"
import { ProgressTrackerProps } from "@/types"

const ProgressTracker = ({ progress }: ProgressTrackerProps) => {

    const trackerData = Array.from({ length: 100 },
        (_, index) => ({
            color:
                index < progress
                    ? "bg-green-600"
                    : "bg-gray-400",
            tooltip: `${progress}%`,
        }))

    return (
        <>
            <Tracker
                data={trackerData}
                hoverEffect={true}
            />
        </>
    )
}

export default ProgressTracker