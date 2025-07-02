import { createRoute, Outlet, redirect } from "@tanstack/react-router"
import { protectedOrganizationRoute } from "./ProtectedOrganizationRoutes"

export const protectedOrganizationAdminRoute = createRoute({
	getParentRoute: () => protectedOrganizationRoute,
	id: "protected-organization-admin-layout",
	component: Layout,
	beforeLoad: async ({ context: { activeOrganization, user }, params }) => {
		const activeMember = activeOrganization.members.find(member => {
			return member.userId === user.id
		})

		if (!activeMember || activeMember.role === "member") {
			throw redirect({
				to: "/$slug/sharing",
				params: () => ({ slug: params.slug }),
			})
		}

		return { activeMember }
	},
})

function Layout() {
	return <Outlet />
}
