import { CHARTCONFIG } from "@/constants";
import { getAllExpenses } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export function useExpensesData() {
  const { isPending, error, data } = useQuery({
    queryKey: ["expenses"],
    queryFn: getAllExpenses,
  });

  const expenses = data || [];

  const chartData = expenses.reduce(
    (acc, expense) => {
      const { category, amount } = expense;
      const found = acc.find((item) => item.category === category);

      if (found) {
        found.amount += parseFloat(amount);
      } else {
        acc.push({ category, amount: parseFloat(amount) });
      }

      return acc;
    },
    [] as { category: string; amount: number }[]
  );

  const mappedChartData = chartData.map((item) => ({
    ...item,
    fill:
      CHARTCONFIG[item.category as keyof typeof CHARTCONFIG]?.color ||
      "var(--default-color)",
  }));

  const totalAmount = chartData.reduce((acc, curr) => acc + curr.amount, 0);

  return { isPending, error, mappedChartData, totalAmount };
}
