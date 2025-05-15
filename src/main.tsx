import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import { Profile } from "./pages/Profile.tsx";
import { Layout } from "./components/Layout.tsx";
import '@ant-design/v5-patch-for-react-19';

createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout/>}>
				<Route path="/" element={<App />} />
				<Route path="profile" element={<Profile />} />
			</Route>
		</Routes>
	</BrowserRouter>
);
