import { CHARTCONFIG } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useExpensesData } from "@/hooks/useExpensesData";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function DashboardBarChart() {
  const { isPending, error, mappedChartData } = useExpensesData();
  if (error) return "OOPS!! Something went wrong";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Breakdown</CardTitle>
        <CardDescription>
          Overview of your monthly expenses across different categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={CHARTCONFIG}>
          {!isPending ? (
            <BarChart
              accessibilityLayer
              data={mappedChartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="amount" fill="var(--color-desktop)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
