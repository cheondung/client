'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const config = {
  price: {
    label: 'Price',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

interface ProductPriceHistoryChartProps {
  priceHistories: ProductPriceHistory[];
}

export default function ProductPriceHistoryChart({ priceHistories }: Readonly<ProductPriceHistoryChartProps>) {
  return (
    <ChartContainer config={config}>
      <LineChart accessibilityLayer data={priceHistories}>
        <CartesianGrid />
        <XAxis dataKey="date" tickMargin={4} tickFormatter={(v) => v.slice(5)} />
        <YAxis dataKey="price" tickMargin={4} tickFormatter={(v) => v.toLocaleString()} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line dataKey="price" stroke="black" strokeWidth={2} dot={true} />
      </LineChart>
    </ChartContainer>
  );
}
