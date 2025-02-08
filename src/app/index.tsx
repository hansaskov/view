import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import Homepage from "./homepage";
import Login from "./login";

const root = document.getElementById("root")

if (!root) {
	console.error("ERROR: ROOT NOT FOUND")
}

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(root!).render(
  <BrowserRouter>
	<Routes >
		<Route path="/" element={<Homepage />}/>
		<Route path="/login" element={<Login />}/>
	</Routes>
  </BrowserRouter>
);
