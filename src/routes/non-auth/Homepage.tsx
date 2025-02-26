import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { publicRoutes } from "@/layout/PublicRoutes"
import { Link, createRoute } from "@tanstack/react-router"
import {
	BookOpen,
	CheckCircle,
	Clock,
	Code,
	Database,
	ExternalLink,
	FolderOpen,
	Github,
	Monitor,
	Moon,
	Server,
	Sun,
} from "lucide-react"

export const homepageRoute = createRoute({
	getParentRoute: () => publicRoutes,
	component: Page,
	path: "/",
})

function Page() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative">
				<div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-violet-500/20 opacity-30" />
				<div className="container mx-auto px-4 py-24 relative z-10">
					<div className="max-w-3xl mx-auto text-center mb-12">
						<h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
							view
						</h1>
						<h2 className="text-3xl font-bold mb-6">
							Your all-in-one self-hosted backend
						</h2>
						<p className="text-xl mb-8 text-muted-foreground">
							Take control of your personal media with a modern, privacy-focused
							solution
						</p>
						<div className="flex gap-4 justify-center">
							<Button asChild variant="outline">
								<Link to="/docs">
									<BookOpen />
									Documentation
								</Link>
							</Button>
							<Button asChild>
								<Link to="/login">Get Started</Link>
							</Button>
						</div>
					</div>

					<Card className="mx-auto max-w-4xl overflow-hidden">
						<CardContent className="p-0">
							<div className="aspect-video bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center relative overflow-hidden">
								<div className="absolute inset-1 sm:inset-4 md:inset-12 rounded-lg bg-card border border-border shadow-2xl flex flex-col overflow-hidden">
									{/* Window header */}
									<div className="h-6 md:h-8 min-h-[24px] border-b border-border flex items-center px-2 md:px-3 gap-1 shrink-0">
										<div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-destructive" />
										<div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-500" />
										<div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500" />
										<div className="ml-2 md:ml-4 text-[10px] md:text-xs text-muted-foreground truncate">
											view - Media
										</div>
									</div>

									{/* Content area without scrolling */}
									<div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-1 md:gap-2 p-2 md:p-4">
										{/* Sidebar - hidden on mobile */}
										<div className="hidden md:grid grid-cols-1 gap-2 content-start">
											<div className="py-2 md:py-4 bg-muted rounded" />
											<div className="py-2 md:py-4 bg-muted rounded" />
											<div className="py-2 md:py-4 bg-primary rounded" />
											<div className="py-2 md:py-4 bg-muted rounded" />
										</div>

										{/* Main content grid - 3x3 on all screen sizes */}
										<div className="col-span-1 md:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-2">
											{[1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
												<div
													key={i}
													className="aspect-[4/3] xs:aspect-video bg-muted rounded shadow-md"
												/>
											))}
										</div>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Features Grid */}
			<section className="bg-muted py-24">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
					<div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						{[
							{
								icon: <Database className="h-8 w-8 text-primary" />,
								title: "Media Storage",
								description:
									"Store all your photos, videos, and documents in one secure, self-hosted location with automatic organization and backup.",
							},
							{
								icon: <Monitor className="h-8 w-8 text-violet-500" />,
								title: "Cross-platform Viewing",
								description:
									"Access your media from any device with a beautiful, responsive interface that adapts to your screen size.",
							},
							{
								icon: <Server className="h-8 w-8 text-green-500" />,
								title: "Self-hosting Benefits",
								description:
									"Maintain complete control over your data with no subscription fees or privacy concerns that come with cloud services.",
							},
							{
								icon: <FolderOpen className="h-8 w-8 text-amber-500" />,
								title: "Organization",
								description:
									"Powerful tagging, search, and AI-assisted organization keeps your media collection structured and easily accessible.",
							},
						].map(({ title, description, icon }) => (
							<Card
								key={title + description}
								className="hover:border-primary transition-all"
							>
								<CardHeader>
									<div className="mb-2">{icon}</div>
									<CardTitle>{title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground">{description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Progress/Roadmap Section */}
			<section className="py-24 container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Development Roadmap
				</h2>
				<div className="max-w-3xl mx-auto">
					{[
						{
							category: "Authentication & Security",
							progress: 50,
							features: [
								{ name: "Email & Password Authentiation", completed: true },
								{ name: "OAuth Integration", completed: true },
								{ name: "Two-factor Authentication", completed: false },
								{ name: "Role-based Access Control", completed: false },
							],
						},
						{
							category: "Media Management",
							progress: 0,
							features: [
								{ name: "Automatic Organization", completed: false },
								{ name: "Metadata Extraction", completed: false },
								{ name: "Face Recognition", completed: false },
								{ name: "AI Tagging", completed: false },
							],
						},
						{
							category: "Platform Support",
							progress: 25,
							features: [
								{ name: "Web Interface", completed: true },
								{ name: "Mobile Apps", completed: false },
								{ name: "TV Applications", completed: false },
								{ name: "Desktop Sync", completed: false },
							],
						},
					].map(category => (
						<Card key={category.category} className="mb-6 bg-card">
							<CardHeader>
								<div className="flex justify-between items-center mb-2">
									<CardTitle>{category.category}</CardTitle>
									<span className="text-sm text-muted-foreground">
										{category.progress}% Complete
									</span>
								</div>
								<Progress value={category.progress} className="h-2" />
							</CardHeader>
							<CardContent>
								<div className="space-y-3">
									{category.features.map(feature => (
										<div key={feature.name} className="flex items-center gap-2">
											{feature.completed ? (
												<CheckCircle className="h-5 w-5 text-green-500" />
											) : (
												<Clock className="h-5 w-5 text-amber-500" />
											)}
											<span
												className={
													feature.completed ? "" : "text-muted-foreground"
												}
											>
												{feature.name}
											</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</section>

			{/* Inspirations/Comparisons Section */}
			<section className="bg-muted py-24">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">
						Inspired By The Best
					</h2>
					<div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
						{[
							{
								name: "Google Photos",
								logo: "📸",
								relation: "Modern photo gallery and media ",
								differentiator: "Complete privacy and data ownership",
							},
							{
								name: "Netflix",
								logo: "🎬",
								relation: "Self-hosted media streaming",
								differentiator:
									"Simplified setup with focus on personal content",
							},
							{
								name: "OneDrive",
								logo: "☁️",
								relation: "Seamless multi-device access",
								differentiator: "No subscription fees or storage limits",
							},
						].map(comparison => (
							<Card key={comparison.name + comparison.relation}>
								<CardHeader className="text-center">
									<div className="text-4xl mb-2">{comparison.logo}</div>
									<CardTitle>{comparison.name}</CardTitle>
								</CardHeader>
								<CardContent className="text-center">
									<p className="mb-4">{comparison.relation}</p>
									<Separator className="my-4" />
									<p className="font-medium text-primary">
										{comparison.differentiator}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Technical Highlights */}
			<section className="py-24 container mx-auto px-4">
				<h2 className="text-3xl font-bold text-center mb-12">
					Technical Highlights
				</h2>
				<Card className="max-w-3xl mx-auto">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Code className="h-5 w-5 text-primary" />
							Built with modern technologies
						</CardTitle>
						<CardDescription>
							A powerful stack that prioritizes performance and security
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex gap-4 flex-wrap justify-center">
							{/* Updated tech stack as requested */}
							{[
								"TypeScript",
								"React",
								"Bun",
								"Docker",
								"SQLite",
								"S3 Storage",
							].map(tech => (
								<div
									key={tech}
									className="px-3 py-1 rounded-full text-sm bg-muted"
								>
									{tech}
								</div>
							))}
						</div>

						<Card className="bg-muted/50">
							<CardContent className="p-4 font-mono text-sm overflow-x-auto">
								<pre className="text-primary">bun install</pre>
								<pre className="text-primary">bun start</pre>
								<pre className="text-gray-500">
									$ NODE_ENV=production bun src/index.tsx
								</pre>
								<pre className="text-green-500">
									🗂️ Running sqlite at data\sqlite.db
								</pre>
								<pre className="text-green-500">
									🚀 Server started at http://127.0.0.1:3000
								</pre>
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</section>

			{/* CTA Section */}
			<section className="py-24">
				<div className="container mx-auto px-4">
					<Card className="max-w-4xl mx-auto overflow-hidden relative">
						<div className="absolute inset-0 bg-gradient-to-br from-primary to-violet-600 opacity-90" />
						{/* Added more top padding to fix spacing issue */}
						<CardContent className="relative z-10 text-center py-20 px-6">
							<h2 className="text-3xl font-bold text-white mb-6">
								Ready to take control of your media?
							</h2>
							<p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
								Join "thousands" of users who have already switched to a
								self-hosted solution and experience the freedom of owning your
								data.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<a href="https://github.com/hansaskov/view">
									<Button
										size="lg"
										className="bg-secondary-foreground text-secondary border-none hover:bg-secondary-foreground/90"
									>
										Start Self-Hosting
									</Button>
								</a>
								{/* Fixed contrast issue with button */}
								<Button
									asChild
									size="lg"
									variant="secondary"
									className="bg-primary-foreground text-primary border-none hover:bg-primary-foreground/90"
								>
									<Link to="/docs">
										<BookOpen className="mr-2 h-4 w-4" />
										Read the Docs
									</Link>
								</Button>
							</div>
						</CardContent>
					</Card>
				</div>
			</section>
		</>
	)
}
