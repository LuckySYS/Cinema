import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Contato from "./pages/contato";
import MovieDetails from "./pages/MovieDetails.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}
