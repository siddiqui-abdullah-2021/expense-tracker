import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import { expensesRoute } from "./src/routes/expenses";

const app = new Hono();
app.use("*", clerkMiddleware());

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

export default app;
export type ApiRoutes = typeof apiRoutes;
