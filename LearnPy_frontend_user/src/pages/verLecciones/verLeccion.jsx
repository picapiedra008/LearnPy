"use client"

import { useState } from "react"
import "./verLeccion.css"

const VerLeccion = () => {
  const [activeTab, setActiveTab] = useState("contenido")
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [showExerciseModal, setShowExerciseModal] = useState(false)
  const [userCode, setUserCode] = useState("")

  const mockCourse = {
    id: 1,
    title: "Fundamentos de Python",
    description:
      "Aprende los conceptos básicos de Python desde cero: variables, tipos de datos, operadores y estructuras básicas de programación",
    instructor: {
      name: "Dr. Ana García",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "Doctora en Ciencias de la Computación con 15 años de experiencia enseñando Python",
      courses: 12,
      students: 15000,
      rating: 4.9,
    },
    level: "Principiante",
    duration: "5h 30m",
    lessons: 12,
    students: 1250,
    rating: 4.8,
    reviews: 324,
    progress: 65,
    image: "/placeholder.svg?height=300&width=400",
    isEnrolled: true,
    lastAccessed: "2024-01-15",
    price: "Gratis",
    topics: [
      {
        id: 1,
        title: "1. Introducción a Python",
        lessons: 3,
        completed: true,
        locked: false,
        lessons_detail: [
          {
            id: 1,
            title: "¿Qué es Python?",
            duration: "15 min",
            completed: true,
            type: "video",
            description: "Introducción al lenguaje de programación Python y sus características principales.",
          },
          {
            id: 2,
            title: "Instalación y configuración",
            duration: "20 min",
            completed: true,
            type: "video",
            description: "Aprende a instalar Python y configurar tu entorno de desarrollo.",
          },
          {
            id: 3,
            title: "Tu primer programa",
            duration: "10 min",
            completed: true,
            type: "exercise",
            description: "Crea tu primer programa en Python usando print() y variables básicas.",
            hasCodeEditor: true,
            starterCode:
              "# Tu primer programa en Python\n# Escribe un programa que salude al usuario\n\nnombre = input('¿Cuál es tu nombre? ')\nprint(f'¡Hola, {nombre}! Bienvenido a Python')",
            expectedOutput: "¿Cuál es tu nombre? Juan\n¡Hola, Juan! Bienvenido a Python",
            documents: [
              {
                id: "doc1",
                title: "Guía de sintaxis básica.pdf",
                type: "pdf",
                size: "1.2 MB",
                url: "#",
              },
              {
                id: "doc2",
                title: "ejemplo_hola_mundo.py",
                type: "py",
                size: "0.5 KB",
                url: "#",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        title: "2. Variables y Tipos de Datos",
        lessons: 4,
        completed: true,
        locked: false,
        lessons_detail: [
          {
            id: 4,
            title: "Variables en Python",
            duration: "20 min",
            completed: true,
            type: "video",
            description: "Aprende qué son las variables y cómo declararlas en Python.",
          },
          {
            id: 5,
            title: "Tipos de datos básicos",
            duration: "25 min",
            completed: true,
            type: "video",
            description: "Conoce los tipos de datos fundamentales: int, float, str, bool.",
          },
          {
            id: 6,
            title: "Conversión de tipos",
            duration: "15 min",
            completed: true,
            type: "video",
            description: "Aprende a convertir entre diferentes tipos de datos.",
          },
          {
            id: 7,
            title: "Ejercicio: Calculadora básica",
            duration: "15 min",
            completed: true,
            type: "exercise",
            description: "Crea una calculadora que realice operaciones básicas con números.",
            hasCodeEditor: true,
            starterCode:
              "# Calculadora básica\n# Completa las funciones para realizar operaciones matemáticas\n\ndef sumar(a, b):\n    # Tu código aquí\n    pass\n\ndef restar(a, b):\n    # Tu código aquí\n    pass\n\n# Prueba tus funciones\nnum1 = float(input('Primer número: '))\nnum2 = float(input('Segundo número: '))\n\nprint(f'Suma: {sumar(num1, num2)}')\nprint(f'Resta: {restar(num1, num2)}')",
            expectedOutput: "Primer número: 10\nSegundo número: 5\nSuma: 15.0\nResta: 5.0",
            documents: [
              {
                id: "doc3",
                title: "Operadores matemáticos.pdf",
                type: "pdf",
                size: "800 KB",
                url: "#",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        title: "3. Operadores y Expresiones",
        lessons: 3,
        completed: false,
        locked: false,
        current: true,
        lessons_detail: [
          {
            id: 8,
            title: "Operadores aritméticos",
            duration: "20 min",
            completed: true,
            type: "video",
            description: "Domina los operadores matemáticos en Python.",
          },
          {
            id: 9,
            title: "Operadores lógicos",
            duration: "20 min",
            completed: false,
            type: "video",
            current: true,
            description: "Aprende a usar operadores lógicos para crear condiciones complejas.",
          },
          {
            id: 10,
            title: "Ejercicio: Validador",
            duration: "20 min",
            completed: false,
            type: "exercise",
            description: "Crea un sistema de validación usando operadores lógicos.",
            hasCodeEditor: true,
            starterCode:
              "# Sistema de validación\n# Crea un validador de contraseñas\n\ndef validar_contraseña(contraseña):\n    # La contraseña debe tener al menos 8 caracteres\n    # Debe contener al menos una letra mayúscula\n    # Debe contener al menos un número\n    \n    # Tu código aquí\n    pass\n\n# Prueba tu función\ncontraseña = input('Ingresa una contraseña: ')\nif validar_contraseña(contraseña):\n    print('Contraseña válida')\nelse:\n    print('Contraseña inválida')",
            expectedOutput: "Ingresa una contraseña: MiContraseña123\nContraseña válida",
            documents: [
              {
                id: "doc4",
                title: "validador_ejemplo.py",
                type: "py",
                size: "1.1 KB",
                url: "#",
              },
              {
                id: "doc5",
                title: "Expresiones regulares.pdf",
                type: "pdf",
                size: "2.3 MB",
                url: "#",
              },
            ],
          },
        ],
      },
      {
        id: 4,
        title: "4. Estructuras de Control",
        lessons: 5,
        completed: false,
        locked: false,
        lessons_detail: [
          {
            id: 11,
            title: "Condicionales if/else",
            duration: "25 min",
            completed: false,
            type: "video",
            description: "Aprende a tomar decisiones en tu código con condicionales.",
          },
          {
            id: 12,
            title: "Bucles for",
            duration: "20 min",
            completed: false,
            type: "video",
            description: "Domina los bucles for para iterar sobre secuencias.",
          },
          {
            id: 13,
            title: "Bucles while",
            duration: "20 min",
            completed: false,
            type: "video",
            description: "Aprende a usar bucles while para repetir acciones.",
          },
          {
            id: 14,
            title: "Control de flujo",
            duration: "15 min",
            completed: false,
            type: "video",
            description: "Controla el flujo de ejecución con break y continue.",
          },
          {
            id: 15,
            title: "Proyecto: Sistema de notas",
            duration: "10 min",
            completed: false,
            type: "exercise",
            description: "Desarrolla un sistema completo para gestionar notas de estudiantes.",
            hasCodeEditor: true,
            starterCode:
              "# Sistema de gestión de notas\n# Crea un programa que permita:\n# 1. Agregar estudiantes\n# 2. Registrar notas\n# 3. Calcular promedios\n# 4. Mostrar estadísticas\n\nestudiantes = {}\n\ndef agregar_estudiante(nombre):\n    # Tu código aquí\n    pass\n\ndef agregar_nota(nombre, nota):\n    # Tu código aquí\n    pass\n\ndef calcular_promedio(nombre):\n    # Tu código aquí\n    pass\n\ndef mostrar_estadisticas():\n    # Tu código aquí\n    pass\n\n# Programa principal\nwhile True:\n    print('\\n=== Sistema de Notas ===')\n    print('1. Agregar estudiante')\n    print('2. Agregar nota')\n    print('3. Ver promedio')\n    print('4. Estadísticas')\n    print('5. Salir')\n    \n    opcion = input('Selecciona una opción: ')\n    \n    # Implementa el menú aquí",
            expectedOutput:
              "=== Sistema de Notas ===\n1. Agregar estudiante\n2. Agregar nota\n3. Ver promedio\n4. Estadísticas\n5. Salir\nSelecciona una opción: 1\nNombre del estudiante: Juan\nEstudiante agregado exitosamente",
            documents: [
              {
                id: "doc6",
                title: "sistema_notas_completo.py",
                type: "py",
                size: "3.2 KB",
                url: "#",
              },
              {
                id: "doc7",
                title: "Estructuras de datos.pdf",
                type: "pdf",
                size: "1.8 MB",
                url: "#",
              },
              {
                id: "doc8",
                title: "Ejemplos de bucles.py",
                type: "py",
                size: "1.5 KB",
                url: "#",
              },
            ],
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

  const getTypeIcon = (type) => {
    switch (type) {
      case "video":
        return "▶️"
      case "exercise":
        return "💻"
      default:
        return "📚"
    }
  }

  const renderDocumentIcon = (fileType) => {
    switch (fileType) {
      case "pdf":
        return "📄"
      case "py":
        return "🐍"
      case "doc":
      case "docx":
        return "📝"
      case "ppt":
      case "pptx":
        return "📊"
      default:
        return "📄"
    }
  }

  const handleExerciseClick = (lesson) => {
    if (lesson.type === "exercise" && lesson.hasCodeEditor) {
      setSelectedExercise(lesson)
      setUserCode(lesson.starterCode || "")
      setShowExerciseModal(true)
    }
  }

  const completedLessons = mockCourse.topics.reduce(
    (total, topic) => total + topic.lessons_detail.filter((lesson) => lesson.completed).length,
    0,
  )
  const totalLessons = mockCourse.topics.reduce((total, topic) => total + topic.lessons_detail.length, 0)
  const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

  return (
    <div className="ver-leccion-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-left">
            <a href="/" className="back-btn">
              <span className="icon-arrow-left">←</span>
              Volver
            </a>
            <div className="logo-section">
              <img src="/placeholder.svg?height=32&width=32" alt="LearnPy" className="logo" />
              <div className="logo-text">
                <h1 className="logo-title">LearnPy</h1>
                <p className="logo-subtitle">Plataforma de Enseñanza Python</p>
              </div>
            </div>
          </div>

          <div className="header-right">
            <button className="header-action-btn">
              <span className="icon-heart">❤️</span>
              Favorito
            </button>
            <button className="header-action-btn">
              <span className="icon-share">📤</span>
              Compartir
            </button>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Course Header */}
        <div className="course-header-grid">
          <div className="course-info-section">
            <div className="course-badges">
              <span className={`level-badge ${getLevelColor(mockCourse.level)}`}>{mockCourse.level}</span>
              <div className="rating-section">
                <span className="star-icon">⭐</span>
                <span className="rating-text">{mockCourse.rating}</span>
                <span className="reviews-text">({mockCourse.reviews} reseñas)</span>
              </div>
            </div>

            <h1 className="course-title">{mockCourse.title}</h1>
            <p className="course-description">{mockCourse.description}</p>

            <div className="course-stats">
              <div className="stat-item">
                <span className="stat-icon">📚</span>
                <span className="stat-text">{mockCourse.lessons} lecciones</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">⏱️</span>
                <span className="stat-text">{mockCourse.duration}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span className="stat-text">{mockCourse.students} estudiantes</span>
              </div>
            </div>

            {/* Progress Card */}
            {mockCourse.isEnrolled && (
              <div className="progress-card">
                <div className="progress-header">
                  <h3 className="progress-title">Progreso del Curso</h3>
                  <span className="progress-percentage">{progressPercentage}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                <div className="progress-footer">
                  <span className="progress-text">
                    {completedLessons} de {totalLessons} lecciones completadas
                  </span>
                  <span className="last-access">
                    Último acceso: {new Date(mockCourse.lastAccessed).toLocaleDateString("es-ES")}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="course-sidebar">
            <div className="sidebar-card">
              <div className="course-preview">
                <img src="/placeholder.svg?height=300&width=400" alt={mockCourse.title} className="preview-image" />
                <div className="preview-overlay">
                  <button className="play-btn">
                    <span className="play-icon">▶️</span>
                    {mockCourse.isEnrolled ? "Continuar Curso" : "Vista Previa"}
                  </button>
                </div>
              </div>

              <div className="sidebar-content">
                <div className="price-section">
                  <div className="price">{mockCourse.price}</div>
                  {!mockCourse.isEnrolled && <button className="enroll-btn">Inscribirse Ahora</button>}
                </div>

                {/* Instructor Info */}
                <div className="instructor-section">
                  <h4 className="instructor-title">Instructor</h4>
                  <div className="instructor-info">
                    <div className="instructor-avatar">
                      <img src="/placeholder.svg?height=64&width=64" alt="Instructor" />
                    </div>
                    <div className="instructor-details">
                      <h5 className="instructor-name">{mockCourse.instructor.name}</h5>
                      <p className="instructor-bio">{mockCourse.instructor.bio}</p>
                      <div className="instructor-stats">
                        <span>{mockCourse.instructor.courses} cursos</span>
                        <span>{mockCourse.instructor.students.toLocaleString()} estudiantes</span>
                        <div className="instructor-rating">
                          <span className="star-icon">⭐</span>
                          <span>{mockCourse.instructor.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Tabs */}
        <div className="tabs-container">
          <div className="tabs-list">
            <button
              className={`tab ${activeTab === "contenido" ? "active" : ""}`}
              onClick={() => setActiveTab("contenido")}
            >
              📚 Contenido del Curso
            </button>
            <button
              className={`tab ${activeTab === "requisitos" ? "active" : ""}`}
              onClick={() => setActiveTab("requisitos")}
            >
              📋 Requisitos
            </button>
          </div>

          {/* Contenido del Curso */}
          {activeTab === "contenido" && (
            <div className="tab-content">
              <div className="topics-list">
                {mockCourse.topics.map((topic, topicIndex) => (
                  <div key={topic.id} className={`topic-card ${topic.current ? "current" : ""}`}>
                    <div className="topic-header">
                      <div className="topic-info">
                        <div
                          className={`topic-status ${
                            topic.completed ? "completed" : topic.current ? "current" : "pending"
                          }`}
                        >
                          {topic.completed ? (
                            <span className="status-icon">✅</span>
                          ) : (
                            <span className="topic-number">{topicIndex + 1}</span>
                          )}
                        </div>
                        <div className="topic-details">
                          <h3 className="topic-title">{topic.title}</h3>
                          <div className="topic-meta">
                            <span>{topic.lessons} lecciones</span>
                          </div>
                        </div>
                      </div>
                      <div className="topic-badges">
                        {topic.completed && <span className="topic-badge completed">Completado</span>}
                        {topic.current && <span className="topic-badge current">En Progreso</span>}
                      </div>
                    </div>

                    <div className="lessons-list">
                      {topic.lessons_detail.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className={`lesson-item ${lesson.current ? "current" : lesson.completed ? "completed" : ""}`}
                        >
                          <div className="lesson-info">
                            <div
                              className={`lesson-status ${
                                lesson.completed ? "completed" : lesson.current ? "current" : "pending"
                              }`}
                            >
                              {lesson.completed ? (
                                <span className="status-icon">✅</span>
                              ) : (
                                <span className="type-icon">{getTypeIcon(lesson.type)}</span>
                              )}
                            </div>
                            <div className="lesson-details">
                              <h4 className="lesson-title">{lesson.title}</h4>
                              <p className="lesson-description">{lesson.description}</p>
                              <div className="lesson-meta">
                                <span>{lesson.duration}</span>
                                <span>•</span>
                                <span>{lesson.type === "video" ? "Video" : "Ejercicio"}</span>
                                {lesson.type === "exercise" && lesson.documents && lesson.documents.length > 0 && (
                                  <>
                                    <span>•</span>
                                    <span className="documents-count">
                                      📄 {lesson.documents.length} archivo{lesson.documents.length > 1 ? "s" : ""}
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="lesson-actions">
                            <button
                              className={`lesson-btn ${lesson.current ? "current" : ""}`}
                              onClick={() => (lesson.type === "exercise" ? handleExerciseClick(lesson) : null)}
                            >
                              {lesson.type === "exercise" ? (
                                <>
                                  <span className="btn-icon">💻</span>
                                  {lesson.completed ? "Revisar" : lesson.current ? "Continuar" : "Comenzar"}
                                </>
                              ) : (
                                <>
                                  <span className="btn-icon">▶️</span>
                                  {lesson.completed ? "Ver de nuevo" : lesson.current ? "Continuar" : "Ver"}
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Requisitos */}
          {activeTab === "requisitos" && (
            <div className="tab-content">
              <div className="requirements-card">
                <div className="requirements-header">
                  <h3 className="requirements-title">📋 Requisitos</h3>
                </div>
                <div className="requirements-content">
                  <ul className="requirements-list">
                    {mockCourse.requirements.map((requirement, index) => (
                      <li key={index} className="requirement-item">
                        <span className="requirement-bullet">•</span>
                        <span className="requirement-text">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Exercise Modal */}
        {showExerciseModal && selectedExercise && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">{selectedExercise.title}</h2>
                <button className="modal-close-btn" onClick={() => setShowExerciseModal(false)}>
                  ×
                </button>
              </div>

              <div className="modal-body">
                {/* Exercise Description */}
                <div className="exercise-description-card">
                  <h3 className="description-title">Descripción del Ejercicio</h3>
                  <p className="description-text">{selectedExercise.description}</p>
                </div>

                {/* Documents */}
                {selectedExercise.documents && selectedExercise.documents.length > 0 && (
                  <div className="documents-card">
                    <div className="documents-header">
                      <h3 className="documents-title">📄 Archivos de Apoyo</h3>
                    </div>
                    <div className="documents-grid">
                      {selectedExercise.documents.map((document) => (
                        <div key={document.id} className="document-item">
                          <div className="document-icon">{renderDocumentIcon(document.type)}</div>
                          <div className="document-info">
                            <p className="document-title">{document.title}</p>
                            <p className="document-meta">
                              {document.type.toUpperCase()} · {document.size}
                            </p>
                          </div>
                          <button className="download-btn">📥</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Code Editor */}
                <div className="code-editor-grid">
                  <div className="code-editor-card">
                    <div className="code-editor-header">
                      <h3 className="editor-title">💻 Editor de Código Python</h3>
                    </div>
                    <div className="code-editor-content">
                      <textarea
                        value={userCode}
                        onChange={(e) => setUserCode(e.target.value)}
                        className="code-textarea"
                        placeholder="Escribe tu código aquí..."
                        rows="15"
                      />
                      <div className="code-actions">
                        <button className="code-btn run-btn">▶️ Ejecutar</button>
                        <button className="code-btn reset-btn">🔄 Reiniciar</button>
                        <button className="code-btn save-btn">💾 Guardar</button>
                      </div>
                    </div>
                  </div>

                  <div className="output-section">
                    {/* Expected Output */}
                    <div className="expected-output-card">
                      <div className="output-header">
                        <h4 className="output-title">👁️ Salida Esperada</h4>
                      </div>
                      <div className="output-content">
                        <pre className="output-text expected">{selectedExercise.expectedOutput}</pre>
                      </div>
                    </div>

                    {/* Console Output */}
                    <div className="console-output-card">
                      <div className="output-header">
                        <h4 className="output-title">Consola</h4>
                      </div>
                      <div className="console-content">
                        <div className="console-text">Ejecuta tu código para ver la salida...</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerLeccion
