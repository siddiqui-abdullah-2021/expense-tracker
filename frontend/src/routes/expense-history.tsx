import DataTable from "@/components/data-table";
import { redirect } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/expense-history")({
  beforeLoad: ({ context }) => {
    if (!context.isSignedIn) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: ExpenseHistory,
});

function ExpenseHistory() {
  return <DataTable />;
}
