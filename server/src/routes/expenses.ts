import { Hono } from "hono";
import { db } from "../../db";
import { getAuth } from "@hono/clerk-auth";
import { and, desc, eq } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";
import {
  createExpensesSchema,
  expenses,
  updateExpensesSchema,
} from "../../db/schema/expenses";

export const expensesRoute = new Hono()
  .get("/", async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      c.status(401);
      throw new Error("Unauthenticated Request");
    }

    const userExpenses = await db
      .select()
      .from(expenses)
      .where(eq(expenses.userId, auth.userId))
      .orderBy(desc(expenses.createdAt));

    return c.json(userExpenses);
  })
  .post("/", zValidator("json", createExpensesSchema), async (c) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      c.status(401);
      throw new Error("Unauthenticated Request");
    }

    const expense = c.req.valid("json");

    const result = await db
      .insert(expenses)
      .values({
        ...expense,
        userId: auth.userId,
      })
      .returning()
      .then((res) => res[0]);

    c.status(201);
    return c.json(result);
  })
  .get("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const auth = getAuth(c);

    if (!auth?.userId) {
      c.status(401);
      throw new Error("Unauthenticated Request");
    }

    const expense = await db
      .select()
      .from(expenses)
      .where(and(eq(expenses.id, id), eq(expenses.userId, auth.userId)))
      .limit(1)
      .then((res) => res[0]);

    if (!expense) {
      return c.notFound();
    }

    return c.json(expense);
  })
  .put("/:id{[0-9]+}", zValidator("json", updateExpensesSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const auth = getAuth(c);

    if (!auth?.userId) {
      c.status(401);
      throw new Error("Unauthenticated Request");
    }

    const existingExpense = await db
      .select()
      .from(expenses)
      .where(and(eq(expenses.userId, auth.userId), eq(expenses.id, id)))
      .limit(1)
      .then((res) => res[0]);

    if (!existingExpense) {
      return c.notFound();
    }

    const updatedExpenseData = c.req.valid("json");

    const updatedExpense = await db
      .update(expenses)
      .set(updatedExpenseData)
      .where(and(eq(expenses.userId, auth.userId), eq(expenses.id, id)))
      .returning()
      .then((res) => res[0]);

    return c.json(updatedExpense);
  })
  .delete("/:id{[0-9]+}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const auth = getAuth(c);

    if (!auth?.userId) {
      c.status(401);
      throw new Error("Unauthenticated Request");
    }

    const existingExpense = await db
      .select()
      .from(expenses)
      .where(and(eq(expenses.userId, auth.userId), eq(expenses.id, id)))
      .limit(1)
      .then((res) => res[0]);

    if (!existingExpense) {
      return c.notFound();
    }

    const deletedExpense = await db
      .delete(expenses)
      .where(and(eq(expenses.userId, auth.userId), eq(expenses.id, id)))
      .returning()
      .then((res) => res[0]);

    return c.json(deletedExpense);
  });
