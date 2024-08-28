import { Hono } from "hono";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

const apiRoutes = app.basePath("/api").route("/expenses", expensesRoute);

export default {
  port: process.env.PORT,
  fetch: app.fetch,
};

export type ApiRoutes = typeof apiRoutes;
