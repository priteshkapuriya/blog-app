import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/Login";
import { Posts } from "./pages/Posts";
import { About } from "./pages/About";
import { ProtectedLayout } from "./components/ProtectedLayout";
import "./layout.css";
import "./header.css";
import "./login.css";
import "./post.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route path="/dashboard" element={<ProtectedLayout />}>
        <Route path="posts" element={<Posts />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  );
}
