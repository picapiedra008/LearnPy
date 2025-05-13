"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Ejercicios from "./ejercicios"
import "./crearLecciones.css"

const CrearLecciones = () => {
  const [activeTab, setActiveTab] = useState("contenido")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [coverImage, setCoverImage] = useState(null)
  const [difficulty, setDifficulty] = useState("principiante")
  const [visibility, setVisibility] = useState("borrador")
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [attachments, setAttachments] = useState([])
  const [multimedia, setMultimedia] = useState([])
  const [links, setLinks] = useState([])
  const [newLinkUrl, setNewLinkUrl] = useState("")
  const [newLinkDescription, setNewLinkDescription] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [exercises, setExercises] = useState([{ title: "", description: "", hasCode: false, expectedOutput: "" }])

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleCoverImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImage(event.target.result)
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleAttachmentUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        type: file.type,
      }))
      setAttachments([...attachments, ...newFiles])
    }
  }

  const handleMultimediaUpload = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map((file) => {
        const preview = URL.createObjectURL(file)
        return {
          name: file.name,
          type: file.type,
          preview,
        }
      })
      setMultimedia([...multimedia, ...newFiles])
    }
  }

  const removeAttachment = (index) => {
    const newAttachments = [...attachments]
    newAttachments.splice(index, 1)
    setAttachments(newAttachments)
  }

  const removeMultimedia = (index) => {
    const newMultimedia = [...multimedia]
    newMultimedia.splice(index, 1)
    setMultimedia(newMultimedia)
  }

  const addLink = () => {
    if (newLinkUrl.trim()) {
      setLinks([...links, { url: newLinkUrl, description: newLinkDescription }])
      setNewLinkUrl("")
      setNewLinkDescription("")
    }
  }

  const removeLink = (index) => {
    const newLinks = [...links]
    newLinks.splice(index, 1)
    setLinks(newLinks)
  }

  const validateForm = () => {
    const errors = {}

    if (!title) errors.title = true
    if (!description) errors.description = true
    if (!coverImage) errors.coverImage = true
    if (exercises.some((ex) => !ex.title || !ex.description)) errors.exercises = true

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSave = () => {
    if (validateForm()) {
      // Aquí iría la lógica para guardar la lección
      setShowSuccessDialog(true)
    }
  }

  return (
    <div className="learnpy-container">
      <header className="learnpy-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">LP</div>
            <nav className="header-nav">
              <Link to="/" className="nav-link active">
                Mis Lecciones
              </Link>
              <Link to="#" className="nav-link">
                Otros
              </Link>
            </nav>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <i className="bell-icon"></i>
              <span className="notification-badge"></span>
            </button>
            <div className="profile-avatar">
              <img src="/placeholder.svg?height=32&width=32" alt="Perfil" />
            </div>
          </div>
        </div>
      </header>

      <main className="learnpy-main">
        <div className="page-title">
          <h2>Crear Nueva Lección</h2>
          <p>Complete todos los campos requeridos para crear una nueva lección de Python</p>
        </div>

        <div className="content-container">
          <div className="tabs-container">
            <div className="tabs-header">
              <button
                className={`tab-btn ${activeTab === "contenido" ? "active" : ""}`}
                onClick={() => setActiveTab("contenido")}
              >
                Contenido de la lección
              </button>
              <button
                className={`tab-btn ${activeTab === "ejercicios" ? "active" : ""}`}
                onClick={() => setActiveTab("ejercicios")}
              >
                Ejercicios
              </button>
            </div>

            {activeTab === "contenido" && (
              <div className="tab-content">
                <h3 className="content-title">Contenido de la lección</h3>

                <div className="content-grid">
                  <div className="content-column">
                    <div className="form-group">
                      <label htmlFor="title" className="form-label">
                        Título <span className="required">*</span>
                      </label>
                      <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        maxLength={60}
                        className={`form-input ${formErrors.title ? "error" : ""}`}
                        placeholder="Ej: Introducción a las funciones en Python"
                      />
                      {formErrors.title && <p className="error-message">Este campo es obligatorio</p>}
                      <p className="char-count">{title.length}/60 caracteres</p>
                    </div>

                    <div className="form-group">
                      <label htmlFor="description" className="form-label">
                        Descripción <span className="required">*</span>
                      </label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        maxLength={150}
                        className={`form-textarea ${formErrors.description ? "error" : ""}`}
                        placeholder="Ingrese una descripción"
                        rows={5}
                      ></textarea>
                      {formErrors.description && <p className="error-message">Este campo es obligatorio</p>}
                      <p className="char-count">{description.length}/150 caracteres</p>
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label className="form-label">
                          Visibilidad <span className="required">*</span>
                        </label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setVisibility("borrador")}
                            className={`option-btn ${visibility === "borrador" ? "active" : ""}`}
                          >
                            Borrador
                          </button>
                          <button
                            type="button"
                            onClick={() => setVisibility("publico")}
                            className={`option-btn ${visibility === "publico" ? "active" : ""}`}
                          >
                            Público
                          </button>
                          <button
                            type="button"
                            onClick={() => setVisibility("privado")}
                            className={`option-btn ${visibility === "privado" ? "active" : ""}`}
                          >
                            Privado
                          </button>
                        </div>
                      </div>

                      <div className="form-group half">
                        <label className="form-label">Nivel</label>
                        <div className="button-group">
                          <button
                            type="button"
                            onClick={() => setDifficulty("principiante")}
                            className={`option-btn ${difficulty === "principiante" ? "active" : ""}`}
                          >
                            Principiante
                          </button>
                          <button
                            type="button"
                            onClick={() => setDifficulty("intermedio")}
                            className={`option-btn ${difficulty === "intermedio" ? "active" : ""}`}
                          >
                            Intermedio
                          </button>
                          <button
                            type="button"
                            onClick={() => setDifficulty("avanzado")}
                            className={`option-btn ${difficulty === "avanzado" ? "active" : ""}`}
                          >
                            Avanzado
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="content-column">
                    <div className="form-group">
                      <label className="form-label">Imagen de la Portada</label>
                      <div className={`image-upload-container ${formErrors.coverImage ? "error" : ""}`}>
                        {coverImage ? (
                          <div className="image-preview">
                            <img src={coverImage || "/placeholder.svg?height=200&width=300"} alt="Vista previa" />
                            <button className="remove-image-btn" onClick={() => setCoverImage(null)}>
                              <span className="close-icon"></span>
                            </button>
                          </div>
                        ) : (
                          <div className="upload-placeholder">
                            <div className="placeholder-icon">
                              <i className="image-icon"></i>
                            </div>
                          </div>
                        )}
                        <input
                          id="coverImage"
                          type="file"
                          accept="image/*"
                          onChange={handleCoverImageUpload}
                          className="hidden-input"
                        />
                      </div>
                      {formErrors.coverImage && <p className="error-message">Este campo es obligatorio</p>}
                      <button
                        type="button"
                        className="upload-btn"
                        onClick={() => document.getElementById("coverImage").click()}
                      >
                        Subir una imagen
                      </button>
                    </div>
                  </div>
                </div>

                <div className="material-section">
                  <h3 className="section-title">Material de Estudio</h3>
                  <div className="material-grid">
                    <div className="material-column">
                      <label className="form-label">Archivos adjuntos (Word, PDF, PowerPoint)</label>
                      <div className="upload-container">
                        <div className="upload-area">
                          <i className="file-icon"></i>
                          <p>Haga clic para subir o arrastre archivos aquí</p>
                          <span>DOC, DOCX, PDF, PPT, PPTX hasta 10MB</span>
                          <input
                            id="attachments"
                            type="file"
                            accept=".doc,.docx,.pdf,.ppt,.pptx"
                            onChange={handleAttachmentUpload}
                            className="hidden-input"
                            multiple
                          />
                        </div>
                        <button
                          type="button"
                          className="secondary-btn"
                          onClick={() => document.getElementById("attachments").click()}
                        >
                          Seleccionar archivos
                        </button>
                      </div>

                      {attachments.length > 0 && (
                        <div className="file-list">
                          <label className="form-label">Archivos seleccionados:</label>
                          {attachments.map((file, index) => (
                            <div key={index} className="file-item">
                              <div className="file-info">
                                <i className="file-icon-small"></i>
                                <span className="file-name">{file.name}</span>
                              </div>
                              <button className="remove-file-btn" onClick={() => removeAttachment(index)}>
                                <span className="close-icon-small"></span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="material-column">
                      <label className="form-label">Contenido multimedia (imágenes, videos)</label>
                      <div className="upload-container">
                        <div className="upload-area">
                          <i className="upload-icon"></i>
                          <p>Haga clic para subir o arrastre archivos multimedia aquí</p>
                          <span>JPG, PNG, GIF, MP4 hasta 20MB</span>
                          <input
                            id="multimedia"
                            type="file"
                            accept="image/*,video/*"
                            onChange={handleMultimediaUpload}
                            className="hidden-input"
                            multiple
                          />
                        </div>
                        <button
                          type="button"
                          className="secondary-btn"
                          onClick={() => document.getElementById("multimedia").click()}
                        >
                          Seleccionar multimedia
                        </button>
                      </div>

                      {multimedia.length > 0 && (
                        <div className="media-preview">
                          <label className="form-label">Vista previa:</label>
                          <div className="media-grid">
                            {multimedia.map((file, index) => (
                              <div key={index} className="media-item">
                                {file.type.startsWith("image/") ? (
                                  <img
                                    src={file.preview || "/placeholder.svg?height=100&width=100"}
                                    alt={file.name}
                                    className="media-thumbnail"
                                  />
                                ) : (
                                  <div className="video-thumbnail">
                                    <i className="video-icon"></i>
                                  </div>
                                )}
                                <button className="remove-media-btn" onClick={() => removeMultimedia(index)}>
                                  <span className="close-icon-small"></span>
                                </button>
                                <p className="media-name">{file.name}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="links-section">
                    <label className="form-label">Enlaces</label>
                    <div className="links-form">
                      <div className="links-inputs">
                        <input
                          type="text"
                          placeholder="URL (ej: https://ejemplo.com)"
                          value={newLinkUrl}
                          onChange={(e) => setNewLinkUrl(e.target.value)}
                          className="form-input"
                        />
                        <input
                          type="text"
                          placeholder="Descripción del enlace"
                          value={newLinkDescription}
                          onChange={(e) => setNewLinkDescription(e.target.value)}
                          className="form-input"
                        />
                        <button type="button" onClick={addLink} className="add-link-btn" disabled={!newLinkUrl.trim()}>
                          <i className="plus-icon"></i> Agregar enlace
                        </button>
                      </div>

                      {links.length > 0 && (
                        <div className="links-list">
                          <label className="form-label">Enlaces agregados:</label>
                          {links.map((link, index) => (
                            <div key={index} className="link-item">
                              <div className="link-info">
                                <i className="link-icon"></i>
                                <div className="link-details">
                                  <p className="link-description">{link.description || "Sin descripción"}</p>
                                  <p className="link-url">{link.url}</p>
                                </div>
                              </div>
                              <button className="remove-link-btn" onClick={() => removeLink(index)}>
                                <span className="close-icon-small"></span>
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "ejercicios" && (
              <Ejercicios exercises={exercises} setExercises={setExercises} formErrors={formErrors} />
            )}
          </div>

          <div className="action-buttons">
            <button type="button" className="cancel-btn" onClick={() => setShowCancelDialog(true)}>
              Cancelar
            </button>
            <button type="button" className="publish-btn" onClick={handleSave}>
              Publicar Lección
            </button>
          </div>
        </div>
      </main>

      {showCancelDialog && (
        <div className="dialog-overlay">
          <div className="dialog-container">
            <div className="dialog-header">
              <h3>Confirmar cancelación</h3>
            </div>
            <div className="dialog-content">
              <p>¿Estás seguro de cancelar esta acción? Esta acción eliminará todos los datos ingresados.</p>
            </div>
            <div className="dialog-footer">
              <button type="button" className="secondary-btn" onClick={() => setShowCancelDialog(false)}>
                Cancelar
              </button>
              <button
                type="button"
                className="danger-btn"
                onClick={() => {
                  setShowCancelDialog(false)
                  window.location.href = "/"
                }}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-container">
            <div className="dialog-header">
              <h3>¡Operación exitosa!</h3>
            </div>
            <div className="dialog-content">
              <p>¡Lección creada exitosamente!</p>
            </div>
            <div className="dialog-footer">
              <button
                type="button"
                className="success-btn"
                onClick={() => {
                  setShowSuccessDialog(false)
                  window.location.href = "/"
                }}
              >
                Volver a la lista de lecciones
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CrearLecciones
