"use client"

import { Link, NavLink } from "react-router-dom"
import { Bell } from "lucide-react"
import "./navBar.css"
import { motion } from "framer-motion"

// Componente de botón personalizado
const Button = ({ children, className = "", onClick }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

const NavBar = () => {
  return (
      <header className="sticky-header">
        <div className="container header-container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0 }}
            className="flex-items-center"
          >
            <div className="logo-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 9H7.5a2.5 2.5 0 0 1 0-5H12m0 0v5m0-5h4.5a2.5 2.5 0 0 1 0 5H12" />
                <path d="M12 15H7.5a2.5 2.5 0 0 0 0 5H12m0 0v-5m0 5h4.5a2.5 2.5 0 0 0 0-5H12" />
              </svg>
            </div>
            <span className="logo-text">LearnPy</span>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0, delay: 0 }}
            className="nav-links"
          >

            <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Inicio
            </NavLink>
            <NavLink to="/listar" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              Mis Lecciones
            </NavLink>
            

          </motion.nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0, delay: 0 }}
            className="flex-items-center header-buttons"
          >
            <Button variant="outline" className="login-button">
              <span className="relative z-10">Iniciar Sesión</span>
            </Button>
            <Button className="register-button">
              <span className="relative z-10">Registrarse</span>
            </Button>
          </motion.div>
        </div>
      </header>
      
  )
}

export default NavBar
