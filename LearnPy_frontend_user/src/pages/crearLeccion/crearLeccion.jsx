"use client"

import { useState, useEffect } from "react"
import "./crearLeccion.css"

const CrearLeccion = () => {
  const [activeTab, setActiveTab] = useState("general")
  const [validationErrors, setValidationErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    level: "",
    coverImage: null,
    isVisible: true,
  })

  const [topics, setTopics] = useState([
    {
      id: "1",
      title: "",
      description: "",
      duration: 30,
      materials: [],
      exercises: [],
      order: 1,
    },
  ])

  // Validación en tiempo real solo para campos tocados
  useEffect(() => {
    const errors = {}

    if (touchedFields.title) {
      if (!lesson.title.trim()) {
        errors.title = "El título es obligatorio"
      } else if (lesson.title.length < 5) {
        errors.title = "El título debe tener al menos 5 caracteres"
      }
    }

    if (touchedFields.description) {
      if (!lesson.description.trim()) {
        errors.description = "La descripción es obligatoria"
      } else if (lesson.description.length < 20) {
        errors.description = "La descripción debe tener al menos 20 caracteres"
      }
    }

    if (touchedFields.level && !lesson.level) {
      errors.level = "Selecciona un nivel"
    }

    const topicErrors = {}
    topics.forEach((topic, index) => {
      if (touchedFields.topics?.[index]?.title && !topic.title.trim()) {
        topicErrors[index] = { ...topicErrors[index], title: "El título del tópico es obligatorio" }
      }
      if (touchedFields.topics?.[index]?.description && !topic.description.trim()) {
        topicErrors[index] = { ...topicErrors[index], description: "La descripción del tópico es obligatoria" }
      }
    })

    if (Object.keys(topicErrors).length > 0) {
      errors.topics = topicErrors
    }

    setValidationErrors(errors)
  }, [lesson, topics, touchedFields])

  const handleFieldTouch = (field, topicIndex, subField) => {
    setTouchedFields((prev) => {
      if (topicIndex !== undefined && subField) {
        return {
          ...prev,
          topics: {
            ...prev.topics,
            [topicIndex]: {
              ...prev.topics?.[topicIndex],
              [subField]: true,
            },
          },
        }
      }
      return { ...prev, [field]: true }
    })
  }

  const addTopic = () => {
    const newTopic = {
      id: Date.now().toString(),
      title: "",
      description: "",
      duration: 30,
      materials: [],
      exercises: [],
      order: topics.length + 1,
    }
    setTopics([...topics, newTopic])
    setCurrentTopicIndex(topics.length)
  }

  const updateTopic = (index, field, value) => {
    const updatedTopics = [...topics]
    updatedTopics[index] = { ...updatedTopics[index], [field]: value }
    setTopics(updatedTopics)
  }

  const handleFileUpload = (topicIndex, type, files) => {
    if (!files) return

    const newMaterials = []
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file)
      const fileName = file.name
      const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf(".")) || fileName
      const fileExtension = fileName.split(".").pop()?.toLowerCase() || ""

      const newMaterial = {
        id: Date.now().toString() + Math.random(),
        type,
        title: nameWithoutExtension,
        file,
        url,
        description: "",
        fileExtension: fileExtension,
      }
      newMaterials.push(newMaterial)
    })

    const updatedTopics = [...topics]
    updatedTopics[topicIndex].materials.push(...newMaterials)
    setTopics(updatedTopics)
  }

  const removeMaterial = (topicIndex, materialIndex) => {
    const updatedTopics = [...topics]
    const material = updatedTopics[topicIndex].materials[materialIndex]
    if (material.url) {
      URL.revokeObjectURL(material.url)
    }
    updatedTopics[topicIndex].materials.splice(materialIndex, 1)
    setTopics(updatedTopics)
  }

  const addExercise = (topicIndex) => {
    const newExercise = {
      id: Date.now().toString(),
      title: "",
      description: "",
      hasCodeEditor: true,
      starterCode: "# Escribe tu código aquí\n",
      expectedOutput: "",
      materials: [],
      documents: [],
    }
    const updatedTopics = [...topics]
    updatedTopics[topicIndex].exercises.push(newExercise)
    setTopics(updatedTopics)
  }

  const handleDocumentUpload = (topicIndex, exerciseIndex, files) => {
    if (!files) return

    const newDocuments = []
    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file)
      const fileType = file.name.split(".").pop()?.toLowerCase() || ""
      const fileSize = (file.size / 1024).toFixed(1) + " KB"

      const newDocument = {
        id: Date.now().toString() + Math.random(),
        title: file.name,
        file,
        url,
        type: fileType,
        size: fileSize,
      }
      newDocuments.push(newDocument)
    })

    const updatedTopics = [...topics]
    updatedTopics[topicIndex].exercises[exerciseIndex].documents.push(...newDocuments)
    setTopics(updatedTopics)
  }

  const removeDocument = (topicIndex, exerciseIndex, documentIndex) => {
    const updatedTopics = [...topics]
    const document = updatedTopics[topicIndex].exercises[exerciseIndex].documents[documentIndex]
    if (document.url) {
      URL.revokeObjectURL(document.url)
    }
    updatedTopics[topicIndex].exercises[exerciseIndex].documents.splice(documentIndex, 1)
    setTopics(updatedTopics)
  }

  const getTotalDuration = () => {
    return topics.reduce((total, topic) => total + topic.duration, 0)
  }

  const getTotalExercises = () => {
    return topics.reduce((total, topic) => total + topic.exercises.length, 0)
  }

  const getTotalMaterials = () => {
    return topics.reduce((total, topic) => total + topic.materials.length, 0)
  }

  const getCompletionPercentage = () => {
    const requiredFields = [
      lesson.title,
      lesson.description,
      lesson.level,
      topics.length > 0 && topics[0].title,
      topics.length > 0 && topics[0].description,
    ]
    const completedFields = requiredFields.filter(Boolean).length
    return Math.round((completedFields / requiredFields.length) * 100)
  }

  const isFormValid = () => {
    return Object.keys(validationErrors).length === 0 && getCompletionPercentage() >= 80
  }

  const renderMaterialPreview = (material) => {
    switch (material.type) {
      case "image":
        return <img src={material.url || "/placeholder.svg"} alt={material.title} className="material-preview-image" />
      case "video":
        return (
          <div className="material-preview-video">
            <video src={material.url} className="video-preview" controls />
          </div>
        )
      case "document":
        return (
          <div className="material-preview-document">
            <div className="document-icon">
              <i className="icon-file-text"></i>
              <p className="document-title">{material.title}</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderDocumentIcon = (fileType) => {
    const iconClass =
      {
        pdf: "icon-pdf",
        doc: "icon-doc",
        docx: "icon-doc",
        ppt: "icon-ppt",
        pptx: "icon-ppt",
        xls: "icon-xls",
        xlsx: "icon-xls",
      }[fileType] || "icon-file"

    return <i className={`document-type-icon ${iconClass}`}></i>
  }

  const handleSaveLesson = () => {
    console.log("Guardando lección:", { lesson, topics })
    alert("Lección guardada exitosamente!")
  }

  const nextTopic = () => {
    if (currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex(currentTopicIndex + 1)
    }
  }

  const prevTopic = () => {
    if (currentTopicIndex > 0) {
      setCurrentTopicIndex(currentTopicIndex - 1)
    }
  }

  return (
    <div className="crear-leccion-container">
      {/* Header */}
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
              <i className="icon-bell"></i>
              <span className="notification-badge"></span>
            </button>
            <div className="avatar">
              <img src="/placeholder.svg?height=32&width=32" alt="Avatar" />
            </div>
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Navigation and Save buttons */}
        <div className="action-buttons">
          <button className="back-btn">
            <i className="icon-arrow-left"></i>
            <span>Volver a Lecciones</span>
          </button>

          <button
            onClick={handleSaveLesson}
            className={`save-btn ${isFormValid() ? "enabled" : "disabled"}`}
            disabled={!isFormValid()}
          >
            <i className="icon-save"></i>
            <span>Guardar Lección</span>
          </button>
        </div>

        <div className="content-grid">
          {/* Sidebar */}
          <div className="sidebar">
            <div className="summary-card">
              <div className="summary-header">
                <h3>Resumen</h3>
              </div>
              <div className="summary-content">
                <div className="summary-item">
                  <div className="summary-item-left">
                    <i className="icon-book"></i>
                    <span>Tópicos</span>
                  </div>
                  <span className="summary-badge">{topics.length}</span>
                </div>

                <div className="summary-item">
                  <div className="summary-item-left">
                    <i className="icon-code"></i>
                    <span>Ejercicios</span>
                  </div>
                  <span className="summary-badge">{getTotalExercises()}</span>
                </div>

                <div className="summary-item">
                  <div className="summary-item-left">
                    <i className="icon-file-text"></i>
                    <span>Materiales</span>
                  </div>
                  <span className="summary-badge">{getTotalMaterials()}</span>
                </div>

                <div className="summary-progress">
                  <div className="progress-header">
                    <span>Completado</span>
                    <span>{getCompletionPercentage()}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${getCompletionPercentage()}%` }}></div>
                  </div>
                  <div className="progress-status">
                    {isFormValid() ? (
                      <>
                        <i className="icon-check-circle success"></i>
                        <span className="success">Listo para guardar</span>
                      </>
                    ) : (
                      <>
                        <i className="icon-alert-circle warning"></i>
                        <span className="warning">Faltan campos</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-panel">
            <div className="tabs-container">
              <div className="tabs-list">
                <button
                  className={`tab ${activeTab === "general" ? "active" : ""}`}
                  onClick={() => setActiveTab("general")}
                >
                  📋 Información General
                </button>
                <button
                  className={`tab ${activeTab === "topics" ? "active" : ""}`}
                  onClick={() => setActiveTab("topics")}
                >
                  📚 Tópicos y Contenido
                </button>
              </div>

              {/* General Tab */}
              {activeTab === "general" && (
                <div className="tab-content">
                  <div className="card">
                    <div className="card-header">
                      <h2 className="card-title">
                        <i className="icon-book"></i>
                        Información Básica
                      </h2>
                    </div>
                    <div className="card-content">
                      <div className="form-grid">
                        <div className="form-section">
                          <div className="form-group">
                            <label htmlFor="title" className="form-label">
                              Título de la Lección <span className="required">*</span>
                            </label>
                            <input
                              id="title"
                              type="text"
                              placeholder="Ej: Introducción a las Funciones en Python"
                              value={lesson.title}
                              onChange={(e) => setLesson((prev) => ({ ...prev, title: e.target.value }))}
                              onBlur={() => handleFieldTouch("title")}
                              className={`form-input ${validationErrors.title ? "error" : ""}`}
                            />
                            {validationErrors.title && (
                              <p className="error-message">
                                <i className="icon-alert-circle"></i>
                                {validationErrors.title}
                              </p>
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="description" className="form-label">
                              Descripción <span className="required">*</span>
                            </label>
                            <textarea
                              id="description"
                              placeholder="Describe qué aprenderán los estudiantes en esta lección..."
                              value={lesson.description}
                              onChange={(e) => setLesson((prev) => ({ ...prev, description: e.target.value }))}
                              onBlur={() => handleFieldTouch("description")}
                              className={`form-textarea ${validationErrors.description ? "error" : ""}`}
                              rows="4"
                            />
                            {validationErrors.description && (
                              <p className="error-message">
                                <i className="icon-alert-circle"></i>
                                {validationErrors.description}
                              </p>
                            )}
                          </div>

                          <div className="form-group">
                            <label className="form-label">
                              Nivel <span className="required">*</span>
                            </label>
                            <select
                              value={lesson.level}
                              onChange={(e) => setLesson((prev) => ({ ...prev, level: e.target.value }))}
                              onBlur={() => handleFieldTouch("level")}
                              className={`form-select ${validationErrors.level ? "error" : ""}`}
                            >
                              <option value="">Seleccionar nivel</option>
                              <option value="principiante">Principiante</option>
                              <option value="intermedio">Intermedio</option>
                              <option value="avanzado">Avanzado</option>
                            </select>
                            {validationErrors.level && <p className="error-message">{validationErrors.level}</p>}
                          </div>
                        </div>

                        <div className="image-upload-section">
                          <label className="form-label">Imagen de Portada</label>
                          <div
                            className="image-upload-area"
                            onClick={() => {
                              const input = document.createElement("input")
                              input.type = "file"
                              input.accept = "image/*"
                              input.onchange = (e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                  const url = URL.createObjectURL(file)
                                  setLesson((prev) => ({ ...prev, coverImage: url }))
                                }
                              }
                              input.click()
                            }}
                          >
                            {lesson.coverImage ? (
                              <div className="image-preview">
                                <img
                                  src={lesson.coverImage || "/placeholder.svg"}
                                  alt="Portada"
                                  className="preview-image"
                                />
                                <button
                                  className="remove-image-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (lesson.coverImage) URL.revokeObjectURL(lesson.coverImage)
                                    setLesson((prev) => ({ ...prev, coverImage: null }))
                                  }}
                                >
                                  <i className="icon-x"></i>
                                </button>
                              </div>
                            ) : (
                              <div className="upload-placeholder">
                                <i className="icon-upload"></i>
                                <p>Arrastra una imagen o haz clic para subir</p>
                                <p className="upload-hint">PNG, JPG hasta 5MB</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Visibility Settings */}
                      <div className="settings-section">
                        <h3>Configuración de la Lección</h3>
                        <div className="setting-item">
                          <div className="setting-info">
                            <label className="setting-label">Lección Visible</label>
                            <p className="setting-description">Los estudiantes pueden encontrar esta lección</p>
                          </div>
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={lesson.isVisible}
                              onChange={(e) => setLesson((prev) => ({ ...prev, isVisible: e.target.checked }))}
                            />
                            <span className="slider"></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Topics Tab */}
              {activeTab === "topics" && (
                <div className="tab-content">
                  <div className="topics-header">
                    <h3>Tópicos del Curso</h3>
                    <button onClick={addTopic} className="add-topic-btn">
                      <i className="icon-plus"></i>
                      Nuevo Tópico
                    </button>
                  </div>

                  {topics.length > 0 && (
                    <div className="topic-navigation">
                      <button onClick={prevTopic} disabled={currentTopicIndex === 0} className="nav-btn prev">
                        <i className="icon-chevron-left"></i>
                        Anterior
                      </button>
                      <div className="topic-indicator">
                        Tópico {currentTopicIndex + 1} de {topics.length}
                      </div>
                      <button
                        onClick={nextTopic}
                        disabled={currentTopicIndex === topics.length - 1}
                        className="nav-btn next"
                      >
                        Siguiente
                        <i className="icon-chevron-right"></i>
                      </button>
                    </div>
                  )}

                  {topics.length > 0 && (
                    <div className="topic-card">
                      <div className="topic-header">
                        <h3>Tópico {currentTopicIndex + 1}</h3>
                        {topics.length > 1 && (
                          <button
                            className="delete-topic-btn"
                            onClick={() => {
                              const newTopics = topics.filter((_, i) => i !== currentTopicIndex)
                              setTopics(newTopics)
                              if (currentTopicIndex >= newTopics.length) {
                                setCurrentTopicIndex(Math.max(0, newTopics.length - 1))
                              }
                            }}
                          >
                            <i className="icon-x"></i>
                          </button>
                        )}
                      </div>

                      <div className="topic-content">
                        <div className="form-group">
                          <label className="form-label">
                            Título del Tópico <span className="required">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Ej: Variables y Tipos de Datos"
                            value={topics[currentTopicIndex].title}
                            onChange={(e) => updateTopic(currentTopicIndex, "title", e.target.value)}
                            onBlur={() => handleFieldTouch("topics", currentTopicIndex, "title")}
                            className={`form-input ${
                              validationErrors.topics?.[currentTopicIndex]?.title ? "error" : ""
                            }`}
                          />
                          {validationErrors.topics?.[currentTopicIndex]?.title && (
                            <p className="error-message">
                              <i className="icon-alert-circle"></i>
                              {validationErrors.topics[currentTopicIndex].title}
                            </p>
                          )}
                        </div>

                        <div className="form-group">
                          <label className="form-label">
                            Descripción del Tópico <span className="required">*</span>
                          </label>
                          <textarea
                            placeholder="Describe qué se cubrirá en este tópico..."
                            value={topics[currentTopicIndex].description}
                            onChange={(e) => updateTopic(currentTopicIndex, "description", e.target.value)}
                            onBlur={() => handleFieldTouch("topics", currentTopicIndex, "description")}
                            className={`form-textarea ${
                              validationErrors.topics?.[currentTopicIndex]?.description ? "error" : ""
                            }`}
                            rows="3"
                          />
                          {validationErrors.topics?.[currentTopicIndex]?.description && (
                            <p className="error-message">
                              <i className="icon-alert-circle"></i>
                              {validationErrors.topics[currentTopicIndex].description}
                            </p>
                          )}
                        </div>

                        {/* Materials Section */}
                        <div className="materials-section">
                          <div className="materials-header">
                            <h4>
                              <i className="icon-upload"></i>
                              Materiales de Estudio
                            </h4>
                            <div className="material-buttons">
                              <button
                                className="material-btn documents"
                                onClick={() => {
                                  const input = document.createElement("input")
                                  input.type = "file"
                                  input.accept =
                                    ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.py,.js,.html,.css,.json,.xml,.zip,.rar"
                                  input.multiple = true
                                  input.onchange = (e) =>
                                    handleFileUpload(currentTopicIndex, "document", e.target.files)
                                  input.click()
                                }}
                              >
                                <i className="icon-file-text"></i>
                                Documentos
                              </button>
                              <button
                                className="material-btn videos"
                                onClick={() => {
                                  const input = document.createElement("input")
                                  input.type = "file"
                                  input.accept = "video/*"
                                  input.multiple = true
                                  input.onchange = (e) => handleFileUpload(currentTopicIndex, "video", e.target.files)
                                  input.click()
                                }}
                              >
                                <i className="icon-video"></i>
                                Videos
                              </button>
                              <button
                                className="material-btn images"
                                onClick={() => {
                                  const input = document.createElement("input")
                                  input.type = "file"
                                  input.accept = "image/*"
                                  input.multiple = true
                                  input.onchange = (e) => handleFileUpload(currentTopicIndex, "image", e.target.files)
                                  input.click()
                                }}
                              >
                                <i className="icon-image"></i>
                                Imágenes
                              </button>
                            </div>
                          </div>

                          <div className="materials-content">
                            {topics[currentTopicIndex].materials.length > 0 ? (
                              <div className="materials-grid">
                                {topics[currentTopicIndex].materials.map((material, materialIndex) => (
                                  <div key={material.id} className="material-item">
                                    <div className="material-preview">
                                      {renderMaterialPreview(material)}
                                      <button
                                        className="remove-material-btn"
                                        onClick={() => removeMaterial(currentTopicIndex, materialIndex)}
                                      >
                                        <i className="icon-x"></i>
                                      </button>
                                    </div>
                                    <div className="material-info">
                                      <input
                                        type="text"
                                        placeholder="Título del material"
                                        value={material.title}
                                        onChange={(e) => {
                                          const updatedTopics = [...topics]
                                          updatedTopics[currentTopicIndex].materials[materialIndex].title =
                                            e.target.value
                                          setTopics(updatedTopics)
                                        }}
                                        className="material-title-input"
                                      />
                                      <div className="material-type">
                                        <i className={`icon-${material.type}`}></i>
                                        <span>{material.fileExtension || material.type}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="empty-materials">
                                <i className="icon-upload"></i>
                                <p>No hay materiales agregados</p>
                                <p className="empty-hint">Usa los botones de arriba para agregar archivos</p>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Exercises Section */}
                        <div className="exercises-section">
                          <div className="exercises-header">
                            <h4>Ejercicios Prácticos</h4>
                            <button className="add-exercise-btn" onClick={() => addExercise(currentTopicIndex)}>
                              <i className="icon-plus"></i>
                              Nuevo Ejercicio
                            </button>
                          </div>

                          {topics[currentTopicIndex].exercises.length > 0 && (
                            <div className="exercises-list">
                              {topics[currentTopicIndex].exercises.map((exercise, exerciseIndex) => (
                                <div key={exercise.id} className="exercise-card">
                                  <div className="exercise-header">
                                    <h5>Ejercicio {exerciseIndex + 1}</h5>
                                    <button
                                      className="delete-exercise-btn"
                                      onClick={() => {
                                        const updatedTopics = [...topics]
                                        updatedTopics[currentTopicIndex].exercises.splice(exerciseIndex, 1)
                                        setTopics(updatedTopics)
                                      }}
                                    >
                                      <i className="icon-x"></i>
                                    </button>
                                  </div>

                                  <div className="exercise-content">
                                    <div className="form-group">
                                      <label className="form-label">Título del Ejercicio *</label>
                                      <input
                                        type="text"
                                        placeholder="Ej: Crear una función factorial"
                                        value={exercise.title}
                                        onChange={(e) => {
                                          const updatedTopics = [...topics]
                                          updatedTopics[currentTopicIndex].exercises[exerciseIndex].title =
                                            e.target.value
                                          setTopics(updatedTopics)
                                        }}
                                        className="form-input"
                                      />
                                    </div>

                                    <div className="form-group">
                                      <label className="form-label">Descripción del Ejercicio *</label>
                                      <textarea
                                        placeholder="Instrucciones detalladas para el ejercicio..."
                                        value={exercise.description}
                                        onChange={(e) => {
                                          const updatedTopics = [...topics]
                                          updatedTopics[currentTopicIndex].exercises[exerciseIndex].description =
                                            e.target.value
                                          setTopics(updatedTopics)
                                        }}
                                        className="form-textarea"
                                        rows="3"
                                      />
                                    </div>

                                    {/* Exercise Documents */}
                                    <div className="exercise-documents">
                                      <div className="documents-header">
                                        <div className="documents-info">
                                          <label className="form-label">
                                            <i className="icon-file-text"></i>
                                            Documentos del ejercicio
                                          </label>
                                          <p className="documents-hint">
                                            Sube archivos de apoyo: código Python (.py), PDFs, documentos,
                                            presentaciones, etc.
                                          </p>
                                        </div>
                                        <button
                                          className="add-document-btn"
                                          onClick={() => {
                                            const input = document.createElement("input")
                                            input.type = "file"
                                            input.accept =
                                              ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.py,.js,.html,.css,.json,.xml,.zip,.rar"
                                            input.multiple = true
                                            input.onchange = (e) =>
                                              handleDocumentUpload(currentTopicIndex, exerciseIndex, e.target.files)
                                            input.click()
                                          }}
                                        >
                                          <i className="icon-plus"></i>
                                          Agregar Archivo
                                        </button>
                                      </div>

                                      {exercise.documents.length > 0 ? (
                                        <div className="documents-grid">
                                          {exercise.documents.map((document, documentIndex) => (
                                            <div key={document.id} className="document-item">
                                              <div className="document-icon-container">
                                                {renderDocumentIcon(document.type)}
                                              </div>
                                              <div className="document-info">
                                                <p className="document-title">{document.title}</p>
                                                <p className="document-meta">
                                                  {document.type.toUpperCase()} · {document.size}
                                                </p>
                                              </div>
                                              <button
                                                className="remove-document-btn"
                                                onClick={() =>
                                                  removeDocument(currentTopicIndex, exerciseIndex, documentIndex)
                                                }
                                              >
                                                <i className="icon-x"></i>
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="empty-documents">
                                          <i className="icon-file-text"></i>
                                          <p>No hay documentos agregados</p>
                                          <p className="empty-hint">Agrega documentos para complementar el ejercicio</p>
                                        </div>
                                      )}
                                    </div>

                                    {/* Code Editor */}
                                    <div className="code-editor-section">
                                      <div className="code-editor-header">
                                        <label className="switch-container">
                                          <input
                                            type="checkbox"
                                            checked={exercise.hasCodeEditor}
                                            onChange={(e) => {
                                              const updatedTopics = [...topics]
                                              updatedTopics[currentTopicIndex].exercises[exerciseIndex].hasCodeEditor =
                                                e.target.checked
                                              setTopics(updatedTopics)
                                            }}
                                          />
                                          <span className="switch-slider"></span>
                                        </label>
                                        <label className="code-editor-label">
                                          <i className="icon-code"></i>
                                          Incluir editor de código Python
                                        </label>
                                      </div>

                                      {exercise.hasCodeEditor && (
                                        <div className="code-editor-content">
                                          <div className="form-group">
                                            <label className="form-label code-label">Código inicial (opcional)</label>
                                            <textarea
                                              placeholder="# Código inicial para el estudiante..."
                                              value={exercise.starterCode}
                                              onChange={(e) => {
                                                const updatedTopics = [...topics]
                                                updatedTopics[currentTopicIndex].exercises[exerciseIndex].starterCode =
                                                  e.target.value
                                                setTopics(updatedTopics)
                                              }}
                                              className="code-textarea"
                                              rows="6"
                                            />
                                          </div>
                                          <div className="form-group">
                                            <label className="form-label code-label">Salida esperada (opcional)</label>
                                            <textarea
                                              placeholder="Resultado esperado del código..."
                                              value={exercise.expectedOutput}
                                              onChange={(e) => {
                                                const updatedTopics = [...topics]
                                                updatedTopics[currentTopicIndex].exercises[
                                                  exerciseIndex
                                                ].expectedOutput = e.target.value
                                                setTopics(updatedTopics)
                                              }}
                                              className="code-textarea output"
                                              rows="3"
                                            />
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrearLeccion
