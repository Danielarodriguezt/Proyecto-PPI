import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Contacto from "./pages/Contacto";
import './App.css';
import Registro from "./pages/Registro";
import IniciarSesion from "./pages/IniciarSesion";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Inicio />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Servicios" element={<Servicios />} />
        <Route path="/Contacto" element={<Contacto />} />
        <Route path="/IniciarSesion" element={<IniciarSesion />} />
        <Route path="/Registro" element={<Registro />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;