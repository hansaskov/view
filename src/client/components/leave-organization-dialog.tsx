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
import { authClient } from "@client/lib/auth-client"
import { LogOut } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface LeaveOrganizationDialogProps {
	organizationId: string
	organizationName?: string
}

export function LeaveOrganizationDialog({
	organizationId,
	organizationName = "this organization",
}: LeaveOrganizationDialogProps) {
	const [open, setOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	async function handleLeaveOrganization() {
		await authClient.organization.leave(
			{
				organizationId,
			},
			{
				onRequest: () => {
					setIsSubmitting(true)
				},
				onError: error => {
					toast.error(`Failed to leave organization: ${error.error.message}`)
				},
				onSuccess: () => {
					toast.success(`You have left ${organizationName}`)
					setOpen(false)
				},
				onResponse: () => {
					setIsSubmitting(false)
				},
			}
		)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<DropdownMenuItem
					onSelect={e => e.preventDefault()}
					className="text-destructive"
				>
					<LogOut className="h-4 w-4" />
					<span>Leave Organization</span>
				</DropdownMenuItem>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Leave Organization</DialogTitle>
					<DialogDescription>
						Are you sure you want to leave {organizationName}? You will lose
						access to all resources within this organization.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button
						variant="outline"
						onClick={() => setOpen(false)}
						disabled={isSubmitting}
					>
						Cancel
					</Button>
					<Button
						variant="destructive"
						onClick={handleLeaveOrganization}
						disabled={isSubmitting}
					>
						{isSubmitting ? "Leaving..." : "Leave Organization"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
