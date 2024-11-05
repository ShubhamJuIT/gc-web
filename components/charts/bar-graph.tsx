'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';



const chartData = [
  { date: '2024-04-01', students: 222, mentors: 150 },
  { date: '2024-04-02', students: 97, mentors: 180 },
  { date: '2024-04-03', students: 167, mentors: 120 },
  { date: '2024-04-04', students: 242, mentors: 260 },
  { date: '2024-04-05', students: 373, mentors: 290 },
  { date: '2024-04-06', students: 301, mentors: 340 },
  { date: '2024-04-07', students: 245, mentors: 180 },
  { date: '2024-04-08', students: 409, mentors: 320 },
  { date: '2024-04-09', students: 59, mentors: 110 },
  { date: '2024-04-10', students: 261, mentors: 190 },
  { date: '2024-04-11', students: 327, mentors: 350 },
  { date: '2024-04-12', students: 292, mentors: 210 },
  { date: '2024-04-13', students: 342, mentors: 380 },
  { date: '2024-04-14', students: 137, mentors: 220 },
  { date: '2024-04-15', students: 120, mentors: 170 },
  { date: '2024-04-16', students: 138, mentors: 190 },
  { date: '2024-04-17', students: 446, mentors: 360 },
  { date: '2024-04-18', students: 364, mentors: 410 },
  { date: '2024-04-19', students: 243, mentors: 180 },
  { date: '2024-04-20', students: 89, mentors: 150 },
  { date: '2024-04-21', students: 137, mentors: 200 },
  { date: '2024-04-22', students: 224, mentors: 170 },
  { date: '2024-04-23', students: 138, mentors: 230 },
  { date: '2024-04-24', students: 387, mentors: 290 },
  { date: '2024-04-25', students: 215, mentors: 250 },
  { date: '2024-04-26', students: 75, mentors: 130 },
  { date: '2024-04-27', students: 383, mentors: 420 },
  { date: '2024-04-28', students: 122, mentors: 180 },
  { date: '2024-04-29', students: 315, mentors: 240 },
  { date: '2024-04-30', students: 454, mentors: 380 },
  { date: '2024-05-01', students: 165, mentors: 220 },
  { date: '2024-05-02', students: 293, mentors: 310 },
  { date: '2024-05-03', students: 247, mentors: 190 },
  { date: '2024-05-04', students: 385, mentors: 420 },
  { date: '2024-05-05', students: 481, mentors: 390 },
  { date: '2024-05-06', students: 498, mentors: 520 },
  { date: '2024-05-07', students: 388, mentors: 300 },
  { date: '2024-05-08', students: 149, mentors: 210 },
  { date: '2024-05-09', students: 227, mentors: 180 },
  { date: '2024-05-10', students: 293, mentors: 330 },
  { date: '2024-05-11', students: 335, mentors: 270 },
  { date: '2024-05-12', students: 197, mentors: 240 },
  { date: '2024-05-13', students: 197, mentors: 160 },
  { date: '2024-05-14', students: 448, mentors: 490 },
  { date: '2024-05-15', students: 473, mentors: 380 },
  { date: '2024-05-16', students: 338, mentors: 400 },
  { date: '2024-05-17', students: 499, mentors: 420 },
  { date: '2024-05-18', students: 315, mentors: 350 },
  { date: '2024-05-19', students: 235, mentors: 180 },
  { date: '2024-05-20', students: 177, mentors: 230 },
  { date: '2024-05-21', students: 82, mentors: 140 },
  { date: '2024-05-22', students: 81, mentors: 120 },
  { date: '2024-05-23', students: 252, mentors: 290 },
  { date: '2024-05-24', students: 294, mentors: 220 },
  { date: '2024-05-25', students: 201, mentors: 250 },
  { date: '2024-05-26', students: 213, mentors: 170 },
  { date: '2024-05-27', students: 420, mentors: 460 },
  { date: '2024-05-28', students: 233, mentors: 190 },
  { date: '2024-05-29', students: 78, mentors: 130 },
  { date: '2024-05-30', students: 340, mentors: 280 },
  { date: '2024-05-31', students: 178, mentors: 230 },
  { date: '2024-06-01', students: 178, mentors: 200 },
  { date: '2024-06-02', students: 470, mentors: 410 },
  { date: '2024-06-03', students: 103, mentors: 160 },
  { date: '2024-06-04', students: 439, mentors: 380 },
  { date: '2024-06-05', students: 88, mentors: 140 },
  { date: '2024-06-06', students: 294, mentors: 250 },
  { date: '2024-06-07', students: 323, mentors: 370 },
  { date: '2024-06-08', students: 385, mentors: 320 },
  { date: '2024-06-09', students: 438, mentors: 480 },
  { date: '2024-06-10', students: 155, mentors: 200 },
  { date: '2024-06-11', students: 92, mentors: 150 },
  { date: '2024-06-12', students: 492, mentors: 420 },
  { date: '2024-06-13', students: 81, mentors: 130 },
  { date: '2024-06-14', students: 426, mentors: 380 },
  { date: '2024-06-15', students: 307, mentors: 350 },
  { date: '2024-06-16', students: 371, mentors: 310 },
  { date: '2024-06-17', students: 475, mentors: 520 },
  { date: '2024-06-18', students: 107, mentors: 170 },
  { date: '2024-06-19', students: 341, mentors: 290 },
  { date: '2024-06-20', students: 408, mentors: 450 },
  { date: '2024-06-21', students: 169, mentors: 210 },
  { date: '2024-06-22', students: 317, mentors: 270 },
  { date: '2024-06-23', students: 480, mentors: 530 },
  { date: '2024-06-24', students: 132, mentors: 180 },
  { date: '2024-06-25', students: 141, mentors: 190 },
  { date: '2024-06-26', students: 434, mentors: 380 },
  { date: '2024-06-27', students: 448, mentors: 490 },
  { date: '2024-06-28', students: 149, mentors: 200 },
  { date: '2024-06-29', students: 103, mentors: 160 },
  { date: '2024-06-30', students: 446, mentors: 400 }
];

const chartConfig = {
  views: {
    label: 'Users Onboarded',
  },
  students: {
    label: 'Students',
    color: 'rgb(var(--chart-1))'
  },
  mentors: {
    label: 'Mentors',
    color: 'rgb(var(--chart-3))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('students');

  const total = React.useMemo(
    () => ({
      students: chartData.reduce((acc, curr) => acc + curr.students, 0),
      mentors: chartData.reduce((acc, curr) => acc + curr.mentors, 0)
    }),
    []
  );

  return (
    <Card className=' h-full'>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-gray-100/20 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Users Onboarding</CardTitle>
          <CardDescription>
            Showing total onboarding for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {['students', 'mentors'].map((key) => {
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
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
