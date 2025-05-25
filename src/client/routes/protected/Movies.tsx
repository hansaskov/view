import { protectedRoute } from "@client/layout/ProtectedRoutes";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../layout/RootRoutes";

export const moviesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  component: Page,
  path: "/movies",
});

function Page() {
  return <>Movies</>;
}
