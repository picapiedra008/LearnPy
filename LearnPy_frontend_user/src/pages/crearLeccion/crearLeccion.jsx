"use client"

import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import "./crearLeccion.css"

const CrearLeccion = () => {
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [activeTab, setActiveTab] = useState("general")
  const [validationErrors, setValidationErrors] = useState({})
  const [touchedFields, setTouchedFields] = useState({})
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0)
  const [lesson, setLesson] = useState({
    title: "",
    description: "",
    level: 1,
    coverImage: null,
    visibility: "",
  })

  //materiales y cover si se cambian
  const [coverInitial, setCoverInitial] = useState(null);
  const [InitialMaterials, setInitialMaterials] = useState([]);
  const [InitialExerciseMaterials, setInitialExerciseMaterials] = useState([]);

  const [coverFile,setCoverFile] = useState(null);

  const [visibilities, setVisibilities] = useState([])
  const [levels, setLevels] = useState([])

  const [topics, setTopics] = useState([
    {
      id: "-1",
      title: "",
      description: "",
      duration: 30,
      materials: [],
      exercises: [],
      order: 1,
    },
  ])

  const [deleted_topics,setDeletedTopics] = useState([])
  const [deleted_exercises, setDeletedExercises] = useState([])

  //obtener visibilidades


  useEffect(() => {
    const fetchVisibilities = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/lesson/get_visibilities", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        setVisibilities(data)
      } catch (error) {
        console.error("Error al obtener visibilidades:", error)
      }
    }

    fetchVisibilities()
  }, [])
  



    //obtener niveles


  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/lesson/get_levels", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })
        const data = await res.json()
        setLevels(data)
      } catch (error) {
        console.error("Error al obtener visibilidades:", error)
      }
    }

    fetchLevels()
  }, [])



  const getCoverImageUrl = () => {
    if (!lesson.coverImage) return "/placeholder.svg";

    // Si ya es una URL completa
    if (lesson.coverImage.startsWith("blob:http")) return lesson.coverImage;

    // Si solo es un ID de Drive
    return `https://drive.google.com/uc?export=view&id=${lesson.coverImage}`;
  };


  //obtener leccion y demas
  useEffect(() => {
    if (isEditing) {
      const obtenerLeccion = async () => {
        try {
          //leccion
          let res = await fetch("http://127.0.0.1:5000/lesson/get_lesson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lesson_code:Number(id) }),
          })

          let data = await res.json()
          console.log("Leccion:", data)
          
          setCoverInitial(data.lesson_front_page)
          
          setLesson({

            title: data.lesson_title,
            description: data.lesson_description,
            level:data.level_code,
            coverImage: data.lesson_front_page,
            visibility: data.visibility_code

            
          })
          //topicos   

          res = await fetch("http://127.0.0.1:5000/topic/get_topics", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lesson_code:Number(id) }),
          })

          data = await res.json()
          console.log("topicos:", data)
          const topicos_con_todo = [];
          for (const t of data) {
            try {
                res = await fetch("http://127.0.0.1:5000/exercise/get_exercises", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic_code: Number(t.topic_code) }),
              });
              let excerc = []
              const ejercicios = await res.json();
              console.log("ejercicios para topic", t.topic_code, ":", ejercicios);
              for (const e of ejercicios){
                /*res = await fetch("http://127.0.0.1:5000/exercise_material/get_materials_by_lesson", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ topic_code: Number(t.topic_code) }),
                });*/




                excerc.push({
                  id: e.exercise_code,
                  title: e.exercise_title,
                  description:e.exercise_instructions,
                  documents:[],
                  hasCodeEditor:e.with_python_code,
                  starterCode:e.exercise_initial_python_code,
                  expectedOutput:e.exercise_answer
                });
              }
              topicos_con_todo.push({
                id: t.topic_code,
                title: t.topic_title,
                description: t.topic_description,
                duration: 30,
                materials: [],
                exercises: excerc,
                order: t.topic_index,
              });
            } catch (error) {
              console.error("Error al obtener los ejercicios:", error);
            }
          }
          setTopics(topicos_con_todo);

          /*      id: "-1",
      title: "",
      description: "",
      duration: 30,
      materials: [],
      exercises: [],
      order: 1, */

        
        } catch (error) {
          console.error("Error al obtener lección:", error)
        }
      }

      obtenerLeccion()
    }
  }, [id, isEditing])



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
    if (touchedFields.visibility && !lesson.visibility) {
      errors.level = "Selecciona una visibilidad"
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
      id: "-1",
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
      id: -1,
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
    if(isEditing){
      //leccion
      const actualizar_leccion = async () => {
        try {
          const formData = new FormData()
          formData.append("lesson_code", id)
          formData.append("level_code", lesson.level)
          formData.append("visibility_code", lesson.visibility)
          formData.append("title", lesson.title)
          formData.append("description", lesson.description)
          formData.append("front_page", coverInitial)
          if (coverFile) {
            formData.append('file', coverFile);
          }


          const res = await fetch("http://127.0.0.1:5000/lesson/update_lesson", {
            method: "PUT",
            body: formData,
          })

          const data = await res.json()
          console.log("Leccion:", data)

          //topicos


        
        } catch (error) {
          console.error("Error al guardar lección:", error)
        }
      }
      actualizar_leccion()

      //topicos


        //ejercicios
    }else{

    }


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
        {/* Navigation and Save buttons */}
        <div className="action-buttons">
          <Link to="/listar" className="back-btn">
            <span className="icon-arrow-left">←</span>
            <span>Volver a Lecciones</span>
          </Link>

          <button
            onClick={handleSaveLesson}
            className={`save-btn ${isFormValid() ? "enabled" : "disabled"}`}
            disabled={!isFormValid()}
          >
            <span className="icon-save">💾</span>
            <span>{isEditing ? "Actualizar Lección" : "Guardar Lección"}</span>
          </button>
        </div>

        <div className="content-grid">
          {/* Sidebar compacto */}
          <div className="sidebar">
            <div className="summary-card">
              <div className="summary-header">
                <h3>Resumen</h3>
              </div>
              <div className="summary-content">
                <div className="summary-item">
                  <div className="summary-item-left">
                    <span className="icon-book">📚</span>
                    <span className="text-gray-600">Tópicos</span>
                  </div>
                  <span className="summary-badge">{topics.length}</span>
                </div>

                <div className="summary-item">
                  <div className="summary-item-left">
                    <span className="icon-code">💻</span>
                    <span className="text-gray-600">Ejercicios</span>
                  </div>
                  <span className="summary-badge">{getTotalExercises()}</span>
                </div>

                <div className="summary-item">
                  <div className="summary-item-left">
                    <span className="icon-file-text">📄</span>
                    <span className="text-gray-600">Materiales</span>
                  </div>
                  <span className="summary-badge">{getTotalMaterials()}</span>
                </div>

                <div className="summary-progress">
                  <div className="progress-header">
                    <span className="text-gray-600">Completado</span>
                    <span className="font-medium">{getCompletionPercentage()}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${getCompletionPercentage()}%` }}></div>
                  </div>
                  <div className="progress-status">
                    {isFormValid() ? (
                      <>
                        <span className="icon-check-circle success">✅</span>
                        <span className="success">Listo para guardar</span>
                      </>
                    ) : (
                      <>
                        <span className="icon-alert-circle warning">⚠️</span>
                        <span className="warning">Faltan campos</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>





          {/* Contenido principal */}
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
                        <span className="icon-book">📚</span>
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
                                <span className="icon-alert-circle">⚠️</span>
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
                                <span className="icon-alert-circle">⚠️</span>
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
                              onChange={(e) => setLesson((prev) => ({ ...prev, level: Number(e.target.value) }))}
                              onBlur={() => handleFieldTouch("level")}
                              className={`form-select ${validationErrors.level ? "error" : ""}`}
                            >
                              <option value="">Seleccionar nivel</option>
                              {levels.map((l) => (
                                <option key={l.level_code} value={l.level_code}>
                                  {l.level_name}
                                </option>
                              ))}
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
                                  setCoverFile(file)
                                  setLesson((prev) => ({ ...prev, coverImage: url }))
                                }
                              }
                              input.click()
                            }}
                          >
                            {lesson.coverImage ? (
                              <div className="image-preview">
                                <img
                                  src={getCoverImageUrl()}
                                  alt="Portada"
                                  className="preview-image"
                                />
                                <button
                                  className="remove-image-btn"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (lesson.coverImage) URL.revokeObjectURL(lesson.coverImage)
                                    setLesson((prev) => ({ ...prev, coverImage: null }))
                                    setCoverFile(null)
                                  }}
                                >
                                  <span className="icon-x">×</span>
                                </button>
                              </div>
                            ) : (
                              <div className="upload-placeholder">
                                <span className="icon-upload">📤</span>
                                <p>Arrastra una imagen o haz clic para subir</p>
                                <p className="upload-hint">PNG, JPG hasta 5MB</p>
                              </div>
                            )}
                          </div>


                          
                        </div>
                      </div>

                      {/* Visibility Settings */}
                      <div className="form-group">
                            <label className="form-label">
                              Visibilidad <span className="required">*</span>
                            </label>
                            <select
                              value={lesson.visibility}
                              onChange={(e) => setLesson((prev) => ({ ...prev, visibility: Number(e.target.value) }))}
                              onBlur={() => handleFieldTouch("visibility")}
                              className={`form-select ${validationErrors.visibility ? "error" : ""}`}
                            >
                              <option value="">Seleccionar nivel</option>
                              {visibilities.map((v) => (
                                <option key={v.visibility_code} value={v.visibility_code}>
                                  {v.visibility_name}
                                </option>
                              ))}
                            </select>
                            {validationErrors.visibility && <p className="error-message">{validationErrors.visibility}</p>}
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
                      <span className="icon-plus">+</span>
                      Nuevo Tópico
                    </button>
                  </div>

                  {topics.length > 0 && (
                    <div className="topic-navigation">
                      <button onClick={prevTopic} disabled={currentTopicIndex === 0} className="nav-btn prev">
                        <span className="icon-chevron-left">‹</span>
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
                        <span className="icon-chevron-right">›</span>
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
                            <span className="icon-x">×</span>
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
                              <span className="icon-alert-circle">⚠️</span>
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
                              <span className="icon-alert-circle">⚠️</span>
                              {validationErrors.topics[currentTopicIndex].description}
                            </p>
                          )}
                        </div>

                        {/* Materials Section */}
                        <div className="materials-section">
                          <div className="materials-header">
                            <h4>
                              <span className="icon-upload">📤</span>
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
                                <span className="icon-file-text">📄</span>
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
                                <span className="icon-video">🎥</span>
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
                                <span className="icon-image">🖼️</span>
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
                                        <span className="icon-x">×</span>
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
                                        <span className={`icon-${material.type}`}>
                                          {material.type === "document" && "📄"}
                                          {material.type === "video" && "🎥"}
                                          {material.type === "image" && "🖼️"}
                                        </span>
                                        <span>{material.fileExtension || material.type}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="empty-materials">
                                <span className="icon-upload">📤</span>
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
                              <span className="icon-plus">+</span>
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
                                      <span className="icon-x">×</span>
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
                                            <span className="icon-file-text">📄</span>
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
                                          <span className="icon-plus">+</span>
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
                                                <span className="icon-x">×</span>
                                              </button>
                                            </div>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="empty-documents">
                                          <span className="icon-file-text">📄</span>
                                          <p>No hay documentos agregados</p>
                                          <p className="empty-hint">Agrega documentos para complementar el ejercicio</p>
                                        </div>
                                      )}
                                    </div>

                                    {/* Code Editor Mejorado */}
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
                                          <span className="icon-code">💻</span>
                                          Incluir editor de código Python
                                        </label>
                                      </div>

                                      {exercise.hasCodeEditor && (
                                        <div className="code-editor-content">
                                          <div className="code-editor-grid">
                                            <div className="code-input-section">
                                              <label className="code-label">Código inicial (opcional)</label>
                                              <div className="code-editor-wrapper">
                                                <div className="code-editor-toolbar">
                                                  <span className="editor-title">Python</span>
                                                  <div className="editor-controls">
                                                    <button className="editor-btn" type="button">
                                                      <span>📋</span>
                                                    </button>
                                                    <button className="editor-btn" type="button">
                                                      <span>🔄</span>
                                                    </button>
                                                  </div>
                                                </div>
                                                <textarea
                                                  placeholder="# Código inicial para el estudiante..."
                                                  value={exercise.starterCode}
                                                  onChange={(e) => {
                                                    const updatedTopics = [...topics]
                                                    updatedTopics[currentTopicIndex].exercises[
                                                      exerciseIndex
                                                    ].starterCode = e.target.value
                                                    setTopics(updatedTopics)
                                                  }}
                                                  className="code-textarea starter-code"
                                                  rows="12"
                                                />
                                              </div>
                                            </div>

                                            <div className="code-output-section">
                                              <label className="code-label">Salida esperada (opcional)</label>
                                              <div className="code-editor-wrapper">
                                                <div className="code-editor-toolbar output">
                                                  <span className="editor-title">Salida esperada</span>
                                                  <div className="editor-controls">
                                                    <button className="editor-btn" type="button">
                                                      <span>👁️</span>
                                                    </button>
                                                  </div>
                                                </div>
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
                                                  className="code-textarea output-code"
                                                  rows="12"
                                                />
                                              </div>
                                            </div>
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
