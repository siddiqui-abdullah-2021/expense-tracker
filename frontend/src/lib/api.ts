import { hc } from "hono/client";
import { ApiRoutes } from "../../../server/app";
import {
  CreateExpenseT,
  ExpensesT,
  UpdateExpenseT,
} from "../../../server/db/schema/expenses";

const client = hc<ApiRoutes>("/");
const api = client.api;

export async function createExpense({ value }: { value: CreateExpenseT }) {
  const res = await api.expenses.$post({ json: value });
  if (!res.ok) {
    throw new Error("server error");
  }
}

export async function getAllExpenses() {
  const res = await api.expenses.$get();
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = await res.json();
  return data;
}

export async function getExpenseById(id: string) {
  const res = await api.expenses[":id{[0-9]+}"].$get({
    param: { id: id },
  });
  if (!res.ok) {
    throw new Error("server error");
  }
  const data = (await res.json()) as ExpensesT;
  return data;
}

export async function updateExpense({
  id,
  value,
}: {
  id: number;
  value: UpdateExpenseT;
}) {
  const res = await api.expenses[":id{[0-9]+}"].$put({
    param: { id: id.toString() },
    json: value,
  });

  if (!res.ok) {
    throw new Error("server error");
  }
}

export async function deleteExpense({ id }: { id: number }) {
  const res = await api.expenses[":id{[0-9]+}"].$delete({
    param: { id: id.toString() },
  });

  if (!res.ok) {
    throw new Error("server error");
  }
}
