import { useTheme } from "@/components/theme-provider"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"

export function ModeToggle() {
	const { theme, setTheme } = useTheme()
	const isDarkMode = theme === "dark"

	const toggleTheme = () => {
		setTheme(isDarkMode ? "light" : "dark")
	}

	return (
		<div className="flex items-center gap-2 px-2">
			<Sun
				size={16}
				className={`${isDarkMode ? "text-muted-foreground" : "text-amber-500"}`}
			/>
			<Switch onCheckedChange={toggleTheme} />
			<Moon
				size={16}
				className={`${isDarkMode ? "text-primary" : "text-muted-foreground"}`}
			/>
		</div>
	)
}
