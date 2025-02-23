import { createRoute } from "@tanstack/react-router"
import { type PropsWithChildren, useState } from "react"
import { rootRoute } from "../layout/Layout"

export const loginRoute = createRoute({
	getParentRoute: () => rootRoute,
	component: Page,
	path: "/login",
})

type Tabs = "login" | "signup"

function Page() {
	const [tab, setTab] = useState<Tabs>("login")

	return (
		<div className="flex flex-col w-xs">
			<div role="tablist" className="tabs tabs-md">
				<button
					type="button"
					role="tab"
					className={`tab rounded-tl-md ${tab === "login" ? "tab-active bg-base-100" : "bg-base-200"}`}
					onClick={() => setTab("login")}
				>
					Login
				</button>
				<button
					type="button"
					role="tab"
					className={`tab rounded-tr-md ${tab === "signup" ? "tab-active bg-base-100" : "bg-base-200"}`}
					onClick={() => setTab("signup")}
				>
					Sign Up
				</button>
			</div>

			<div className="bg-base-100 p-4 rounded-md">
				{tab === "login" ? <Login /> : <SignUp />}
			</div>
		</div>
	)
}

const Login = () => (
	<div className="flex flex-col gap-4">
		<form action="/api/auth/sign-in/email" method="post">
			<fieldset className="flex flex-col gap-4">
				<label className="text-xs font-semibold">
					email
					<input
						type="email"
						name="email"
						className="input w-full mt-2"
						required
						placeholder="Email"
					/>
				</label>

				<label className="text-xs font-semibold">
					password
					<input
						type="password"
						name="password"
						className="input w-full mt-2"
						required
						placeholder="Password"
					/>
				</label>

				<button type="submit" className="btn btn-neutral mt-2">
					Login
				</button>
			</fieldset>
		</form>

		<hr className="h-[1px] border-t-0 bg-base-200" />

		<Google>Login with google</Google>
	</div>
)

function SignUp() {
	return (
		<div className="flex flex-col gap-4">
			<form action="/api/auth/sign-up/email" method="post">
				<fieldset className="flex flex-col gap-4">
					<label className="text-xs font-semibold">
						full name
						<input
							type="input"
							name="name"
							className="input validator w-full mt-2"
							required
							placeholder="Your name"
							maxLength={40}
						/>
						<p className="validator-hint hidden">Required</p>
					</label>

					<label className="text-xs font-semibold">
						email
						<input
							type="email"
							name="email"
							className="input validator w-full mt-2"
							required
							placeholder="Your Email"
							pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
							title="Please enter a valid email address"
						/>
						<p className="validator-hint hidden">
							Must be a valid email address
						</p>
					</label>

					<label className="text-xs font-semibold">
						password
						<input
							type="password"
							name="password"
							className="input validator w-full mt-2"
							required
							placeholder="New Password"
							minLength={8}
							pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
							title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
						/>
						<p className="validator-hint hidden">
							Must be more than 8 characters, including
							<br />
							At least one number
							<br />
							At least one lowercase letter
							<br />
							At least one uppercase letter
						</p>
					</label>

					<label className="text-xs font-semibold">
						profile picture (optional)
						<input
							type="file"
							className="file-input text-xs file-input-sm h-10 mt-2"
							accept="image/*"
						/>
					</label>

					<button type="submit" className="btn btn-neutral mt-2">
						Sign up
					</button>
				</fieldset>
			</form>

			<hr className="h-[1px] border-t-0 bg-base-200" />

			<Google>Sign up with google</Google>
		</div>
	)
}

function Google(props: PropsWithChildren) {
	return (
		<button type="submit" className="btn w-full bg-white text-black">
			<svg
				name=""
				aria-label="Google logo"
				width="16"
				height="16"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<title>Google logo</title>
				<g>
					<path d="m0 0H512V512H0" fill="#fff" />
					<path
						fill="#34a853"
						d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
					/>
					<path
						fill="#4285f4"
						d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
					/>
					<path
						fill="#fbbc02"
						d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
					/>
					<path
						fill="#ea4335"
						d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
					/>
				</g>
			</svg>
			{props.children}
		</button>
	)
}
