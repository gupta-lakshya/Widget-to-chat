"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* Total Revenue */}
      <Card className="@container/card bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <CardDescription className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Revenue</CardDescription>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 rounded-full font-medium gap-1 flex items-center py-0 px-2 h-5 text-[11px]">
              <TrendingUp className="size-3" />
              +12.5%
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
            $1,250.00
          </CardTitle>
        </CardHeader>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            <span>Trending up this month</span>
            <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Visitors for the last 6 months
          </div>
        </div>
      </Card>

      {/* New Customers */}
      <Card className="@container/card bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <CardDescription className="text-sm font-medium text-zinc-500 dark:text-zinc-400">New Customers</CardDescription>
            <Badge variant="secondary" className="bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400 border border-rose-200/50 dark:border-rose-900/30 rounded-full font-medium gap-1 flex items-center py-0 px-2 h-5 text-[11px]">
              <TrendingDown className="size-3" />
              -20%
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
            1,234
          </CardTitle>
        </CardHeader>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            <span>Down 20% this period</span>
            <TrendingDown className="size-4 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Acquisition needs attention
          </div>
        </div>
      </Card>

      {/* Active Accounts */}
      <Card className="@container/card bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <CardDescription className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Active Accounts</CardDescription>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 rounded-full font-medium gap-1 flex items-center py-0 px-2 h-5 text-[11px]">
              <TrendingUp className="size-3" />
              +12.5%
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
            45,678
          </CardTitle>
        </CardHeader>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            <span>Strong user retention</span>
            <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Engagement exceed targets
          </div>
        </div>
      </Card>

      {/* Growth Rate */}
      <Card className="@container/card bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <CardDescription className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Growth Rate</CardDescription>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 rounded-full font-medium gap-1 flex items-center py-0 px-2 h-5 text-[11px]">
              <TrendingUp className="size-3" />
              +4.5%
            </Badge>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
            4.5%
          </CardTitle>
        </CardHeader>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">
            <span>Steady performance Increase</span>
            <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            Meets growth projections
          </div>
        </div>
      </Card>
    </div>
  )
}
