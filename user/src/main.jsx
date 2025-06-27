import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VerEjercicio from "./pages/verLeccion/verEjercicio";

// Componentes principales
import App from "./App";
import "./index.css";

// Páginas
import ListarLecciones from "./pages/listarLecciones/listarLecciones";
import CrearLeccion from "./pages/crearLeccion/crearLeccion"; // Para crear y editar
import VerLeccion from "./pages/verLeccion/verLeccion";

import Compilador from "./pages/Compilador/compilador";



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

        {/* Ver lección c*/}
        <Route path="/VerLecion" element={<VerLeccion />} />
        <Route path="/compilador" element={<Compilador />} />   
        <Route path="/ver-leccion/:lessonCode" element={<VerLeccion />} />
        <Route path="/curso/:id" element={<VerLeccion />} />
       <Route path="/ver-ejercicio/:topicCode/:exerciseId" element={<VerEjercicio />} />

      </Routes>
    </Router>
  </React.StrictMode>
);
