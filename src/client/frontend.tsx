import { protectedOrganizationAdminRoute } from "@client/layout/ProtectedOrganizationAdminRoutes";
import * as ProtectedRoutes from "@client/routes/protected";
import * as ProtectedAdminRoutes from "@client/routes/protected-admin";
import * as ProtectedOrganizationRoutes from "@client/routes/protected-organization";
import * as ProtectedOrganizationAdminRoutes from "@client/routes/protected-organization-admin";
import * as PublicRoutes from "@client/routes/public";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider";
import { protectedAdminRoute } from "./layout/ProtectedAdminRoutes";
import { protectedOrganizationRoute } from "./layout/ProtectedOrganizationRoutes";
import { protectedRoute } from "./layout/ProtectedRoutes";
import { publicRoutes } from "./layout/PublicRoutes";
import { rootRoute } from "./layout/RootRoutes";

const routeTree = rootRoute.addChildren([
  protectedRoute.addChildren(ProtectedRoutes),
  protectedAdminRoute.addChildren(ProtectedAdminRoutes),
  protectedOrganizationRoute.addChildren(ProtectedOrganizationRoutes),
  protectedOrganizationAdminRoute.addChildren(ProtectedOrganizationAdminRoutes),
  publicRoutes.addChildren(PublicRoutes),
]);
const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  defaultPreloadDelay: 200,
  scrollRestoration: true,
  context: {
    queryClient,
  },
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const elem = document.getElementById("root");
const app = (
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);

if (!elem) {
  throw new Error(
    "Could not find root element. Are you sure it is specified in your html?",
  );
}

// @ts-ignore: Vite-specific HMR API
if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  // @ts-ignore: Vite-specific HMR API
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
