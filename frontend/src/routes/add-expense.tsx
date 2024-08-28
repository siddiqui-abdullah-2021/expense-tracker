import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CATEGORIES } from "@/constants";
import { createExpense } from "@/lib/api";
import { CalendarIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/add-expense")({
  beforeLoad: ({ context }) => {
    if (!context.isSignedIn) {
      throw redirect({
        to: "/",
      });
    }
  },
  component: AddExpense,
});

function AddExpense() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createExpense,
    onError: () => {
      toast.error("Error", {
        description: "Failed to add expense",
      });
    },
    onSuccess: () => {
      toast.success("Expense Added", {
        description: "Successfully added expense",
      });
      navigate({ to: "/expense-history" });
    },
  });

  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      amount: "0",
      date: new Date().toISOString(),
    },
    onSubmit: ({ value }) => {
      mutation.mutate({ value });
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="title"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A title is required"
                  : value.length < 3
                    ? "Title must be at least 3 characters"
                    : undefined,
            }}
            children={(field) => {
              const error = field.state.meta.errors[0];
              return (
                <>
                  <Label
                    className={cn(error && "text-destructive")}
                    htmlFor={field.name}
                  >
                    Title
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {error && (
                    <span className="text-sm font-medium text-destructive">
                      {error}
                    </span>
                  )}
                </>
              );
            }}
          />
        </div>

        <div>
          <form.Field
            name="category"
            validators={{
              onChange: ({ value }) =>
                !value ? "A category is required" : undefined,
            }}
            children={(field) => {
              const error = field.state.meta.errors[0];
              return (
                <>
                  <Label
                    className={cn(error && "text-destructive")}
                    htmlFor={field.name}
                  >
                    Category
                  </Label>
                  <Select
                    onValueChange={(category) => {
                      field.handleChange(category);
                    }}
                    defaultValue={field.state.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {error && (
                    <span className="text-sm font-medium text-destructive">
                      {error}
                    </span>
                  )}
                </>
              );
            }}
          />
        </div>

        <div>
          <form.Field
            name="amount"
            validators={{
              onChange: ({ value }) => {
                const numberValue = parseFloat(value);
                if (isNaN(numberValue) || numberValue <= 0) {
                  return "Amount must be a valid monetary value";
                }
              },
            }}
            children={(field) => {
              const error = field.state.meta.errors[0];

              return (
                <>
                  <Label
                    className={cn(error && "text-destructive")}
                    htmlFor={field.name}
                  >
                    Amount
                  </Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="number"
                    value={field.state.value === "0" ? "" : field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    step="0.01"
                  />

                  {error && (
                    <span className="text-sm font-medium text-destructive">
                      {error}
                    </span>
                  )}
                </>
              );
            }}
          />
        </div>

        <div>
          <form.Field
            name="date"
            validators={{
              onChange: ({ value }) =>
                !value ? "A date is required" : undefined,
            }}
            children={(field) => {
              const error = field.state.meta.errors[0];

              return (
                <div className="flex flex-col space-y-2">
                  <Label
                    className={cn(error && "text-destructive")}
                    htmlFor={field.name}
                  >
                    Pick the Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.state.value && "text-muted-foreground"
                        )}
                      >
                        {field.state.value ? (
                          format(field.state.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="center">
                      <Calendar
                        mode="single"
                        selected={new Date(field.state.value)}
                        onSelect={(date) =>
                          field.handleChange((date ?? new Date()).toISOString())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  {error && (
                    <span className="text-sm font-medium text-destructive">
                      {error}
                    </span>
                  )}
                </div>
              );
            }}
          />
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={() => (
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="w-full"
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
