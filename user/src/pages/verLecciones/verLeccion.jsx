"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Library, Layers3, Dumbbell, FileText, Plus, Link2, ArrowLeft } from "lucide-react"
import "./verLeccion.css"

const getRandomLucideIcon = () => {
  const icons = [Layers3, Dumbbell, FileText, Library]
  return icons[Math.floor(Math.random() * icons.length)]
}

const VerLeccion = () => {
  const { lessonCode } = useParams()
  const [lesson, setLesson] = useState(null)
  const [topicCount, setTopicCount] = useState(0)
  const [exerciseCount, setExerciseCount] = useState(0)
  const [materialCount, setMaterialCount] = useState(0)
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const fetchLessonDetails = async () => {
    try {
      const resLesson = await fetch("http://localhost:5000/lesson/get_lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_code: localStorage.getItem("user_code") || 1 })
      })
      const data = await resLesson.json()
      if (!Array.isArray(data)) throw new Error("Datos inválidos recibidos del servidor")

      const foundLesson = data.find(l => String(l.lesson_code) === String(lessonCode))
      if (!foundLesson) throw new Error("Lección no encontrada")
      setLesson(foundLesson)

      const resTopics = await fetch("http://localhost:5000/topic/get_topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson_code: Number(lessonCode) })
      })
      const topicsData = await resTopics.json()
      if (!Array.isArray(topicsData)) return

      setTopicCount(topicsData.length)

      let totalExercises = 0
      let totalMaterials = 0
      const topicsWithDetails = []

      for (const topic of topicsData) {
        const [resEx, resMat] = await Promise.all([
          fetch("http://localhost:5000/exercise/get_exercises", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic_code: topic.topic_code })
          }),
          fetch("http://localhost:5000/material/get_materials_by_topic", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic_code: Number(topic.topic_code) })
          })
        ])

        const exercises = await resEx.json()
        const materials = await resMat.json()

        totalExercises += Array.isArray(exercises) ? exercises.length : 0
        totalMaterials += Array.isArray(materials) ? materials.length : 0

        topicsWithDetails.push({
          ...topic,
          exercises: Array.isArray(exercises) ? exercises : [],
          materials: Array.isArray(materials) ? materials : []
        })
      }

      setExerciseCount(totalExercises)
      setMaterialCount(totalMaterials)
      setTopics(topicsWithDetails)

    } catch (err) {
      console.error("Error al obtener la lección:", err)
      setError(err.message || "No se pudo cargar la lección.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLessonDetails()
  }, [lessonCode])

  const getMaterialIcon = (type) => {
    if (!type) return <Link2 size={18} className="material-icon other" />
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText size={18} className="material-icon pdf" />
      case "doc":
      case "docx":
        return <FileText size={18} className="material-icon doc" />
      case "ppt":
      case "pptx":
        return <Layers3 size={18} className="material-icon ppt" />
      case "video":
        return <Dumbbell size={18} className="material-icon video" />
      default:
        return <Link2 size={18} className="material-icon other" />
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
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={16} /> Volver Atrás
        </button>
      </div>

      {loading ? (
        <p className="loading-msg">Cargando lección...</p>
      ) : error ? (
        <p className="error-msg">{error}</p>
      ) : (
        lesson && (
          <div className="lesson-layout">
            <div className="lesson-cards">
              <div className="lesson-meta">
                <span className="lesson-level">{lesson.level_name || "Desconocido"}</span>
                <span className="lesson-visibility">{lesson.visibility_name || "Desconocido"}</span>
              </div>

              <div className="lesson-stats">
                <span><Layers3 size={16} /> {topicCount} Tópicos</span>
                <span><Dumbbell size={16} /> {exerciseCount} Ejercicios</span>
                <span><FileText size={16} /> {materialCount} Materiales</span>
              </div>
            </div>

            <div className="lesson-content">
              <div className="styled-box">
                <h1>{lesson.lesson_title || "Sin título"}</h1>
                <p>{lesson.lesson_description || "Sin descripción"}</p>
              </div>

              <div className="topics-materials-container">
                <div className="styled-box topics-box">
                  <h3>Tópicos</h3>
                  {topics.map(topic => (
                    <div key={topic.topic_code} className="topic-card">
                      <h5>{topic.topic_title || "Sin título"}</h5>
                      <p>{topic.topic_description || "Sin descripción"}</p>
                    </div>
                  ))}
                </div>

                <div className="styled-box materials-box">
                  <h3>Materiales</h3>
                  <div className="materials-grid">
                    {topics.flatMap(topic => topic.materials).map(mat => (
                      <a
                        key={mat.material_code}
                        href={`https://drive.google.com/file/d/${mat.material_rute}/view`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="material-link"
                      >
                        {getMaterialIcon(mat.material_type_name || "")}
                        <span className="material-text">
                          {mat.material_name}<strong>.</strong>{mat.material_type_name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="exercises-section">
                <h3>Ejercicios</h3>
                {topics.map(topic => (
                  topic.exercises.length > 0 && (
                    <div key={topic.topic_code} className="exercises-list">
                      {topic.exercises.map(ex => (
                        <div key={ex.exercise_code} className="exercise-card">
                          <strong>{ex.exercise_title || "Sin título"}</strong>
                          <p>{ex.exercise_instructions || "Sin instrucciones"}</p>
                        </div>
                      ))}
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default VerLeccion
