import { CHARTCONFIG } from "@/constants";
import { Skeleton } from "@/components/ui/skeleton";
import { useExpensesData } from "@/hooks/useExpensesData";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Label,
  Pie,
  PieChart,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function DashboardPieChart() {
  const { isPending, error, mappedChartData, totalAmount } = useExpensesData();
  if (isPending) return <PieChartSkelton />;
  if (error) return "OOPS!! Something went wrong";

  return (
    <div className="flex flex-col gap-4">
      <Card className="flex flex-col">
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={CHARTCONFIG}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={mappedChartData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                            {totalAmount.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Amount
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
        <CardFooter className="flex-col gap-2 font-semibold">
          <div className="leading-none text-muted-foreground">
            Showing total spending
          </div>
        </CardFooter>
      </Card>
      <Card className="flex flex-col">
        <CardContent>
          <ChartContainer config={CHARTCONFIG}>
            <AreaChart
              accessibilityLayer
              data={mappedChartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="category"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="amount"
                type="natural"
                fill="var(--color-amount)"
                fillOpacity={0.4}
                stroke="var(--color-amount)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 font-semibold">
          <div className="leading-none text-muted-foreground">
            Showing total spending
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

function PieChartSkelton() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-72 w-full" />
      <Skeleton className="h-72 w-full" />
    </div>
  );
}
