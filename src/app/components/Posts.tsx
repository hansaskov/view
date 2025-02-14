import type { fetchPosts } from "../fetch/api"

export default function ({
	props,
}: { props: Awaited<ReturnType<typeof fetchPosts>> }) {
	const { data, error } = props

	if (error) return <div>error</div>

	return (
		<ul>
			{data.map(name => (
				<li key={name}>{name}</li>
			))}
		</ul>
	)
}
