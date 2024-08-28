import { routeTree } from "./routeTree.gen";
import { ClerkProvider, useUser } from "@clerk/clerk-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Toaster } from "sonner";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: {
    isSignedIn: undefined!,
  },
});

function InnerApp() {
  const { isSignedIn } = useUser();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ isSignedIn }} />
    </QueryClientProvider>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Toaster closeButton richColors />
      <InnerApp />
    </ClerkProvider>
  );
}
