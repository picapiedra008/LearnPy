"use client"

import { Link } from "react-router-dom"
import { Bell } from "lucide-react"
import "./lessonList.css"

// Componente de botón personalizado
const Button = ({ children, className = "", onClick }) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      {children}
    </button>
  )
}

const LessonList = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="header blue">
        <div className="container header-container">
          <div className="header-left">
            <div className="logo">LP</div>
            <nav className="nav">
              <Link to="/" className="nav-link active">
                Mis Lecciones
              </Link>
              <Link to="#" className="nav-link">
                Otros
              </Link>
            </nav>
          </div>
          <div className="header-right">
            <button className="icon-button">
              <Bell className="icon" />
              <span className="notification-badge"></span>
            </button>
            <div className="avatar">
              <img src="/placeholder.svg?height=32&width=32" alt="Perfil" className="avatar-image" />
            </div>
          </div>
        </div>
      </header>

      <main className="container main">
        <div className="list-header">
          <h2 className="page-title">Mis Lecciones</h2>
          <Link to="/crear-leccion">
            <Button className="btn-green btn-success">Agregar Lección</Button>
          </Link>
        </div>

        <div className="lessons-grid">
          {/* Lecciones existentes */}
          <div className="lesson-card">
            <div className="lesson-image">
              <img src="/placeholder.svg?height=160&width=320" alt="Portada de lección" className="lesson-cover" />
            </div>
            <div className="lesson-content">
              <h3 className="lesson-title">Introducción a Python</h3>
              <p className="lesson-description">Conceptos básicos de Python para principiantes</p>
              <div className="lesson-footer">
                <span className="lesson-tag beginner">Principiante</span>
                <div className="lesson-actions">
                  <button className="action-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="action-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button className="action-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="action-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-card">
            <div className="lesson-image">
              <img src="/placeholder.svg?height=160&width=320" alt="Portada de lección" className="lesson-cover" />
            </div>
            <div className="lesson-content">
              <h3 className="lesson-title">Estructuras de Datos en Python</h3>
              <p className="lesson-description">Listas, diccionarios, tuplas y conjuntos</p>
              <div className="lesson-footer">
                <span className="lesson-tag intermediate">Intermedio</span>
                <div className="lesson-actions">
                  <button className="action-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="action-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </button>
                  <button className="action-button">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="action-icon"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default LessonList
