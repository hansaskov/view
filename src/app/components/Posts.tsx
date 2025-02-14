import { use } from "react"
import type { fetchPosts } from "../fetch/api"

export default function ({
	namesPromise,
}: { namesPromise: ReturnType<typeof fetchPosts> }) {
	const { data, error } = use(namesPromise)

	if (error) return <div>error</div>

	return (
		<ul>
			{data.map(name => (
				<li key={name}>{name}</li>
			))}
		</ul>
	)
}
