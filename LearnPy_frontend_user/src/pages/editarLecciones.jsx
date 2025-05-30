"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./editarLecciones.css"
import Navbar from "./components/navbar/navBar"
import { Bell, Code, FileText, ImageIcon, Link2, Plus, Upload, Video, X } from "lucide-react"

// Componentes personalizados para reemplazar los de shadcn/ui
const Button = ({ children, type = "button", className = "", variant = "default", onClick, disabled }) => {
  const getButtonClass = () => {
    if (variant === "destructive") return "btn btn-destructive"
    if (variant === "outline") return "btn btn-outline"
    if (className.includes("bg-green-600")) return "btn btn-green"
    if (className.includes("bg-blue-500")) return "btn btn-blue"
    return "btn"
  }

  return (
    <button type={type} className={`${getButtonClass()} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

const Input = ({ id, type = "text", value, onChange, className = "", placeholder, maxLength }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
      placeholder={placeholder}
      maxLength={maxLength}
    />
  )
}

const Textarea = ({ id, value, onChange, className = "", placeholder, rows = 3, maxLength }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      className={`textarea ${className}`}
      placeholder={placeholder}
      rows={rows}
      maxLength={maxLength}
    />
  )
}

const Label = ({ htmlFor, children, className = "" }) => {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`}>
      {children}
    </label>
  )
}

const Switch = ({ id, checked, onCheckedChange }) => {
  return (
    <div className="switch-container">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="switch-input"
      />
      <span className="switch-slider"></span>
    </div>
  )
}

const Tabs = ({ children, defaultValue, value, onValueChange, className = "" }) => {
  return <div className={`tabs ${className}`}>{children}</div>
}

const TabsList = ({ children, className = "" }) => {
  return <div className={`tabs-list ${className}`}>{children}</div>
}

const TabsTrigger = ({ value, className = "", onClick, children }) => {
  return (
    <button className={`tabs-trigger ${className}`} onClick={() => onClick && onClick(value)}>
      {children}
    </button>
  )
}

const TabsContent = ({ value, className = "", children }) => {
  return <div className={`tabs-content ${className}`}>{children}</div>
}

