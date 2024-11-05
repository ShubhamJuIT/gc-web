'use client';

import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  { browser: 'pending', count: 275, fill: 'var(--color-pending)' },
  { browser: 'approved', count: 200, fill: 'var(--color-approved)' },
  { browser: 'rejected', count: 287, fill: 'var(--color-rejected)' },
  { browser: 'deleted', count: 173, fill: 'var(--color-deleted)' },
  { browser: 'archived', count: 190, fill: 'var(--color-archived)' }
];

const chartConfig = {
  Count: {
    label: 'Count'
  },
  pending: {
    label: 'Pending',
    color: 'rgb(var(--chart-1))'
  },
  approved: {
    label: 'Approved',
    color: 'rgb(var(--chart-2))'
  },
  rejected: {
    label: 'Rejected',
    color: 'rgb(var(--chart-3))'
  },
  deleted: {
    label: 'Deleted',
    color: 'rgb(var(--chart-5))'
  },
  archived: {
    label: 'Archived',
    color: 'rgb(var(--chart-4))'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalCount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Courses Statistics </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[295px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Courses
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          New course request up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-white/70">
          Showing total counts of courses for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
