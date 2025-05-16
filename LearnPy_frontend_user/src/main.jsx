import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import App from "./App"
import CrearLecciones from "./pages/crearLecciones"
import Ejercicios from "./pages/ejercicios"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/crear-leccion" element={<CrearLecciones />} />
        <Route path="/ejercicios" element={<Ejercicios />} />
      </Routes>
    </Router>
  </React.StrictMode>,
)
