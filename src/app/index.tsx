import { RouterProvider } from "@tanstack/react-router"
// src/main.tsx
import React from "react"
import ReactDOM from "react-dom/client"
import { router } from "./main"

const rootElement = document.getElementById("root")

if (rootElement && !rootElement.innerHTML) {
	ReactDOM.createRoot(rootElement).render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>
	)
} else {
	console.error("CRITICAL: COULD NOT FIND ROOT COMPONENT")
}
