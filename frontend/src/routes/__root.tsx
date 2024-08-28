import Navbar from "@/components/navbar";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface MyRouterContext {
  isSignedIn: boolean | undefined;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
