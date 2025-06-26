"use client"

import { useState } from "react"
import Ejercicio from "./ejercicio"
import "./verLeccion.css"

// Datos de ejemplo basados en la estructura de crear lecciones
const mockCourse = {
  id: 1,
  title: "Fundamentos de Python",
  description:
    "Aprende los conceptos básicos de Python desde cero: variables, tipos de datos, operadores y estructuras básicas de programación",
  level: "Principiante",
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
    {
      id: 1,
      title: "Introducción a Python",
      description:
        "Conoce los fundamentos del lenguaje Python, su historia y características principales que lo hacen ideal para principiantes.",
      duration: 45,
      completed: true,
      locked: false,
      materials: [
        {
          id: "m1",
          type: "document",
          title: "Guía de instalación de Python",
          fileExtension: "pdf",
          url: "#",
          size: "2.1 MB",
        },
        {
          id: "m2",
          type: "video",
          title: "¿Qué es Python? - Introducción",
          fileExtension: "mp4",
          url: "#",
          duration: "15:30",
        },
        {
          id: "m3",
          type: "image",
          title: "Diagrama de sintaxis Python",
          fileExtension: "png",
          url: "#",
          size: "850 KB",
        },
      ],
      exercises: [
        {
          id: "e1",
          title: "Tu primer programa",
          description: "Crea tu primer programa en Python usando print() y variables básicas.",
          hasCodeEditor: true,
          starterCode:
            "# Tu primer programa en Python\n# Escribe un programa que salude al usuario\n\nnombre = input('¿Cuál es tu nombre? ')\nprint(f'¡Hola, {nombre}! Bienvenido a Python')",
          expectedOutput: "¿Cuál es tu nombre? Juan\n¡Hola, Juan! Bienvenido a Python",
          completed: true,
          documents: [
            {
              id: "doc1",
              title: "ejemplo_hola_mundo.py",
              type: "py",
              size: "0.5 KB",
              url: "#",
            },
          ],
        },
        {
          id: "e1b",
          title: "Variables básicas",
          description: "Aprende a declarar y usar variables en Python.",
          hasCodeEditor: true,
          starterCode: "# Declara variables de diferentes tipos\n# Tu código aquí\n",
          expectedOutput: "Variables creadas correctamente",
          completed: true,
          documents: [],
        },
        {
          id: "e1c",
          title: "Operaciones matemáticas",
          description: "Realiza operaciones matemáticas básicas con Python.",
          hasCodeEditor: true,
          starterCode: "# Realiza operaciones matemáticas\n# Tu código aquí\n",
          expectedOutput: "Resultado: 42",
          completed: false,
          documents: [],
        },
      ],
    },
    {
      id: 2,
      title: "Variables y Tipos de Datos",
      description:
        "Aprende a declarar variables y trabajar con los diferentes tipos de datos en Python: enteros, flotantes, cadenas y booleanos.",
      duration: 60,
      completed: true,
      locked: false,
      materials: [
        {
          id: "m4",
          type: "document",
          title: "Tipos de datos en Python",
          fileExtension: "pdf",
          url: "#",
          size: "1.8 MB",
        },
        {
          id: "m5",
          type: "video",
          title: "Variables y asignación",
          fileExtension: "mp4",
          url: "#",
          duration: "20:15",
        },
      ],
      exercises: [
        {
          id: "e2",
          title: "Calculadora básica",
          description: "Crea una calculadora que realice operaciones básicas con números.",
          hasCodeEditor: true,
          starterCode:
            "# Calculadora básica\n# Completa las funciones para realizar operaciones matemáticas\n\ndef sumar(a, b):\n    # Tu código aquí\n    pass\n\ndef restar(a, b):\n    # Tu código aquí\n    pass\n\n# Prueba tus funciones\nnum1 = float(input('Primer número: '))\nnum2 = float(input('Segundo número: '))\n\nprint(f'Suma: {sumar(num1, num2)}')\nprint(f'Resta: {restar(num1, num2)}')",
          expectedOutput: "Primer número: 10\nSegundo número: 5\nSuma: 15.0\nResta: 5.0",
          completed: true,
          documents: [
            {
              id: "doc2",
              title: "Operadores matemáticos.pdf",
              type: "pdf",
              size: "800 KB",
              url: "#",
            },
          ],
        },
        {
          id: "e3",
          title: "Conversor de tipos",
          description: "Practica la conversión entre diferentes tipos de datos.",
          hasCodeEditor: true,
          starterCode: "# Conversor de tipos\n# Convierte entre diferentes tipos de datos\n\n# Tu código aquí",
          expectedOutput: "Conversión exitosa",
          completed: false,
          documents: [],
        },
        {
          id: "e3b",
          title: "Tipos de datos avanzados",
          description: "Explora listas y diccionarios en Python.",
          hasCodeEditor: true,
          starterCode: "# Explora listas y diccionarios\n# Tu código aquí",
          expectedOutput: "Listas y diccionarios creados",
          completed: false,
          documents: [],
        },
      ],
    },
    {
      id: 3,
      title: "Operadores y Expresiones",
      description:
        "Domina los operadores aritméticos, lógicos y de comparación para crear expresiones complejas en Python.",
      duration: 50,
      completed: false,
      locked: false,
      current: true,
      materials: [
        {
          id: "m6",
          type: "document",
          title: "Guía de operadores",
          fileExtension: "pdf",
          url: "#",
          size: "1.2 MB",
        },
        {
          id: "m7",
          type: "video",
          title: "Operadores lógicos explicados",
          fileExtension: "mp4",
          url: "#",
          duration: "18:45",
        },
      ],
      exercises: [
        {
          id: "e4",
          title: "Validador de contraseñas",
          description: "Crea un sistema de validación usando operadores lógicos.",
          hasCodeEditor: true,
          starterCode:
            "# Sistema de validación\n# Crea un validador de contraseñas\n\ndef validar_contraseña(contraseña):\n    # La contraseña debe tener al menos 8 caracteres\n    # Debe contener al menos una letra mayúscula\n    # Debe contener al menos un número\n    \n    # Tu código aquí\n    pass\n\n# Prueba tu función\ncontraseña = input('Ingresa una contraseña: ')\nif validar_contraseña(contraseña):\n    print('Contraseña válida')\nelse:\n    print('Contraseña inválida')",
          expectedOutput: "Ingresa una contraseña: MiContraseña123\nContraseña válida",
          completed: false,
          current: true,
          documents: [
            {
              id: "doc3",
              title: "validador_ejemplo.py",
              type: "py",
              size: "1.1 KB",
              url: "#",
            },
          ],
        },
        {
          id: "e4b",
          title: "Calculadora de IMC",
          description: "Calcula el índice de masa corporal (IMC) usando operadores.",
          hasCodeEditor: true,
          starterCode: "# Calcula el IMC\n# Tu código aquí",
          expectedOutput: "IMC: 24.5",
          completed: false,
          documents: [],
        },
        {
          id: "e4c",
          title: "Comparador de números",
          description: "Compara dos números y determina cuál es mayor.",
          hasCodeEditor: true,
          starterCode: "# Compara dos números\n# Tu código aquí",
          expectedOutput: "El número mayor es: 10",
          completed: false,
          documents: [],
        },
      ],
    },
  ],
  requirements: [
    "No se requiere experiencia previa en programación",
    "Computadora con acceso a internet",
    "Ganas de aprender",
  ],
}

const VerLeccion = () => {
  const [activeTab, setActiveTab] = useState("contenido")
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [showExerciseModal, setShowExerciseModal] = useState(false)

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
                    <p>Público</p>
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
