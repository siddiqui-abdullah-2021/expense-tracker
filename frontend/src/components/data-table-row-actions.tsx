import { toast } from "sonner";
import { Ellipsis } from "lucide-react";
import { deleteExpense } from "@/lib/api";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DataTableRowActions({ id }: { id: number }) {
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onError: () => {
      toast.error("Error", {
        description: "Failed to delete expense",
      });
    },
    onSuccess: () => {
      toast.success("Expense Deleted", {
        description: "Successfully deleted expense",
      });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link to={`/expense/${id}`}>Edit</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={mutation.isPending}
          onClick={() => mutation.mutate({ id })}
        >
          {mutation.isPending ? "Deleting..." : "Delete"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
