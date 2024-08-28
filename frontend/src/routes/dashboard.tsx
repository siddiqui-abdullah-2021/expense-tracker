import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { redirect } from "@tanstack/react-router";
import DashboardPieChart from "@/components/pie-chart";
import DashboardBarChart from "@/components/bar-chart";
import { createFileRoute } from "@tanstack/react-router";
import { useExpensesData } from "@/hooks/useExpensesData";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: ({ context }) => {
    if (!context.isSignedIn) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: Dashboard,
});

function Dashboard() {
  const { mappedChartData } = useExpensesData();
  if (mappedChartData.length <= 0)
    return (
      <div className="flex items-center justify-center py-28">
        <Button asChild>
          <Link to="/add-expense">Add Your First Expense to See Insights</Link>
        </Button>
      </div>
    );

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <DashboardBarChart />
        </div>

        <div className="col-span-1">
          <DashboardPieChart />
        </div>
      </div>
    </div>
  );
}
