"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "January", sales: 186, courseSold: 80 },
  { month: "February", sales: 305, courseSold: 200 },
  { month: "March", sales: 237, courseSold: 120 },
  { month: "April", sales: 73, courseSold: 190 },
  { month: "May", sales: 209, courseSold: 130 },
  { month: "June", sales: 214, courseSold: 140 },
]

const chartConfig = {
  sales: {
    label: 'Sales ($)',
    color: 'rgb(var(--chart-5))'
  },
  courseSold: {
    label: 'Course Sold',
    color: 'rgb(var(--chart-6))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('sales');

  const total = React.useMemo(
    () => ({
      sales: chartData.reduce((acc, curr) => acc + curr.sales, 0),
      courseSold: chartData.reduce((acc, curr) => acc + curr.courseSold, 0)
    }),
    []
  );

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-gray-100/20 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sales and courses sold</CardTitle>
          <CardDescription>
            Showing total sale and courses sold for the last 6 months
          </CardDescription>
        </div>
        <div className="flex">
          {['sales', 'courseSold'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-gray-100/20 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-white/70">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillActiveChart" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartConfig[activeChart].color}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartConfig[activeChart].color}
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey={activeChart}
              type="natural"
              fill="url(#fillActiveChart)"
              fillOpacity={0.4}
              stroke={chartConfig[activeChart].color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card >
  );
}
