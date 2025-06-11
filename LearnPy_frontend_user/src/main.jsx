import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// Importar los componentes de las páginas
import ListarLecciones from "./pages/listarLecciones/listarLecciones"
import CrearLeccion from "./pages/crearLeccion/crearLeccion"
import VerLeccion from "./pages/verLecciones/verLeccion"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
         <Route path="/" element={<App />} />

          {/* Ruta para crear nueva lección */}
        <Route path="/listar" element={<ListarLecciones />} />

        {/* Ruta para crear nueva lección */}
        <Route path="/crear-leccion" element={<CrearLeccion />} />
        
        {/* Ruta para editar lección existente */}
        <Route path="/crear-leccion/:id" element={<CrearLeccion />} />
        
        {/* Ruta para ver lección como estudiante */}
        <Route path="/curso/:id" element={<VerLeccion />} />        
      </Routes>
    </Router>
  </React.StrictMode>,
)
