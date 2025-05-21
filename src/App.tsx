import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import styles from "./App.module.scss";
import { MainPage } from "./components/MainPage";
import { Profile } from "./pages/Profile";
import { Layout } from "./components/Layout";

function App() {
  return (
    <div className={styles.container}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