const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return (
    <div className="dialog-overlay" onClick={() => onOpenChange(false)}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

const DialogContent = ({ children }) => {
  return <div className="dialog-body">{children}</div>
}

const DialogHeader = ({ children }) => {
  return <div className="dialog-header">{children}</div>
}

const DialogTitle = ({ children, className = "" }) => {
  return <h2 className={`dialog-title ${className}`}>{children}</h2>
}

const DialogDescription = ({ children }) => {
  return <p className="dialog-description">{children}</p>
}

const DialogFooter = ({ children, className = "" }) => {
  return <div className={`dialog-footer ${className}`}>{children}</div>
}

const Card = ({ children, className = "" }) => {
  return <div className={`card ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`card-content ${className}`}>{children}</div>
}

const Select = ({ value, onValueChange, children }) => {
  return (
    <select value={value} onChange={(e) => onValueChange(e.target.value)} className="select">
      {children}
    </select>
  )
}

const SelectTrigger = ({ className = "", children }) => {
  return <div className={`select-trigger ${className}`}>{children}</div>
}

const SelectValue = ({ placeholder }) => {
  return <span className="select-value">{placeholder}</span>
}

const SelectContent = ({ children }) => {
  return <div className="select-content">{children}</div>
}

const SelectItem = ({ value, children }) => {
  return <option value={value}>{children}</option>
}

const EditarLecciones = () => {
  const navigate = useNavigate()
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
  const [activeTab, setActiveTab] = useState("contenido")
  const [formErrors, setFormErrors] = useState({})
  const [exercises, setExercises] = useState([
    {
      title: "",
      description: "",
      hasCode: false,
      expectedOutput: "",
      code: `# Ejemplo de código Python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# Prueba la función
numero = 5
resultado = factorial(numero)
print(f"El factorial de {numero} es {resultado}")
`,
    },
  ])

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
        if (event.target) {
          setCoverImage(event.target.result)
        }
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

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises]
    newExercises[index][field] = value
    setExercises(newExercises)
  }

  const addExercise = () => {
    setExercises([...exercises, { title: "", description: "", hasCode: false, expectedOutput: "" }])
  }

  const removeExercise = (index) => {
    if (exercises.length > 1) {
      const newExercises = [...exercises]
      newExercises.splice(index, 1)
      setExercises(newExercises)
    }
  }

  const validateForm = () => {
    const errors = {}

    if (!title) errors.title = true
    if (!description) errors.description = true
    if (!difficulty) errors.difficulty = true
    if (!visibility) errors.visibility = true
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="header">
        <div className="container header-container">
          <Navbar />
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
              <img src="/placeholder.svg?height=32&width=32" alt="Perfil" />
            </div>
          </div>
        </div>
      </header>

      <main className="container main">
        <div className="page-header">
          <h2 className="page-title">Crear Nueva Lección</h2>
          <p className="page-description">
            Complete todos los campos requeridos para crear una nueva lección de Python
          </p>
        </div>

        <div className="content-card">
          <div className="content-wrapper">
            <div className="content-container">
              <div className="tabs">
                <div className="tabs-list">
                  <button
                    className={`tabs-trigger ${activeTab === "contenido" ? "active" : ""}`}
                    onClick={() => setActiveTab("contenido")}
                  >
                    Contenido de la lección
                  </button>
                  <button
                    className={`tabs-trigger ${activeTab === "ejercicios" ? "active" : ""}`}
                    onClick={() => setActiveTab("ejercicios")}
                  >
                    Ejercicios
                  </button>
                </div>

                {activeTab === "contenido" && (
                  <div className="tabs-content">
                    <div className="content-section">
                      <h3 className="section-title">Contenido de la lección</h3>

                      <div className="grid-2">
                        <div className="form-group-container">
                          <div className="form-group">
                            <Label htmlFor="title" className="required">
                              Título <span className="required-mark">*</span>
                            </Label>
                            <Input
                              id="title"
                              value={title}
                              onChange={handleTitleChange}
                              maxLength={60}
                              className={formErrors.title ? "error" : ""}
                              placeholder="Ej: Introducción a las funciones en Python"
                            />
                            {formErrors.title && <p className="error-message">Este campo es obligatorio</p>}
                          </div>

                          <div className="form-group">
                            <Label htmlFor="description" className="required">
                              Descripción <span className="required-mark">*</span>
                            </Label>
                            <Textarea
                              id="description"
                              value={description}
                              onChange={handleDescriptionChange}
                              maxLength={150}
                              className={formErrors.description ? "error" : ""}
                              placeholder="Ingrese una descripción"
                              rows={5}
                            />
                            {formErrors.description && <p className="error-message">Este campo es obligatorio</p>}
                          </div>

                          <div className="grid-2 gap-4">
                            <div>
                              <Label className="form-label required">
                                Visibilidad <span className="required-mark">*</span>
                              </Label>
                              <div className="button-group">
                                <button
                                  type="button"
                                  onClick={() => setVisibility("borrador")}
                                  className={`btn-small ${visibility === "borrador" ? "active" : ""}`}
                                >
                                  Borrador
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setVisibility("publico")}
                                  className={`btn-small ${visibility === "publico" ? "active" : ""}`}
                                >
                                  Público
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setVisibility("privado")}
                                  className={`btn-small ${visibility === "privado" ? "active" : ""}`}
                                >
                                  Privado
                                </button>
                              </div>
                              {formErrors.visibility && <p className="error-message">Este campo es obligatorio</p>}
                            </div>

                            <div>
                              <Label className="form-label required">
                                Nivel <span className="required-mark">*</span>
                              </Label>
                              <div className="button-group">
                                <button
                                  type="button"
                                  onClick={() => setDifficulty("principiante")}
                                  className={`btn-small ${difficulty === "principiante" ? "active" : ""}`}
                                >
                                  Principiante
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDifficulty("intermedio")}
                                  className={`btn-small ${difficulty === "intermedio" ? "active" : ""}`}
                                >
                                  Intermedio
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDifficulty("avanzado")}
                                  className={`btn-small ${difficulty === "avanzado" ? "active" : ""}`}
                                >
                                  Avanzado
                                </button>
                              </div>
                              {formErrors.difficulty && <p className="error-message">Este campo es obligatorio</p>}
                            </div>
                          </div>
                        </div>

                        <div className="form-group-container">
                          <div className="form-group">
                            <Label className="form-label">Imagen de la Portada</Label>
                            <div className={`dropzone ${formErrors.coverImage ? "error" : ""}`}>
                              {coverImage ? (
                                <div className="image-preview">
                                  <img
                                    src={coverImage || "/placeholder.svg"}
                                    alt="Vista previa"
                                    className="preview-image"
                                  />
                                  <button onClick={() => setCoverImage(null)} className="remove-button">
                                    <X className="icon-small" />
                                  </button>
                                </div>
                              ) : (
                                <div className="upload-placeholder">
                                  <div className="upload-icon">
                                    <ImageIcon className="icon" />
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
                            <Button
                              type="button"
                              className="btn-blue icon-button"
                              onClick={() => document.getElementById("coverImage")?.click()}
                              aria-label="Subir imagen de portada"
                            >
                              <Upload className="icon-small" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="section-container">
                        <div className="card">
                          <div className="card-content">
                            <h3 className="card-title">Material de Estudio</h3>
                            <div className="grid-2">
                              <div>
                                <Label htmlFor="attachments">Archivos adjuntos (Word, PDF, PowerPoint)</Label>
                                <div className="dropzone">
                                  <FileText className="icon" />
                                  <p className="dropzone-text">Haga clic para subir o arrastre archivos aquí</p>
                                  <p className="dropzone-hint">DOC, DOCX, PDF, PPT, PPTX hasta 10MB</p>
                                  <input
                                    id="attachments"
                                    type="file"
                                    accept=".doc,.docx,.pdf,.ppt,.pptx"
                                    onChange={handleAttachmentUpload}
                                    className="hidden-input"
                                    multiple
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById("attachments")?.click()}
                                  className="full-width"
                                >
                                  Seleccionar archivos
                                </Button>

                                {attachments.length > 0 && (
                                  <div className="file-list">
                                    <Label>Archivos seleccionados:</Label>
                                    {attachments.map((file, index) => (
                                      <div key={index} className="file-item">
                                        <div className="file-item-name">
                                          <FileText className="icon-small" />
                                          <span className="file-name">{file.name}</span>
                                        </div>
                                        <button onClick={() => removeAttachment(index)} className="remove-file-button">
                                          <X className="icon-small" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div>
                                <Label htmlFor="multimedia">Contenido multimedia (imágenes, videos)</Label>
                                <div className="dropzone">
                                  <Upload className="icon" />
                                  <p className="dropzone-text">
                                    Haga clic para subir o arrastre archivos multimedia aquí
                                  </p>
                                  <p className="dropzone-hint">JPG, PNG, GIF, MP4 hasta 20MB</p>
                                  <input
                                    id="multimedia"
                                    type="file"
                                    accept="image/*,video/*"
                                    onChange={handleMultimediaUpload}
                                    className="hidden-input"
                                    multiple
                                  />
                                </div>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => document.getElementById("multimedia")?.click()}
                                  className="full-width"
                                >
                                  Seleccionar multimedia
                                </Button>

                                {multimedia.length > 0 && (
                                  <div className="media-preview">
                                    <Label>Vista previa:</Label>
                                    <div className="media-gallery">
                                      {multimedia.map((file, index) => (
                                        <div key={index} className="media-item">
                                          {file.type.startsWith("image/") ? (
                                            <img
                                              src={file.preview || "/placeholder.svg"}
                                              alt={file.name}
                                              className="media-image"
                                            />
                                          ) : file.type.startsWith("video/") ? (
                                            <video src={file.preview} className="video-player" controls />
                                          ) : (
                                            <div className="video-placeholder">
                                              <Video className="icon" />
                                            </div>
                                          )}
                                          <button
                                            onClick={() => removeMultimedia(index)}
                                            className="remove-media-button"
                                          >
                                            <X className="icon-small" />
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
                              <Label>Enlaces</Label>
                              <div className="links-form">
                                <div className="links-input-group">
                                  <div className="link-url-input">
                                    <Input
                                      placeholder="URL (ej: https://ejemplo.com)"
                                      value={newLinkUrl}
                                      onChange={(e) => setNewLinkUrl(e.target.value)}
                                    />
                                  </div>
                                  <div className="link-description-input">
                                    <Input
                                      placeholder="Descripción del enlace"
                                      value={newLinkDescription}
                                      onChange={(e) => setNewLinkDescription(e.target.value)}
                                    />
                                  </div>
                                  <div className="link-add-button">
                                    <Button
                                      type="button"
                                      onClick={addLink}
                                      className="btn-blue full-width"
                                      disabled={!newLinkUrl.trim()}
                                    >
                                      <Plus className="icon-small" /> Agregar enlace
                                    </Button>
                                  </div>
                                </div>

                                {links.length > 0 && (
                                  <div className="links-list">
                                    <Label>Enlaces agregados:</Label>
                                    {links.map((link, index) => (
                                      <div key={index} className="link-item">
                                        <div className="link-content">
                                          <Link2 className="icon-small link-icon" />
                                          <div className="link-info">
                                            <p className="link-description">{link.description || "Sin descripción"}</p>
                                            <p className="link-url">{link.url}</p>
                                          </div>
                                        </div>
                                        <button onClick={() => removeLink(index)} className="remove-link-button">
                                          <X className="icon-small" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "ejercicios" && (
                  <div className="tabs-content">
                    <div className="content-section">
                      <h3 className="section-title">Ejercicios</h3>

                      {formErrors.exercises && (
                        <div className="error-alert">Todos los ejercicios deben tener título y descripción</div>
                      )}

                      {exercises.map((exercise, index) => (
                        <div key={index} className="activity-card">
                          <div className="activity-header">
                            <h4 className="activity-name">Ejercicio {index + 1}</h4>
                            <button
                              onClick={() => removeExercise(index)}
                              className="remove-activity-button"
                              disabled={exercises.length === 1}
                            >
                              <X className="icon-small" />
                            </button>
                          </div>

                          <div className="activity-form">
                            <div className="form-group">
                              <Label htmlFor={`exercise-title-${index}`}>Título</Label>
                              <Input
                                id={`exercise-title-${index}`}
                                value={exercise.title}
                                onChange={(e) => handleExerciseChange(index, "title", e.target.value)}
                                className={!exercise.title && formErrors.exercises ? "error" : ""}
                                placeholder="Ej: Crear una función para calcular el factorial"
                              />
                              {!exercise.title && formErrors.exercises && (
                                <p className="error-message">Este campo es obligatorio</p>
                              )}
                            </div>

                            <div className="form-group">
                              <Label htmlFor={`exercise-description-${index}`}>Descripción</Label>
                              <Textarea
                                id={`exercise-description-${index}`}
                                value={exercise.description}
                                onChange={(e) => handleExerciseChange(index, "description", e.target.value)}
                                className={!exercise.description && formErrors.exercises ? "error" : ""}
                                placeholder="Instrucciones detalladas del ejercicio"
                              />
                              {!exercise.description && formErrors.exercises && (
                                <p className="error-message">Este campo es obligatorio</p>
                              )}
                            </div>

                            <div className="code-switch-container">
                              <input
                                id={`exercise-code-${index}`}
                                type="checkbox"
                                checked={exercise.hasCode}
                                onChange={(e) => handleExerciseChange(index, "hasCode", e.target.checked)}
                                className="switch-input"
                              />
                              <Label htmlFor={`exercise-code-${index}`} className="code-switch-label">
                                Incluir editor de código Python
                              </Label>
                            </div>

                            {exercise.hasCode && (
                              <div className="code-editor">
                                <div className="code-header">
                                  <Code className="code-icon" />
                                  <span className="code-title">Editor de código Python</span>
                                </div>
                                <div className="code-content">
                                  <textarea
                                    className="code-editor-textarea"
                                    value={
                                      exercise.code ||
                                      `# 
`
                                    }
                                    onChange={(e) => handleExerciseChange(index, "code", e.target.value)}
                                  />
                                </div>
                                <div className="form-group mt-4">
                                  <Label htmlFor={`exercise-expected-output-${index}`}>
                                    Salida esperada (opcional)
                                  </Label>
                                  <Textarea
                                    id={`exercise-expected-output-${index}`}
                                    value={exercise.expectedOutput}
                                    onChange={(e) => handleExerciseChange(index, "expectedOutput", e.target.value)}
                                    placeholder="Ej: El factorial de 5 es 120"
                                    className="font-mono"
                                    rows={2}
                                  />
                                  <p className="hint-text">
                                    Ingrese la salida esperada para verificar automáticamente las respuestas de los
                                    estudiantes
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}

                      <Button type="button" variant="outline" onClick={addExercise} className="add-activity-button">
                        Agregar otro ejercicio
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <Button type="button" variant="destructive" onClick={() => setShowCancelDialog(true)}>
            Cancelar
          </Button>
          <Button type="button" className="btn-green" onClick={handleSave}>
            Publicar Lección
          </Button>
        </div>
      </main>

      {/* Diálogo de confirmación para cancelar */}
      {showCancelDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <div className="dialog-header">
              <h2 className="dialog-title error-title">Confirmar cancelación</h2>
              <p className="dialog-description">
                ¿Estás seguro de cancelar esta acción? Esta acción eliminará todos los datos ingresados.
              </p>
            </div>
            <div className="dialog-footer">
              <Button type="button" variant="outline" onClick={() => setShowCancelDialog(false)}>
                Volver
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  setShowCancelDialog(false)
                  navigate("/")
                }}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Diálogo de éxito */}
      {showSuccessDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content success-dialog">
            <div className="dialog-header">
              <h2 className="dialog-title success-title">¡Operación exitosa!</h2>
              <p className="dialog-description">¡Lección creada exitosamente!</p>
            </div>
            <div className="dialog-footer">
              <Button
                type="button"
                className="btn-green full-width"
                onClick={() => {
                  setShowSuccessDialog(false)
                  navigate("/")
                }}
              >
                Volver a la lista de lecciones
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditarLecciones
