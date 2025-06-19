"use client"
import { Button } from "@client/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@client/components/ui/dialog"
import { DropdownMenuItem } from "@client/components/ui/dropdown-menu"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@client/components/ui/form"
import { Input } from "@client/components/ui/input"
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@client/components/ui/tooltip"
import { authClient } from "@client/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Info, Plus } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

// Schema for organization creation form
const organizationFormSchema = z.object({
	name: z.string().min(2, {
		message: "Organization name must be at least 2 characters.",
	}),
	slug: z
		.string()
		.min(2, {
			message: "Slug must be at least 2 characters.",
		})
		.regex(/^[a-z0-9-]+$/, {
			message: "Slug can only contain lowercase letters, numbers, and hyphens.",
		}),
	logo: z
		.string()
		.url({ message: "Please enter a valid URL." })
		.optional()
		.or(z.literal("")),
})

type OrganizationFormValues = z.infer<typeof organizationFormSchema>

export function CreateOrganizationDialog() {
	const [open, setOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const form = useForm<OrganizationFormValues>({
		resolver: zodResolver(organizationFormSchema),
		defaultValues: {
			name: "",
			slug: "",
			logo: "",
		},
	})

	async function onSubmit(values: OrganizationFormValues) {
		await authClient.organization.create(
			{
				name: values.name,
				slug: values.slug,
				...(values.logo ? { logo: values.logo } : {}),
			},
			{
				onRequest: () => {
					setIsSubmitting(true)
				},
				onError: error => {
					toast.error(`Failed to create organization, ${error.error.message}`)
				},
				onSuccess: () => {
					setOpen(false)
					form.reset()
				},
				onResponse: () => {
					setIsSubmitting(false)
				},
			}
		)
	}

	function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
		const name = e.target.value
		const slug = name
			.toLowerCase()
			.replace(/\s+/g, "-")
			.replace(/[^a-z0-9-]/g, "")

		form.setValue("slug", slug)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem onSelect={e => e.preventDefault()}>
					<Plus className="h-4 w-4" />
					<span>Create Organization</span>
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Organization</DialogTitle>
					<DialogDescription>
						Choose the name, slug and logo for your new organization
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center space-x-2">
										<FormLabel>Name</FormLabel>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Info className="h-4 w-4 text-muted-foreground" />
												</TooltipTrigger>
												<TooltipContent>
													The name of your new organization
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<FormControl>
										<Input
											placeholder="Acme Inc."
											{...field}
											onChange={e => {
												field.onChange(e)
												handleNameChange(e)
											}}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center space-x-2">
										<FormLabel>Slug</FormLabel>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Info className="h-4 w-4 text-muted-foreground" />
												</TooltipTrigger>
												<TooltipContent>
													This will be used in URLs for your organization.
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<FormControl>
										<Input placeholder="acme-inc" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="logo"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center space-x-2">
										<FormLabel>Logo URL (Optional)</FormLabel>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Info className="h-4 w-4 text-muted-foreground" />
												</TooltipTrigger>
												<TooltipContent>
													Leave blank if you don't have a logo yet.
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</div>
									<FormControl>
										<Input
											placeholder="https://example.com/logo.png"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<DialogFooter>
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Creating..." : "Create Organization"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
