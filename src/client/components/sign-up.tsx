import { Button } from "@client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@client/components/ui/card"
import { Input } from "@client/components/ui/input"
import { Label } from "@client/components/ui/label"
import { authClient } from "@client/lib/auth-client"
import { Link, useNavigate } from "@tanstack/react-router"
import { Loader2, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function SignUp() {
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")
	const [image, setImage] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (file) {
			setImage(file)
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreview(reader.result as string)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<Card className="w-sm">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Sign Up</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					className="grid gap-4"
					onSubmit={async e => {
						e.preventDefault()
						await authClient.signUp.email({
							email,
							password,
							name: `${firstName} ${lastName}`,
							image: image ? await convertImageToBase64(image) : "",
							callbackURL: "/dashboard",
							fetchOptions: {
								onResponse: () => {
									setLoading(false)
								},
								onRequest: () => {
									setLoading(true)
								},
								onError: ctx => {
									toast.error(ctx.error.message)
								},
								onSuccess: async () => {
									navigate({ to: "/movies" })
								},
							},
						})
					}}
				>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label htmlFor="first-name">First name</Label>
							<Input
								placeholder="Max"
								required
								onChange={e => {
									setFirstName(e.target.value)
								}}
								value={firstName}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="last-name">Last name</Label>
							<Input
								placeholder="Robinson"
								required
								onChange={e => {
									setLastName(e.target.value)
								}}
								value={lastName}
							/>
						</div>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							placeholder="m@example.com"
							required
							onChange={e => {
								setEmail(e.target.value)
							}}
							value={email}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Password</Label>
						<Input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							autoComplete="new-password"
							placeholder="Password"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="password">Confirm Password</Label>
						<Input
							type="password"
							value={passwordConfirmation}
							onChange={e => setPasswordConfirmation(e.target.value)}
							autoComplete="new-password"
							placeholder="Confirm Password"
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="image">Profile Image (optional)</Label>
						<div className="flex items-end gap-4">
							{imagePreview && (
								<div className="relative w-16 h-16 rounded-sm overflow-hidden">
									<img
										src={imagePreview}
										alt="Profile preview"
										style={{ objectFit: "cover" }}
									/>
								</div>
							)}
							<div className="flex items-center gap-2 w-full">
								<Input
									type="file"
									accept="image/*"
									onChange={handleImageChange}
									className="w-full"
								/>
								{imagePreview && (
									<X
										className="cursor-pointer"
										onClick={() => {
											setImage(null)
											setImagePreview(null)
										}}
									/>
								)}
							</div>
						</div>
					</div>
					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? (
							<Loader2 size={16} className="animate-spin" />
						) : (
							"Create an account"
						)}
					</Button>
				</form>
			</CardContent>
			<CardFooter>
				<div className="flex justify-center w-full border-t pt-4">
					<p className="text-center text-xs text-neutral-500">
						already have an account?{" "}
						<Link
							to="/login"
							className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent"
						>
							login here.
						</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
	)
}

async function convertImageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.onloadend = () => resolve(reader.result as string)
		reader.onerror = reject
		reader.readAsDataURL(file)
	})
}
