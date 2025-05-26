import {
	Alert,
	AlertDescription,
	AlertTitle,
} from "@client/components/ui/alert"
import { Button } from "@client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@client/components/ui/card"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@client/components/ui/dialog"
import { Input } from "@client/components/ui/input"
import { Label } from "@client/components/ui/label"
import { Separator } from "@client/components/ui/separator"
import { protectedOrganizationAdminRoute } from "@client/layout/ProtectedOrganizationAdminRoutes"
import { authClient } from "@client/lib/auth-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createRoute, redirect, useRouter } from "@tanstack/react-router"
import { AlertCircle, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export const orgSettingsRoute = createRoute({
	getParentRoute: () => protectedOrganizationAdminRoute,
	component: Page,
	path: "/settings",
})

function Page() {
	const { activeOrganization, queryClient } = orgSettingsRoute.useRouteContext()
	const navigate = orgSettingsRoute.useNavigate()
	const [orgName, setOrgName] = useState(activeOrganization.name)
	const [orgSlug, setOrgSlug] = useState(activeOrganization.slug)
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
	const [deleteConfirmText, setDeleteConfirmText] = useState("")

	// Update organization mutation
	const updateMutation = useMutation({
		mutationFn: async () => {
			return await authClient.organization.update({
				data: {
					name: orgName,
					slug: orgSlug,
				},

				fetchOptions: {
					onSuccess: async ({ data }) => {
						toast("Organization updated", {
							description: `New name is ${data.name}`,
						})

						// Invalidate queries to refresh data
						await queryClient.invalidateQueries({
							queryKey: ["organization", activeOrganization.slug],
						})

						navigate({
							to: ".",
							params: prev => ({ ...prev, slug: orgSlug }),
						})
					},

					onError: error => {
						toast.error("Failed to update organization", {
							description:
								error.error.message ||
								"Something went wrong. Please try again.",
						})
					},
				},
			})
		},
	})

	// Delete organization mutation
	const deleteMutation = useMutation({
		mutationFn: async () => {
			return await authClient.organization.delete({
				organizationId: activeOrganization.id,
			})
		},
		onSuccess: () => {
			toast.success("Organization deleted", {
				description: "Your organization has been permanently deleted.",
			})

			navigate({
				to: "/movies",
			})
		},
		onError: error => {
			toast.error("Failed to delete organization", {
				description: error.message || "Something went wrong. Please try again.",
			})
			setDeleteDialogOpen(false)
		},
	})

	const handleDeleteOrg = () => {
		if (deleteConfirmText !== activeOrganization.name) {
			toast.error("Confirmation failed", {
				description:
					"Please type the organization name correctly to confirm deletion.",
			})
			return
		}

		deleteMutation.mutate()
	}

	return (
		<div className="px-10 py-6">
			<div className="container max-w-4xl py-6 space-y-6">
				<div className="space-y-0.5">
					<h2 className="text-2xl font-bold tracking-tight">
						Organization Settings
					</h2>
					<p className="text-muted-foreground">
						Manage your organization's details and preferences
					</p>
				</div>

				{/* Organization Info Form */}
				<form
					onSubmit={e => {
						e.preventDefault()
						updateMutation.mutate()
					}}
				>
					<Card>
						<CardHeader>
							<CardTitle>Organization Information</CardTitle>
							<CardDescription>
								Update your organization's basic information
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{updateMutation.isError && (
								<Alert variant="destructive">
									<AlertCircle className="h-4 w-4" />
									<AlertTitle>Error</AlertTitle>
									<AlertDescription>
										{updateMutation.error?.message ||
											"Failed to update organization. Please try again."}
									</AlertDescription>
								</Alert>
							)}

							<div className="grid gap-2">
								<Label htmlFor="orgName">Organization Name</Label>
								<Input
									id="orgName"
									value={orgName}
									onChange={e => setOrgName(e.target.value)}
									disabled={updateMutation.isPending}
									required
								/>
							</div>

							<div className="grid gap-2">
								<Label htmlFor="orgSlug">Slug</Label>
								<div className="flex items-center gap-2">
									<span className="text-muted-foreground">
										example.com/org/
									</span>
									<Input
										id="orgSlug"
										value={orgSlug}
										onChange={e => setOrgSlug(e.target.value)}
										disabled={updateMutation.isPending}
										required
										className="flex-1"
									/>
								</div>
								<p className="text-sm text-muted-foreground">
									This will be used in URLs. Use lowercase letters, numbers, and
									hyphens only.
								</p>
							</div>
						</CardContent>
						<CardFooter className="flex justify-end">
							<Button
								type="submit"
								disabled={
									updateMutation.isPending ||
									(orgName === activeOrganization.name &&
										orgSlug === activeOrganization.slug)
								}
							>
								{updateMutation.isPending && (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								)}
								Save Changes
							</Button>
						</CardFooter>
					</Card>
				</form>

				{/* Danger Zone */}
				<Card className="border-destructive">
					<CardHeader>
						<CardTitle className="text-destructive">Danger Zone</CardTitle>
						<CardDescription>
							Destructive actions that cannot be undone
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="rounded-md border border-destructive p-4">
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
								<div>
									<h4 className="font-medium">Delete this organization</h4>
									<p className="text-sm text-muted-foreground">
										Permanently delete this organization and all of its data.
										This action cannot be undone.
									</p>
								</div>
								<Dialog
									open={deleteDialogOpen}
									onOpenChange={setDeleteDialogOpen}
								>
									<DialogTrigger asChild>
										<Button variant="destructive">Delete Organization</Button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Delete Organization</DialogTitle>
											<DialogDescription>
												This action cannot be undone. This will permanently
												delete the organization
												<strong> {activeOrganization.name}</strong> and all
												associated data.
											</DialogDescription>
										</DialogHeader>
										<div className="py-4 space-y-4">
											{deleteMutation.isError && (
												<Alert variant="destructive">
													<AlertCircle className="h-4 w-4" />
													<AlertTitle>Error</AlertTitle>
													<AlertDescription>
														{deleteMutation.error?.message ||
															"Failed to delete organization. Please try again."}
													</AlertDescription>
												</Alert>
											)}
											<p className="text-sm">
												To confirm, please type{" "}
												<strong>{activeOrganization.name}</strong> below:
											</p>
											<Input
												value={deleteConfirmText}
												onChange={e => setDeleteConfirmText(e.target.value)}
												placeholder={activeOrganization.name}
												disabled={deleteMutation.isPending}
											/>
										</div>
										<DialogFooter>
											<Button
												variant="outline"
												onClick={() => setDeleteDialogOpen(false)}
												disabled={deleteMutation.isPending}
											>
												Cancel
											</Button>
											<Button
												variant="destructive"
												onClick={handleDeleteOrg}
												disabled={
													deleteMutation.isPending ||
													deleteConfirmText !== activeOrganization.name
												}
											>
												{deleteMutation.isPending && (
													<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												)}
												Delete Organization
											</Button>
										</DialogFooter>
									</DialogContent>
								</Dialog>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
