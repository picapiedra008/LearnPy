"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, Edit, Trash2, Plus, BookOpen, Brain, Lightbulb, NotebookPen, Library,
          Layers3, Dumbbell, FileText, Search } from "lucide-react"
import "./listarLecciones.css"

const leccionDePrueba = {
  code: "demo123",
  title: "Lección de prueba",
  description: "Esta es una descripción de ejemplo para probar la interfaz.",
  created_at: new Date().toISOString(),
  level: "Principiante",
  front_page: "1K0kHEE7LQ0rWYI_zCz5eT_TpDtyq_wvu",
  visibility_name: "Borrador",
}
const leccionDePrueba02 = {
  code: "demo1234",
  title: "Lección de prueba 2",
  description: "Otra descripción de ejemplo para probar la interfaz.",
  created_at: new Date().toISOString(),
  level: "Intermedio",
  front_page: "1K0kHEE7LQ0rWYI_zCz5eT_TpDtyq_wvu",
  visibility_name: "Público",
}

const getRandomLucideIcon = () => {
  const icons = [BookOpen, Brain, Lightbulb, NotebookPen]
  return icons[Math.floor(Math.random() * icons.length)]
}

const normalizeText = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

const ListarLecciones = () => {
  const [lessons, setLessons] = useState([leccionDePrueba, leccionDePrueba02])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("Todos")
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [topicCounts, setTopicCounts] = useState({})
  const [exerciseCounts, setExerciseCounts] = useState({})
  const [materialCounts, setMaterialCounts] = useState({})
  const lessonsPerPage = 6
  const navigate = useNavigate()

  const fetchLessonStats = async (lessonCode) => {
    try {
      const resTopics = await fetch("http://localhost:5000/topic/get_topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson_code: Number(lessonCode) })
      })
      const topics = await resTopics.json()
      if (!Array.isArray(topics)) return { topicCount: 0, exerciseCount: 0, materialCount: 0 }

      const topicCount = topics.length

      const statsByTopic = await Promise.all(
        topics.map(async (topic) => {
          const resExercises = await fetch("http://localhost:5000/exercise/get_exercises", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic_code: topic.topic_code })
          })
          const exercises = await resExercises.json()
          const exerciseCount = Array.isArray(exercises) ? exercises.length : 0

          const resMaterials = await fetch("http://localhost:5000/material/get_materials_by_topic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic_code: topic.topic_code })
          })
          const materials = await resMaterials.json()
          const materialCount = Array.isArray(materials) ? materials.length : 0

          return { exerciseCount, materialCount }
        })
      )

      const exerciseCount = statsByTopic.reduce((sum, s) => sum + s.exerciseCount, 0)
      const materialCount = statsByTopic.reduce((sum, s) => sum + s.materialCount, 0)

      return { topicCount, exerciseCount, materialCount }

    } catch (error) {
      console.error(`Error al obtener stats para ${lessonCode}:`, error)
      return { topicCount: 0, exerciseCount: 0, materialCount: 0 }
    }
  }

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const userCode = localStorage.getItem("user_code") || 1
        const res = await fetch("http://localhost:5000/lesson/get_lessons", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user_code: userCode })
        })

        if (!res.ok) throw new Error(`Error del servidor: ${res.status}`)

        const data = await res.json()
        if (!Array.isArray(data)) throw new Error("Datos inválidos recibidos del servidor")

        setLessons(data)

        const statsArray = await Promise.all(
          data.map(async (lesson) => {
            const stats = await fetchLessonStats(lesson.lesson_code)
            return [lesson.lesson_code, stats]
          })
        )

        const topicsMap = {}
        const exercisesMap = {}
        const materialsMap = {}

        for (const [code, stats] of statsArray) {
          topicsMap[code] = stats.topicCount
          exercisesMap[code] = stats.exerciseCount
          materialsMap[code] = stats.materialCount
        }

        setTopicCounts(topicsMap)
        setExerciseCounts(exercisesMap)
        setMaterialCounts(materialsMap)

      } catch (err) {
        console.error("Error al cargar las lecciones:", err)
        setError("No se pudo conectar al servidor.")
      } finally {
        setLoading(false)
      }
    }

    fetchLessons()
  }, [])

  const filteredLessons = lessons.filter((lesson) => {
    const title = lesson.lesson_title || ""
    const description = lesson.lesson_description || ""
    const safeSearch = normalizeText(searchTerm)

    const matchesSearch = normalizeText(title).includes(safeSearch) ||
                          normalizeText(description).includes(safeSearch)

    const matchesLevel =
      selectedLevel === "Todos" ||
      lesson.level_name?.trim().toLowerCase() === selectedLevel.toLowerCase()

    return matchesSearch && matchesLevel
  })

  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage)
  const startIndex = (currentPage - 1) * lessonsPerPage
  const endIndex = startIndex + lessonsPerPage
  const paginatedLessons = filteredLessons.slice(startIndex, endIndex)

  const levels = ["Todos", "Principiante", "Intermedio", "Avanzado"]

  const handleView = (code) => navigate(`/ver-leccion/${code}`)
  const handleEdit = (code) => navigate(`/editar-leccion/${code}`)
  // eslint-disable-next-line no-unused-vars
  const handleDelete = (code) => navigate(`/eliminar-leccion/${code}`)
  const handleSoftDelete = (code) => {
  if (window.confirm("¿Estás seguro de que deseas eliminar esta lección?")) {
    setLessons((prevLessons) => prevLessons.filter(lesson => lesson.lesson_code !== code))
  }
}


  return (
    <div className="listar-lecciones-container">
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
            <button className="notification-btn" title="Notificaciones">
              <span className="bell-icon">🔔</span>
              <span className="notification-badge"></span>
            </button>
            <div className="avatar">
              <img src="/placeholder.svg?height=32&width=32" alt="Avatar" />
              <span className="avatar-fallback">LP</span>
            </div>
          </div>
        </div>
      </header>

      <div className="title-bar">
        <h2 className="title-with-icon">
          <Library size={30} className="title-icon" />
          Mis Lecciones
        </h2>
        <Link to="/crear-leccion" className="new-lesson-btn">
          <Plus size={18} /> Nueva lección
        </Link>
      </div>

      <div className="filters-bar">
        <div className="search-container">
          <span className="search-icon"><Search size={18} /></span>
          <input
            type="text"
            placeholder="Buscar lecciones..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        <select
          className="level-filter"
          value={selectedLevel}
          onChange={(e) => {
            setSelectedLevel(e.target.value)
            setCurrentPage(1)
          }}
        >
          {levels.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="loading-msg">Cargando lecciones...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        <>
          <div className="lessons-grid">
            {paginatedLessons.length > 0 ? (
              paginatedLessons.map((lesson) => (
                <div key={lesson.lesson_code} className="lesson-card">
                  <div className="lesson-image-wrapper">
                    {lesson.lesson_front_page && (
                    <img
                      src={`https://drive.google.com/uc?export=view&id=${lesson.lesson_front_page}`}
                      alt="Portada"
                      className="lesson-image"
                      onError={(e) => {
                      e.target.style.display = "none"
                      e.target.nextElementSibling.style.display = "flex"
                    }}
                    />
                    )}
                   <div className="lesson-icon-fallback" 
                        style={{ display: lesson.lesson_front_page ? "none" : "flex" }}>
                        {(() => {
                        const Icon = getRandomLucideIcon()
                        return <Icon size={48} />
                        })()}
                    </div>
                  </div>

                  <div className="lesson-info-row">
                    <div className="lesson-meta">
                      <span className="lesson-level">{lesson.level_name || "Desconocido"}</span>
                      <span className="lesson-visibility">{lesson.visibility_name || "Desconocido"}</span>
                    </div>
                  </div>

                  <div className="lesson-header">
                    <h3>{lesson.lesson_title || "Sin título"}</h3>
                  </div>
                  <p>{lesson.lesson_description || "Sin descripción"}</p>
                  {/*<p>{topic.topic_code || "Sin topic"}</p>*/}
                  {/*<p>{lesson.lesson_code || "Sin codigo"}</p>*/}
                  <div className="lesson-stats">
                    <span><Layers3 size={16} style={{ marginRight: 4 }} />{topicCounts[lesson.lesson_code] ?? "..."} Tópicos</span>
                    <span><Dumbbell size={16} style={{ marginRight: 4 }} />{exerciseCounts[lesson.lesson_code] ?? "..."} Ejercicios</span>
                    <span><FileText size={16} style={{ marginRight: 4 }} />{materialCounts[lesson.lesson_code] ?? "..."} Materiales</span>
                  </div>

                  <div className="lesson-actions">
                    <button title="Ver" onClick={() => handleView(lesson.lesson_code)}><Eye size={18} /></button>
                    <button title="Editar" onClick={() => handleEdit(lesson.lesson_code)}><Edit size={18} /></button>
                    {/*<button title="Eliminar" onClick={() => handleDelete(lesson.lesson_code)}><Trash2 size={18} /></button>*/}
                    <button title="Eliminar" onClick={() => handleSoftDelete(lesson.lesson_code)}><Trash2 size={18} /></button>

                  </div>
                </div>
              ))
            ) : (
              <p className="no-lessons-msg">No se encontraron lecciones.</p>
            )}
          </div>

          <div className="pagination">
            <button
              className="page-btn"
              disabled={filteredLessons.length === 0 || currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            >
              « Anterior
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={`page-${index}`}
                className={`page-btn ${currentPage === index + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(index + 1)}
                disabled={filteredLessons.length === 0}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="page-btn"
              disabled={filteredLessons.length === 0 || currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            >
              Siguiente »
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default ListarLecciones
