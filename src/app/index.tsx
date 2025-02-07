import { use, Suspense, cache } from "react"
import { createRoot } from "react-dom/client"

const fetchNames = cache(() => fetch("/api/names").then(res => res.json()))

function Names({ namesPromise }: { namesPromise: Promise<string[]> }) {
	const names = use(namesPromise)

	return (
		<ul>
			{names.map(name => (
				<li key={name}>{name}</li>
			))}
		</ul>
	)
}

function App() {
	return (
		<div>
			<h1 className="text-3xl font-bold">Names</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<Names namesPromise={fetchNames()} />
			</Suspense>
		</div>
	)
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(<App />)
