import { Button } from "@client/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@client/components/ui/card"
import { Checkbox } from "@client/components/ui/checkbox"
import { Input } from "@client/components/ui/input"
import { Label } from "@client/components/ui/label"
import { authClient } from "@client/lib/auth-client"
import { cn } from "@client/lib/utils"
import { loginRoute } from "@client/routes/public"
import { Link, useNavigate } from "@tanstack/react-router"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export function SignIn() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const [rememberMe, setRememberMe] = useState(false)

	const navigate = useNavigate()
	const { redirectURL } = loginRoute.useSearch()

	return (
		<Card className="w-sm">
			<CardHeader>
				<CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
				<CardDescription className="text-xs md:text-sm">
					Enter your email below to login to your account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form
					className="grid gap-4 pb-4"
					onSubmit={async e => {
						e.preventDefault()
						setLoading(true)
						try {
							await authClient.signIn.email({
								email,
								password,
								fetchOptions: {
									onSuccess: () => {
										navigate({ to: redirectURL ?? "/movies" })
									},
									onError: () => {
										setLoading(false)
									},
								},
							})
						} catch (_error) {
							setLoading(false)
						}
					}}
				>
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
						<div className="flex items-center">
							<Label htmlFor="password">Password</Label>
							<Link
								to="/forgot-password"
								className="ml-auto inline-block text-sm underline"
							>
								Forgot your password?
							</Link>
						</div>

						<Input
							type="password"
							placeholder="password"
							autoComplete="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<div className="flex items-center gap-2">
						<Checkbox
							onClick={() => {
								setRememberMe(!rememberMe)
							}}
						/>
						<Label htmlFor="remember">Remember me</Label>
					</div>

					<Button type="submit" className="w-full" disabled={loading}>
						{loading ? <Loader2 size={16} className="animate-spin" /> : "Login"}
					</Button>
				</form>

				<div
					className={cn(
						"w-full gap-3 flex items-center",
						"justify-between flex-col"
					)}
				>
					<Button
						type="button"
						variant="outline"
						className={cn("w-full gap-2")}
						onClick={async () => {
							setLoading(true)
							try {
								await authClient.signIn.social({
									provider: "google",
									callbackURL: redirectURL ?? "/movies",
								})
							} catch (_error) {
								setLoading(false)
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="0.98em"
							height="1em"
							viewBox="0 0 256 262"
						>
							<title>Google Logo</title>
							<path
								fill="#4285F4"
								d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
							/>
							<path
								fill="#34A853"
								d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
							/>
							<path
								fill="#FBBC05"
								d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
							/>
							<path
								fill="#EB4335"
								d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
							/>
						</svg>
						Sign in with Google
					</Button>
					<Button
						variant="outline"
						className={cn("w-full gap-2")}
						onClick={async () => {
							setLoading(true)
							try {
								await authClient.signIn.social({
									provider: "microsoft",
									callbackURL: redirectURL ?? "/movies",
								})
							} catch (_error) {
								setLoading(false)
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<title>Microsoft Logo</title>
							<path
								fill="currentColor"
								d="M2 3h9v9H2zm9 19H2v-9h9zM21 3v9h-9V3zm0 19h-9v-9h9z"
							/>
						</svg>
						Sign in with Microsoft
					</Button>
					<Button
						variant="outline"
						className={cn("w-full gap-2")}
						onClick={async () => {
							setLoading(true)
							try {
								await authClient.signIn.social({
									provider: "github",
									callbackURL: redirectURL ?? "/movies",
								})
							} catch (_error) {
								setLoading(false)
							}
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="1em"
							height="1em"
							viewBox="0 0 24 24"
						>
							<title>GitHub Logo</title>
							<path
								fill="currentColor"
								d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"
							/>
						</svg>
						Sign in with Github
					</Button>
				</div>
			</CardContent>
			<CardFooter>
				<div className="flex justify-center w-full border-t pt-4">
					<p className="text-center text-xs text-neutral-500">
						no account?{" "}
						<Link
							to="/sign-up"
							className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent"
						>
							sign up here.
						</Link>
					</p>
				</div>
			</CardFooter>
		</Card>
	)
}
