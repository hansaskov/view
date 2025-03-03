"use client"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
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
		const { data, error } = await authClient.organization.create(
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
					<Plus className="mr-2 h-4 w-4" />
					<span>Create Organization</span>
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create New Organization</DialogTitle>
					<DialogDescription>
						Fill in the details to create a new organization for your team.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization Name</FormLabel>
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
									<FormDescription>
										The name of your new organization
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Organization Slug</FormLabel>
									<FormControl>
										<Input placeholder="acme-inc" {...field} />
									</FormControl>
									<FormDescription>
										This will be used in URLs for your organization.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="logo"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Logo URL (Optional)</FormLabel>
									<FormControl>
										<Input
											placeholder="https://example.com/logo.png"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Leave blank if you don't have a logo yet.
									</FormDescription>
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
