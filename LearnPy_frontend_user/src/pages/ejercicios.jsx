"use client"
import "./ejercicios.css"

const Ejercicios = ({ exercises, setExercises, formErrors }) => {
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

  return (
    <div className="ejercicios-tab">
      <h3 className="content-title">Ejercicios</h3>

      {formErrors.exercises && (
        <div className="error-banner">
          <i className="warning-icon"></i>
          <p>Todos los ejercicios deben tener título y descripción</p>
        </div>
      )}

      <div className="ejercicios-list">
        {exercises.map((exercise, index) => (
          <div key={index} className="ejercicio-card">
            <div className="ejercicio-header">
              <h4 className="ejercicio-title">Ejercicio {index + 1}</h4>
              <button
                className="remove-ejercicio-btn"
                onClick={() => removeExercise(index)}
                disabled={exercises.length === 1}
              >
                <span className="close-icon-small"></span>
              </button>
            </div>

            <div className="ejercicio-form">
              <div className="form-group">
                <label htmlFor={`exercise-title-${index}`} className="form-label">
                  Título <span className="required">*</span>
                </label>
                <input
                  id={`exercise-title-${index}`}
                  type="text"
                  value={exercise.title}
                  onChange={(e) => handleExerciseChange(index, "title", e.target.value)}
                  className={`form-input ${!exercise.title && formErrors.exercises ? "error" : ""}`}
                  placeholder="Ej: Crear una función para calcular el factorial"
                />
              </div>

              <div className="form-group">
                <label htmlFor={`exercise-description-${index}`} className="form-label">
                  Descripción <span className="required">*</span>
                </label>
                <textarea
                  id={`exercise-description-${index}`}
                  value={exercise.description}
                  onChange={(e) => handleExerciseChange(index, "description", e.target.value)}
                  className={`form-textarea ${!exercise.description && formErrors.exercises ? "error" : ""}`}
                  placeholder="Instrucciones detalladas del ejercicio"
                  rows={4}
                ></textarea>
              </div>

              <div className="code-toggle">
                <label className="toggle-container">
                  <input
                    type="checkbox"
                    checked={exercise.hasCode}
                    onChange={(e) => handleExerciseChange(index, "hasCode", e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
                <span className="toggle-label">Incluir editor de código Python</span>
              </div>

              {exercise.hasCode && (
                <div className="code-section">
                  <div className="code-editor">
                    <div className="code-header">
                      <i className="code-icon"></i>
                      <span>Editor de código Python</span>
                    </div>
                    <div className="code-area">
                      <pre>{`# Ejemplo de código Python
def factorial(n):
    if n == 0 or n == 1:
        return 1
    else:
        return n * factorial(n-1)

# Prueba la función
numero = 5
resultado = factorial(numero)
print(f"El factorial de {numero} es {resultado}")
`}</pre>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor={`exercise-expected-output-${index}`} className="form-label">
                      Salida esperada (opcional)
                    </label>
                    <textarea
                      id={`exercise-expected-output-${index}`}
                      value={exercise.expectedOutput}
                      onChange={(e) => handleExerciseChange(index, "expectedOutput", e.target.value)}
                      className="form-textarea code-output"
                      placeholder="Ej: El factorial de 5 es 120"
                    ></textarea>
                    <p className="help-text">
                      Ingrese la salida esperada para verificar automáticamente las respuestas de los estudiantes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button type="button" className="add-ejercicio-btn" onClick={addExercise}>
        <i className="plus-icon"></i> Agregar otro ejercicio
      </button>
    </div>
  )
}

export default Ejercicios
