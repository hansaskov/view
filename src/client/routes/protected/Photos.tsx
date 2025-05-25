import { protectedRoute } from "@client/layout/ProtectedRoutes";
import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../layout/RootRoutes";

export const photosRoute = createRoute({
  getParentRoute: () => protectedRoute,
  component: Page,
  path: "/photos",
});

function Page() {
  return <>Photos</>;
}
