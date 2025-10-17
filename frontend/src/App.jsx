import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNotePage from "./pages/CreateNotePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="min-h-screen">
      <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_155%_at_50%_10%,#000_40%,#28c206_100%)]" />
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNotePage />} />
        <Route path="/note/:id" element={<NoteDetailPage />} />
      </Routes>
      
    </div>
  );
}
