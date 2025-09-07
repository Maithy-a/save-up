"use client"
import { CounterProps } from '@/types'
import CountUp from "react-countup"


const Counter = ({end, suffix, className}: CounterProps) => {
  return (
    <CountUp
    end={end}
    duration={5}
    separator=","
    suffix={suffix}
    className={className}
    />
  )
}

export default Counter