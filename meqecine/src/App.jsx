import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

// Páginas
import Home from "./pages/Home";
import Contato from "./pages/Contato";
import Comidas from "./pages/Comidas";
import Localizacao from "./pages/Localizacao";

export default function App() {
  return (
    <BrowserRouter>
      {/* Header fixo em todas as páginas */}
      <Header />

      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/comidas" element={<Comidas />} />
        <Route path="/localizacao" element={<Localizacao />} />
      </Routes>
    </BrowserRouter>
  );
}