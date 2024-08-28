import { CloudRain } from "lucide-react";
import { ChartConfig } from "@/components/ui/chart";

export const NAVITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Expense History",
    href: "/expense-history",
  },
  {
    title: "Add Expense",
    href: "/add-expense",
  },
];

export const FEATURES = [
  {
    name: "Sign up for free",
    description:
      "Start tracking your expenses without any cost. Signing up is quick, easy, and completely free.",
    icon: CloudRain,
  },
  {
    name: "Track Expenses Instantly",
    description:
      "Record your expenses on the go. Our tool is designed to be fast and efficient, helping you stay on top of your finances.",
    icon: CloudRain,
  },
  {
    name: "Secure and Private",
    description:
      "Your financial data is safe with us. We prioritize security to ensure your information remains private and protected.",
    icon: CloudRain,
  },
  {
    name: "User-Friendly Interface",
    description:
      "Our expense tracker is designed with simplicity in mind, making it easy for anyone to use, no matter their tech-savviness.",
    icon: CloudRain,
  },
];

export const CATEGORIES = [
  { value: "living-expenses", label: "Living Expenses" },
  { value: "groceries-dining", label: "Groceries & Dining" },
  { value: "shopping-entertainment", label: "Shopping & Entertainment" },
  { value: "transportation", label: "Transportation" },
  { value: "health-wellness", label: "Health & Wellness" },
];

export const CHARTCONFIG = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
  "living-expenses": {
    label: "Living Expenses",
    color: "hsl(var(--chart-1))",
  },
  "groceries-dining": {
    label: "Groceries & Dining",
    color: "hsl(var(--chart-2))",
  },
  "shopping-entertainment": {
    label: "Shopping & Entertainment",
    color: "hsl(var(--chart-3))",
  },
  transportation: {
    label: "Transportation",
    color: "hsl(var(--chart-4))",
  },
  "health-wellness": {
    label: "Health & Wellness",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;
