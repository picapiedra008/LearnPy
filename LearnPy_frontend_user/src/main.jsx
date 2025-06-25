import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes principales
import App from "./App";
//import "./index.css";

// Páginas
import ListarLecciones from "./pages/listarLecciones/listarLecciones";
import CrearLeccion from "./pages/crearLeccion/crearLeccion"; // Para crear y editar
import VerLeccion from "./pages/verLecciones/verLeccion";

import Ejercicios from "./pages/ejercicios";
import Compilador from "./pages/Compilador/compilador";

import EjerciciosEstudiante from "./pages/ejerciciosEstudiante";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />

        {/* Listar lecciones */}
        <Route path="/listar" element={<ListarLecciones />} />


        {/* Crear y editar lecciones */}
        <Route path="/crear-leccion" element={<CrearLeccion />} />
        <Route path="/editar-leccion/:id" element={<CrearLeccion />} />
        {/* Ver lecciones como docente*/}
        <Route path="/ver-leccion/:lessonCode" element={<VerLeccion />} />

        {/* Ver lección como estudiante */}
        <Route path="/curso/:id" element={<VerLeccion />} />

        {/* Otros módulos */}
        <Route path="/ejercicios" element={<Ejercicios />} />
        <Route path="/compilador" element={<Compilador />} />
        
        <Route path="/entorno" element={<EjerciciosEstudiante/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
