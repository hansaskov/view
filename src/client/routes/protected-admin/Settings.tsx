import { protectedAdminRoute } from "@client/layout/ProtectedAdminRoutes";
import { createRoute } from "@tanstack/react-router";

export const settingsRoute = createRoute({
  getParentRoute: () => protectedAdminRoute,
  component: Page,
  path: "/settings",
});

function Page() {
  return <>Settings</>;
}
