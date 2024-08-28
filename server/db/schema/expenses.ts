import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import {
  numeric,
  text,
  pgTable,
  serial,
  index,
  timestamp,
  date,
} from "drizzle-orm/pg-core";

export const expenses = pgTable(
  "expenses",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    category: text("category").notNull(),
    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
    date: date("date").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (expenses) => {
    return {
      userIdIndex: index("name_idx").on(expenses.userId),
    };
  }
);

const baseCreateSchema = createInsertSchema(expenses);

export const createExpensesSchema = baseCreateSchema.omit({
  userId: true,
  id: true,
  createdAt: true,
});
export type CreateExpenseT = z.infer<typeof createExpensesSchema>;
export const updateExpensesSchema = createExpensesSchema.partial();
export type UpdateExpenseT = z.infer<typeof updateExpensesSchema>;

export type ExpensesT = {
  date: string;
  id: number;
  userId: string;
  title: string;
  category: string;
  amount: string;
  createdAt: string | null;
};
