import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CrearLecciones from "./pages/crearLecciones"
import ListaLecciones from "./pages/ListaLecciones"
import "./App.css" // Añadimos un archivo CSS global
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaLecciones />} />
        <Route path="/crear-leccion" element={<CrearLecciones />} />
      </Routes>
    </Router>
  )
}

export default App
