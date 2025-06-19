import { ModeToggle } from "@client/components/mode-toggle"
import { Button } from "@client/components/ui/button"
import { Separator } from "@client/components/ui/separator"
import { createRoute, Link, Outlet } from "@tanstack/react-router"
import { BookOpen, ExternalLink, Github } from "lucide-react"
import { rootRoute } from "./RootRoutes"

export const publicRoutes = createRoute({
	getParentRoute: () => rootRoute,
	id: "public-route",
	component: Layout,
})

function Layout() {
	return (
		<div className={"min-h-screen flex flex-col"}>
			{/* Header - Added sticky positioning */}
			<header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
				<div className="container max-w-6xl px-6 mx-auto py-6 flex justify-between items-center">
					<div className="flex items-center gap-2">
						<Link
							to="/"
							className="text-2xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent"
						>
							view
						</Link>
					</div>
					<div className="flex items-center gap-4">
						<ModeToggle />

						<Button asChild variant="ghost" size="sm">
							<Link to="/docs">Docs</Link>
						</Button>

						<Button asChild variant="ghost" size="sm">
							<a
								href="https://github.com/hansaskov/view"
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</a>
						</Button>
					</div>
				</div>
			</header>

			{/* Main content - Added flex-grow to push footer down */}
			<main className="flex-grow">
				<Outlet />
			</main>

			{/* Footer */}
			<footer className="py-12 bg-background mt-auto">
				<div className="container mx-auto px-4">
					<div className="max-w-4xl mx-auto">
						<div className="flex flex-col md:flex-row justify-between items-center gap-6">
							<div className="flex items-center gap-2">
								<span className="text-xl font-bold bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
									view
								</span>
							</div>

							<div className="flex gap-6">
								<a
									href="https://github.com/hansaskov/view"
									className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
								>
									<Github size={16} />
									<span>GitHub</span>
								</a>
								<Link
									to="/docs"
									className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
								>
									<BookOpen size={16} />
									<span>Documentation</span>
								</Link>
								<a
									href="https://github.com/hansaskov/view"
									className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
								>
									<ExternalLink size={16} />
									<div>Community</div>
								</a>
							</div>
						</div>

						<Separator className="my-8" />

						<div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
							<div>© 2025 view. MIT License.</div>
							<div>Built with shadcn/ui</div>
						</div>
					</div>
				</div>
			</footer>
		</div>
	)
}
