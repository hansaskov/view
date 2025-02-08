import { Link, NavLink } from "react-router";



export default function() {
    return (
    <div className="min-h-screen flex flex-col">
        <main className="flex-grow flex flex-col gap-4 items-center justify-center">
        <h1 className="text-4xl font-bold text-primary animate-bounce">
            Hi Hansi, how are you?
        </h1>

        <NavLink to="login" className="text-3xl font-bold italic text-primary underline animate-bounce">Click me</NavLink>
        </main>
    </div>
    )
}