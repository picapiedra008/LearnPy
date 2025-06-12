"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import "./listarLecciones.css"

const ListarLecciones = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [lessonToDelete, setLessonToDelete] = useState(null)

  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Fundamentos de Python",
      description:
        "Aprende los conceptos básicos de Python desde cero: variables, tipos de datos, operadores y estructuras básicas de programación",
      level: "Principiante",
      topics: 5,
      exercises: 18,
      studyTime: 300,
      image: "/python-classes.png",
      isVisible: true,
      lastUpdated: "2024-01-15",
      objectives: [
        "Comprender la sintaxis básica de Python",
        "Manejar variables y tipos de datos",
        "Aplicar operadores aritméticos y lógicos",
        "Crear programas interactivos simples",
      ],
    },
    {
      id: 2,
      title: "Estructuras de Control",
      description: "Domina if, for, while y estructuras de decisión para controlar el flujo de tus programas Python",
      level: "Principiante",
      topics: 4,
      exercises: 15,
      studyTime: 240,
      image: "/python-objects.png",
      isVisible: true,
      lastUpdated: "2024-01-20",
      objectives: [
        "Implementar estructuras condicionales complejas",
        "Crear bucles eficientes y controlados",
        "Manejar el flujo de control con break y continue",
        "Desarrollar algoritmos con estructuras anidadas",
      ],
    },
    {
      id: 3,
      title: "Programación Orientada a Objetos",
      description:
        "Aprende POO con clases, herencia, polimorfismo y encapsulación para crear aplicaciones más robustas",
      level: "Avanzado",
      topics: 4,
      exercises: 10,
      studyTime: 360,
      image: "/python-inheritance.png",
      isVisible: true,
      lastUpdated: "2024-01-22",
      objectives: [
        "Dominar los conceptos fundamentales de POO",
        "Implementar herencia y polimorfismo",
        "Aplicar encapsulación y abstracción",
        "Crear sistemas orientados a objetos complejos",
      ],
    },
  ])

  const filteredLessons = lessons.filter((lesson) => {
    const matchesSearch =
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === "Todos" || lesson.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  const getLevelColor = (level) => {
    switch (level) {
      case "Principiante":
        return "level-beginner"
      case "Intermedio":
        return "level-intermediate"
      case "Avanzado":
        return "level-advanced"
      default:
        return "level-default"
    }
  }

  const handleDelete = (lesson) => {
    setLessonToDelete(lesson)
    setShowDeleteDialog(true)
  }

  const confirmDelete = () => {
    if (lessonToDelete) {
      setLessons(lessons.filter((lesson) => lesson.id !== lessonToDelete.id))
      setShowDeleteDialog(false)
      setLessonToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteDialog(false)
    setLessonToDelete(null)
  }

  return (
    <div className="listar-lecciones-container">
      {/* Header mejorado */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-section">
              <img src="/logo1.png" alt="LearnPy" className="logo" />
              <div className="logo-text">
                <h1 className="logo-title">LearnPy</h1>
                <p className="logo-subtitle">Plataforma de Enseñanza Python</p>
              </div>
            </div>
          </div>

          <div className="header-right">
            <button className="notification-btn">
              <span className="bell-icon">🔔</span>
              <span className="notification-badge"></span>
            </button>
            <div className="avatar">
              <img src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <span className="avatar-fallback">JD</span>
            </div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Header Section */}
        <div className="page-header">
          <div className="page-header-content">
            <div className="page-title-section">
              <h2 className="page-title">Mis Lecciones de Python</h2>
              <p className="page-subtitle">Gestiona y crea contenido educativo interactivo</p>
            </div>

            <Link to="/crear-leccion" className="new-lesson-btn">
              <span className="icon-plus">+</span>
              Nueva Lección
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="search-filters-card">
          <div className="search-filters-content">
            <div className="search-section">
              <div className="search-input-container">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar lecciones por título o descripción..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="filters-section">
              <select value={selectedLevel} onChange={(e) => setSelectedLevel(e.target.value)} className="level-filter">
                <option value="Todos">Todos los niveles</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="lessons-grid">
          {filteredLessons.map((lesson) => (
            <div key={lesson.id} className="lesson-card">
              <div className="lesson-image-container">
                <img src={lesson.image || "/placeholder.svg"} alt={lesson.title} className="lesson-image" />
                <div className="lesson-badges">
                  <span className={`level-badge ${getLevelColor(lesson.level)}`}>{lesson.level}</span>
                  <span className={`visibility-badge ${lesson.isVisible ? "visible" : "private"}`}>
                    {lesson.isVisible ? "Visible" : "Privado"}
                  </span>
                </div>
              </div>

              <div className="lesson-content">
                <div className="lesson-info">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <p className="lesson-description">{lesson.description}</p>
                </div>

                <div className="lesson-stats">
                  <div className="stat-item">
                    <div className="stat-value">
                      <span className="stat-icon">📚</span>
                      <span className="stat-number">{lesson.topics}</span>
                    </div>
                    <p className="stat-label">Tópicos</p>
                  </div>
                  <div className="stat-item">
                    <div className="stat-value">
                      <span className="stat-icon">💻</span>
                      <span className="stat-number">{lesson.exercises}</span>
                    </div>
                    <p className="stat-label">Ejercicios</p>
                  </div>
                </div>

                <div className="lesson-footer">
                  <span className="last-updated">
                    Actualizado: {new Date(lesson.lastUpdated).toLocaleDateString("es-ES")}
                  </span>
                  <div className="lesson-actions">
                    <Link to={`/crear-leccion/${lesson.id}`} className="action-btn edit-btn">
                      <span className="icon-edit">✏️</span>
                    </Link>
                    <button onClick={() => handleDelete(lesson)} className="action-btn delete-btn">
                      <span className="icon-trash">🗑️</span>
                    </button>
                    <Link to={`/curso/${lesson.id}`} className="action-btn view-btn">
                      <span className="icon-users">👥</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Delete Confirmation Dialog */}
        {showDeleteDialog && (
          <div className="dialog-overlay">
            <div className="dialog-content">
              <div className="dialog-header">
                <h3 className="dialog-title">¿Estás seguro?</h3>
                <p className="dialog-description">
                  Esta acción no se puede deshacer. Esto eliminará permanentemente la lección
                  <strong> "{lessonToDelete?.title}"</strong> y todos sus datos asociados.
                </p>
              </div>
              <div className="dialog-footer">
                <button onClick={cancelDelete} className="dialog-btn cancel-btn">
                  Cancelar
                </button>
                <button onClick={confirmDelete} className="dialog-btn confirm-btn">
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ListarLecciones
