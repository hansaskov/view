import { authClient } from "@client/lib/auth-client"
import { queryOptions } from "@tanstack/react-query"
import { createRoute, Outlet, redirect } from "@tanstack/react-router"
import { protectedRoute } from "./ProtectedRoutes"

// Define query options for organization data
const orgQueryOptions = (slug: string) =>
	queryOptions({
		queryKey: ["organization", slug],
		queryFn: () =>
			authClient.organization.setActive({
				organizationSlug: slug,
			}),
		staleTime: 30 * 1000, // 30 seconds
	})

export const protectedOrganizationRoute = createRoute({
	getParentRoute: () => protectedRoute,
	path: "$slug",
	component: Layout,
	beforeLoad: async ({ context: { queryClient }, params: { slug } }) => {
		// Use queryClient.fetchQuery to fetch and cache the organization data
		const { data: activeOrganization } = await queryClient.fetchQuery(
			orgQueryOptions(slug)
		)

		if (!activeOrganization) {
			throw redirect({
				to: "/movies",
			})
		}

		return { activeOrganization }
	},
})

function Layout() {
	return (
		<>
			<Outlet />
		</>
	)
}
