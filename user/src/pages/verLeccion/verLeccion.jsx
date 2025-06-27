"use client"

import { useState, useEffect} from "react"
import Ejercicio from "./ejercicio"
import "./verLeccion.css"
import { useParams } from "react-router-dom"

// Datos de ejemplo basados en la estructura de crear lecciones

const VerLeccion = () => {
  const [activeTab, setActiveTab] = useState("contenido")
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [showExerciseModal, setShowExerciseModal] = useState(false)

  const { lesson_code } = useParams()


  const [mockCourse, setMockCourse] = useState({
    id: 1,
    title: "Fundamentos de Python",
    description:
      "Aprende los conceptos básicos de Python desde cero: variables, tipos de datos, operadores y estructuras básicas de programación",
    level: "Principiante",
    visibility:"Borrador",
    duration: "5h 30m",
    lessons: 12,
    students: 1250,
    rating: 4.8,
    reviews: 324,
    progress: 65,
    coverImage: "/placeholder.svg?height=300&width=400",
    isEnrolled: true,
    lastAccessed: "2024-01-15",
    topics: [
     
    ],
    requirements: [
      "No se requiere experiencia previa en programación",
      "Computadora con acceso a internet",
      "Ganas de aprender",
    ],
  })

  


  useEffect(() => {
      const obtenerLeccion = async () => {
        try {
          //leccion
          let res = await fetch("http://127.0.0.1:5000/lesson/get_lesson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lesson_code:Number(lesson_code) }),
          })

          let leccion = await res.json()
          console.log("Leccion:", leccion)
          
          //topicos   

          res = await fetch("http://127.0.0.1:5000/topic/get_topics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lesson_code:Number(lesson_code) }),
          })

          let topicos = await res.json()
          console.log("topicos:", topicos)
          const topicos_con_todo = [];
          for (const t of topicos) {
            try {
                res = await fetch("http://127.0.0.1:5000/material/get_materials_by_topic", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ topic_code: Number(t.topic_code) }),
                });
                const materiales_topicos = await res.json();
                console.log("materiales topico", ":", materiales_topicos);
                let to_mat = []
                if(res.status !== 204){
                  for (const tm of materiales_topicos){
                    to_mat.push({
                      id:"t"+tm.material_code,
                      type:tm.material_type_name,
                      title:tm.material_name,
                      url:tm.material_rute,
                      fileExtension:tm.material_type_name,
                      size: "2.1 MB"
                    })
                  }
                }


                res = await fetch("http://127.0.0.1:5000/exercise/get_exercises", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ topic_code: Number(t.topic_code) }),
                });
                let excerc = []
                const ejercicios = await res.json();
                console.log("ejercicios para topic", t.topic_code, ":", ejercicios);
                for (const e of ejercicios){
                  res = await fetch("http://127.0.0.1:5000/exercise_material/get_exercise_materials", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ exercise_code: Number(e.exercise_code) }),
                  });
                  let ex_mat = [];
                  if(res.status !== 204){
                      const materiales_ejercicios = await res.json();
                      console.log("materiales", ":", materiales_ejercicios);
                      if(materiales_ejercicios[0]){
                        for (const em of materiales_ejercicios){
                          ex_mat.push({
                            id:Date.now().toString() + Math.random(),
                            type:em.material_type_name,
                            title:em.material_name,
                            size: "0.5 KB",
                            url:em.material_rute,
                          })
                        }
                      }
                  }
                  
                  excerc.push({
                    id: Date.now().toString() + Math.random(),
                    title: e.exercise_title,
                    description:e.exercise_instructions,
                    documents:ex_mat,
                    hasCodeEditor:e.with_python_code,
                    starterCode:e.exercise_initial_python_code,
                    expectedOutput:e.exercise_answer,
                    completed:true

                  });

                }

              topicos_con_todo.push({
                id: Date.now().toString() + Math.random(),
                title: t.topic_title,
                description: t.topic_description,
                duration: 30,
                materials: to_mat,
                exercises: excerc,
                completed: true,
                locked:false
              });
            } catch (error) {
              console.error("Error al obtener los ejercicios:", error);
            }
          }


          //visibilidades 
          res = await fetch("http://127.0.0.1:5000/lesson/get_visibilities", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })

          let visibilidades = await res.json()
          let visibilidad = visibilidades.find(v => v.visibility_code === leccion.visibility_code);
          let nombre_visibilidad = visibilidad ? visibilidad.visibility_name : "Borrador";


          //niveles 
          res = await fetch("http://127.0.0.1:5000/lesson/get_levels", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })

          let levels = await res.json()

          let nivel = levels.find(l => l.level_code === leccion.level_code);
          let nombre_nivel = nivel ? nivel.level_name : "Principiante";

          let lecciones_totales = 0
          for(const t of topicos_con_todo){
            lecciones_totales = lecciones_totales + t.exercises.length;
          }


          setMockCourse({
            id: leccion.lesson_code,
            title: leccion.lesson_title,
            description:leccion.lesson_description,
            level: nombre_nivel,
            visibility:nombre_visibilidad,
            duration: "5h 30m",
            lessons: lecciones_totales,
            students: 1250,
            rating: 4.8,
            reviews: 324,
            progress: 65,
            coverImage: leccion.coverImage,
            isEnrolled: true,
            lastAccessed: "2024-01-15",
            topics: topicos_con_todo,
            requirements: [
              "No se requiere experiencia previa en programación",
              "Computadora con acceso a internet",
              "Ganas de aprender",
            ],
          })


        
        } catch (error) {
          console.error("Error al obtener lección:", error)
        }
      }

      obtenerLeccion()
  }, [lesson_code])







  const getMaterialIcon = (type) => {
    switch (type) {
      case "video":
        return (
          <svg className="material-icon video" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        )
      case "image":
        return (
          <svg className="material-icon image" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        )
      case "document":
        return (
          <svg className="material-icon document" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      default:
        return (
          <svg className="material-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
    }
  }

  const renderDocumentIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return (
          <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      case "py":
        return (
          <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        )
      case "doc":
      case "docx":
        return (
          <svg className="h-5 w-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
      default:
        return (
          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )
    }
  }

  const handleExerciseClick = (exercise) => {
    if (exercise.hasCodeEditor) {
      setSelectedExercise(exercise)
      setShowExerciseModal(true)
    }
  }

  const handleCloseModal = () => {
    setShowExerciseModal(false)
    setSelectedExercise(null)
  }

  return (
    <div className="ver-leccion-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-flex">
            <div className="header-left">
              <button className="back-button">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Volver
              </button>
              <div className="logo-section">
                <img src="/placeholder.svg?height=32&width=32" alt="LearnPy" className="logo" />
                <div className="logo-text">
                  <h1>LearnPy</h1>
                  <p>Plataforma de Enseñanza Python</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Course Header */}
        <div className="course-header">
          <div className="course-info">
            <h1>{mockCourse.title}</h1>
            <p className="course-description">{mockCourse.description}</p>

            {/* Course Stats */}
            <div className="course-stats">
              <div className="stat-item">
                <svg className="icon-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                <span className="font-medium">{mockCourse.topics.length} tópicos</span>
              </div>
              <div className="stat-item">
                <svg className="icon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">{mockCourse.duration}</span>
              </div>
              <div className="stat-item">
                <svg className="icon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                <span className="font-medium">
                  {mockCourse.topics.reduce((total, topic) => total + topic.exercises.length, 0)} ejercicios
                </span>
              </div>
            </div>

            {/* Course Badges */}
            <div className="course-badges">
              <div className="badge green">
                <div className="badge-content">
                  <div className="badge-icon green">
                    <span>📚</span>
                  </div>
                  <div className="badge-text">
                    <p>Nivel</p>
                    <p>{mockCourse.level}</p>
                  </div>
                </div>
              </div>

              <div className="badge blue">
                <div className="badge-content">
                  <div className="badge-icon blue">
                    <span>🌐</span>
                  </div>
                  <div className="badge-text">
                    <p>Visibilidad</p>
                    <p>{mockCourse.visibility}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="sidebar-card">
              <img src={mockCourse.coverImage || "/placeholder.svg"} alt={mockCourse.title} className="course-image" />
            </div>
          </div>
        </div>

        {/* Course Content Tabs */}
        <div className="tabs-container">
          <div className="tabs-list">
            <button
              className={`tab-trigger ${activeTab === "contenido" ? "active" : ""}`}
              onClick={() => setActiveTab("contenido")}
            >
              📚 Contenido del Curso
            </button>
          </div>

          {/* Contenido del Curso */}
          {activeTab === "contenido" && (
            <div style={{ marginTop: "1.5rem" }}>
              {mockCourse.topics.map((topic, topicIndex) => (
                <div key={topic.id} className="topic-card">
                  <div className="topic-header">
                    <div className="topic-title-section">
                      <div className="topic-title-left">
                        <div className="topic-number">
                          <span>{topicIndex + 1}</span>
                        </div>
                        <div className="topic-info">
                          <h3>{topic.title}</h3>
                          <p className="topic-description">{topic.description}</p>
                          <div className="topic-meta">
                            <span>
                              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {topic.duration} min
                            </span>
                            <span>{topic.materials.length} materiales</span>
                            <span>{topic.exercises.length} ejercicios</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="topic-content">
                    <div className="topic-grid">
                      {/* Materials Section - Left Side */}
                      <div>
                        <div className="materials-section">
                          <div className="materials-header">
                            <h3 className="materials-title">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                              </svg>
                              Materiales de Estudio
                            </h3>
                          </div>
                          <div className="materials-content">
                            {topic.materials.length > 0 ? (
                              <div className="materials-list">
                                {topic.materials.map((material) => (
                                  <div key={material.id} className="material-item">
                                    <div className="material-content">
                                      <div className="material-info">
                                        {getMaterialIcon(material.type)}
                                        <div className="material-details">
                                          <h4>{material.title}</h4>
                                          <div className="material-meta">
                                            <span>{material.fileExtension.toUpperCase()}</span>
                                            {material.size && <span>• {material.size}</span>}
                                            {material.duration && <span>• {material.duration}</span>}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="material-actions">
                                        {material.type === "video" ? (
                                          <button className="btn btn-primary">
                                            <svg
                                              className="h-4 w-4"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h1m4 0h1M9 6h6"
                                              />
                                            </svg>
                                            Ver
                                          </button>
                                        ) : (
                                          <button className="btn btn-outline">
                                            <svg
                                              className="h-4 w-4"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                            >
                                              <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                              />
                                            </svg>
                                            Descargar
                                          </button>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="empty-state">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                                <p>No hay materiales disponibles para este tópico</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Exercises Section - Right Side */}
                      <div>
                        <div className="exercises-section">
                          <div className="exercises-header">
                            <h3 className="exercises-title">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                />
                              </svg>
                              Ejercicios
                            </h3>
                          </div>
                          <div className="exercises-content">
                            {topic.exercises.length > 0 ? (
                              <div className="exercises-list">
                                {topic.exercises.map((exercise, index) => (
                                  <div
                                    key={exercise.id}
                                    className="exercise-item"
                                    onClick={() => handleExerciseClick(exercise)}
                                  >
                                    <div className="exercise-header">
                                      <div className="exercise-title-section">
                                        <div className="exercise-number">{index + 1}</div>
                                        <h4 className="exercise-title">{exercise.title}</h4>
                                      </div>
                                    </div>
                                    <p className="exercise-description">{exercise.description}</p>

                                    {exercise.documents && exercise.documents.length > 0 && (
                                      <div className="exercise-documents">
                                        <p>Archivos:</p>
                                        <div className="documents-list">
                                          {exercise.documents.map((doc) => (
                                            <span key={doc.id} className="document-tag">
                                              {renderDocumentIcon(doc.type)}
                                              <span className="title">{doc.title}</span>
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    <button className="exercise-button">
                                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                        />
                                      </svg>
                                      Revisar
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="empty-state">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                  />
                                </svg>
                                <p>No hay ejercicios disponibles para este tópico</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Exercise Modal */}
        <Ejercicio exercise={selectedExercise} isOpen={showExerciseModal} onClose={handleCloseModal} />
      </div>
    </div>
  )
}

export default VerLeccion
