import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { SignIn } from "./components/SignIn.tsx";
import { SignUp } from "./components/SignUp.tsx";
import { MainPage } from "./components/Main.tsx";

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<App />} />
			<Route path="/signIn" element={<SignIn />} />
			<Route path="/signUp" element={<SignUp />} />
			<Route path="/mainPage" element={<MainPage />} />
		</Routes>
	</BrowserRouter>
);
