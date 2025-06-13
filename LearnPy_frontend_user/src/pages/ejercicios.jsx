"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Code, X } from "lucide-react"
import "./ejercicios.css"

// Componentes personalizados
const Button = ({ children, type = "button", className = "", variant = "default", onClick, disabled }) => {
  const getButtonClass = () => {
    if (variant === "destructive") return "btn btn-destructive"
    if (variant === "outline") return "btn btn-outline"
    return "btn"
  }

  return (
    <button type={type} className={`${getButtonClass()} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

const Input = ({ id, type = "text", value, onChange, className = "", placeholder }) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      className={`input ${className}`}
      placeholder={placeholder}
    />
  )
}

const Textarea = ({ id, value, onChange, className = "", placeholder, rows = 3 }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={onChange}
      className={`textarea ${className}`}
      placeholder={placeholder}
      rows={rows}
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

const Card = ({ children, className = "" }) => {
  return <div className={`card ${className}`}>{children}</div>
}

const CardContent = ({ children, className = "" }) => {
  return <div className={`card-content ${className}`}>{children}</div>
}

const Ejercicios = () => {




  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises]
    newExercises[index][field] = value
    setExercises(newExercises)
  }

  const addExercise = () => {
    setExercises([...exercises, { title: "", description: "", hasCode: false, expectedOutput: "", code: "" }])
  }

  const removeExercise = (index) => {
    if (exercises.length > 1) {
      const newExercises = [...exercises]
      newExercises.splice(index, 1)
      setExercises(newExercises)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="header green">
        <div className="container header-container">
          <h1 className="header-title">LearnPy</h1>
          <nav>
            <Link to="/" className="nav-link">
              Perfil
            </Link>
          </nav>
        </div>
      </header>

      <main className="container main">
        <div className="page-header">
          <h2 className="page-title">Ejemplo de Ejercicios</h2>
          <p className="page-description">Visualización de ejercicios para la lección</p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="card-title">Ejercicios</h3>

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
                      placeholder="Ej: Crear una función para calcular el factorial"
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor={`exercise-description-${index}`}>Descripción</Label>
                    <Textarea
                      id={`exercise-description-${index}`}
                      value={exercise.description}
                      onChange={(e) => handleExerciseChange(index, "description", e.target.value)}
                      placeholder="Instrucciones detalladas del ejercicio"
                    />
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
                            `# Ejemplo de código Python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# Prueba la función
numero = 5
resultado = factorial(numero)
print(f"El factorial de {numero} es {resultado}")
`
                          }
                          onChange={(e) => handleExerciseChange(index, "code", e.target.value)}
                        />
                      </div>
                      <div className="form-group mt-4">
                        <Label htmlFor={`exercise-expected-output-${index}`}>Salida esperada (opcional)</Label>
                        <Textarea
                          id={`exercise-expected-output-${index}`}
                          value={exercise.expectedOutput}
                          onChange={(e) => handleExerciseChange(index, "expectedOutput", e.target.value)}
                          placeholder="Ej: El factorial de 5 es 120"
                          className="font-mono"
                          rows={2}
                        />
                        <p className="hint-text">
                          Ingrese la salida esperada para verificar automáticamente las respuestas de los estudiantes
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
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

export default Ejercicios
