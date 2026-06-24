"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
} from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useChat } from "@/components/chat-context"
import { cn } from "@/lib/utils"

// Bar Chart data & config
const barChartData = [
  { month: "Jan", active: 186, new: 80 },
  { month: "Feb", active: 305, new: 200 },
  { month: "Mar", active: 237, new: 120 },
  { month: "Apr", active: 173, new: 190 },
  { month: "May", active: 209, new: 130 },
  { month: "Jun", active: 264, new: 140 },
]

const barChartConfig = {
  active: {
    label: "Active",
    color: "oklch(0.205 0 0)", // Charcoal black
  },
  new: {
    label: "New",
    color: "oklch(0.600 0.03 240)", // Professional slate blue-gray
  },
} satisfies ChartConfig

// Pie Chart data & config
const pieChartData = [
  { source: "direct", value: 400, fill: "oklch(0.205 0 0)" },
  { source: "referral", value: 300, fill: "oklch(0.600 0.03 240)" },
  { source: "organic", value: 200, fill: "oklch(0.850 0.01 240)" },
]

const pieChartConfig = {
  direct: {
    label: "Direct",
    color: "oklch(0.205 0 0)",
  },
  referral: {
    label: "Referral",
    color: "oklch(0.600 0.03 240)",
  },
  organic: {
    label: "Organic",
    color: "oklch(0.850 0.01 240)",
  },
} satisfies ChartConfig

// Radar Chart data & config
const radarChartData = [
  { feature: "Speed", value: 80 },
  { feature: "Uptime", value: 95 },
  { feature: "Security", value: 85 },
  { feature: "UX", value: 70 },
  { feature: "Support", value: 90 },
]

const radarChartConfig = {
  value: {
    label: "Score",
    color: "oklch(0.350 0.03 240)", // Slate accent
  },
} satisfies ChartConfig

export function SectionCards() {
  const { isOpen, activeTopic, setActiveTopic } = useChat()

  const getCardClass = (topic: string) => {
    const isFocused = isOpen && activeTopic === topic
    return cn(
      "@container/card bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between h-[230px] transition-all duration-300 ease-in-out origin-center",
      isOpen
        ? isFocused
          ? "relative z-30 scale-[1.04] shadow-md border-zinc-350 dark:border-zinc-700 ring-4 ring-black/5 dark:ring-white/5"
          : "opacity-30 scale-[0.97] blur-[0.5px] pointer-events-none saturate-50"
        : "relative z-10"
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {/* 1. Total Revenue (Original Metric Card) */}
      <Card className={getCardClass("Total Revenue")}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTopic("Total Revenue")}
                title="Ask AI about this metric"
                className="flex items-center gap-0.5 text-[9px] font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-md px-1.5 py-0.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <Sparkles className="size-3 text-violet-500 shrink-0" />
                <span>AI</span>
              </button>
              <CardDescription className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Total Revenue</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-900/30 rounded-full font-medium gap-1 flex items-center py-0 px-2 h-5 text-[11px]">
              <TrendingUp className="size-3" />
              +12.5%
            </Badge>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-1">
            $1,250.00
          </CardTitle>
        </CardHeader>
        <div className="px-6 pb-6 pt-2 flex flex-col gap-0.5 mt-auto">
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-900 dark:text-zinc-100">
            <span>Trending up this month</span>
            <TrendingUp className="size-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-[10px] text-zinc-500 dark:text-zinc-400">
            Visitors for the last 6 months
          </div>
        </div>
      </Card>

      {/* 2. Bar Chart - Multiple */}
      <Card className={getCardClass("Active Users")}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTopic("Active Users")}
                title="Ask AI about this metric"
                className="flex items-center gap-0.5 text-[9px] font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-md px-1.5 py-0.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <Sparkles className="size-3 text-violet-500 shrink-0" />
                <span>AI</span>
              </button>
              <CardDescription className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Active Users</CardDescription>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium">Monthly views</span>
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
            14,820
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-4">
          <ChartContainer config={barChartConfig} className="h-[110px] w-full">
            <BarChart data={barChartData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }} barGap={3}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" strokeOpacity={0.3} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={6}
                axisLine={false}
                style={{ fontSize: "9px", fill: "var(--muted-foreground)" }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="active" fill="var(--color-active)" radius={[2, 2, 0, 0]} barSize={8} />
              <Bar dataKey="new" fill="var(--color-new)" radius={[2, 2, 0, 0]} barSize={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* 3. Pie Chart (Donut with side legend) */}
      <Card className={getCardClass("Traffic Sources")}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTopic("Traffic Sources")}
                title="Ask AI about this metric"
                className="flex items-center gap-0.5 text-[9px] font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-md px-1.5 py-0.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <Sparkles className="size-3 text-violet-500 shrink-0" />
                <span>AI</span>
              </button>
              <CardDescription className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Traffic Sources</CardDescription>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600">+8.2%</span>
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
            900 sessions
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-4 flex items-center justify-between gap-2">
          <div className="w-[110px] h-[110px] flex items-center justify-center shrink-0">
            <ChartContainer config={pieChartConfig} className="w-full h-full">
              <PieChart width={110} height={110}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={pieChartData}
                  dataKey="value"
                  nameKey="source"
                  innerRadius={28}
                  outerRadius={40}
                  strokeWidth={2}
                  stroke="var(--background)"
                />
              </PieChart>
            </ChartContainer>
          </div>
          <div className="flex flex-col gap-2 text-[10px] font-medium text-zinc-500 dark:text-zinc-400 w-full justify-center pl-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-zinc-950 dark:bg-zinc-50 shrink-0" />
                <span>Direct</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">44%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[oklch(0.600_0.03_240)] shrink-0" />
                <span>Referral</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">33%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-[oklch(0.850_0.01_240)] shrink-0" />
                <span>Organic</span>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">22%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Radar Chart */}
      <Card className={getCardClass("Performance Index")}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveTopic("Performance Index")}
                title="Ask AI about this metric"
                className="flex items-center gap-0.5 text-[9px] font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-md px-1.5 py-0.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              >
                <Sparkles className="size-3 text-violet-500 shrink-0" />
                <span>AI</span>
              </button>
              <CardDescription className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Performance Index</CardDescription>
            </div>
            <span className="text-[10px] text-zinc-400 font-medium">System score</span>
          </div>
          <CardTitle className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mt-0.5">
            86 / 100
          </CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-2 flex items-center justify-center">
          <ChartContainer config={radarChartConfig} className="h-[110px] w-full">
            <RadarChart data={radarChartData} margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis
                dataKey="feature"
                tick={{ fill: "var(--muted-foreground)", fontSize: 8 }}
              />
              <PolarGrid stroke="var(--border)" strokeOpacity={0.3} gridType="circle" />
              <Radar
                dataKey="value"
                fill="var(--color-value)"
                fillOpacity={0.06}
                stroke="var(--color-value)"
                strokeWidth={1.5}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
