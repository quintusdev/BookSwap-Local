'use client';
import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart as RechartsLineChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', swaps: 186 },
  { month: 'February', swaps: 305 },
  { month: 'March', swaps: 237 },
  { month: 'April', swaps: 73 },
  { month: 'May', swaps: 209 },
  { month: 'June', swaps: 214 },
];

const chartConfig = {
  swaps: {
    label: 'Swaps',
    color: 'hsl(var(--primary))',
  },
};

export function LineChart() {
  return (
     <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <RechartsLineChart
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
         <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickCount={3}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="swaps"
          type="monotone"
          stroke="var(--color-swaps)"
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ChartContainer>
  );
}
