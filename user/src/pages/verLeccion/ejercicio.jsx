"use client"

import { useState } from "react"
import "./ejercicio.css"

const Ejercicio = ({ exercise, isOpen, onClose }) => {
  const [userCode, setUserCode] = useState(exercise?.starterCode || "")

  if (!isOpen || !exercise) return null

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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="ejercicio-modal" onClick={handleOverlayClick}>
      <div className="ejercicio-content">
        <div className="ejercicio-header">
          <h2 className="ejercicio-title">{exercise.title}</h2>
          <button className="close-button" onClick={onClose}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="ejercicio-body">
          <div className="ejercicio-sections">
            {/* Exercise Description */}
            <div className="description-card">
              <h3 className="description-title">Descripción del Ejercicio</h3>
              <p className="description-text">{exercise.description}</p>
            </div>

            {/* Documents */}
            {exercise.documents && exercise.documents.length > 0 && (
              <div className="documents-card">
                <div className="documents-header">
                  <h3 className="documents-title">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Archivos de Apoyo
                  </h3>
                </div>
                <div className="documents-content">
                  <div className="documents-grid">
                    {exercise.documents.map((document) => (
                      <div key={document.id} className="document-item">
                        <div className="document-content">
                          <div className="document-icon">{renderDocumentIcon(document.type)}</div>
                          <div className="document-info">
                            <p className="document-name">{document.title}</p>
                            <p className="document-meta">
                              {document.type.toUpperCase()} · {document.size}
                            </p>
                          </div>
                          <button className="download-button">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Code Editor y Output - Rediseñado según la imagen */}
            <div className="code-section">
              {/* Editor de código - Lado izquierdo */}
              <div className="code-editor-card">
                <div className="code-editor-header">
                  <h3 className="code-editor-title">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 20L14 4M18 8L22 12L18 16M6 16L2 12L6 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Editor de Código Python
                  </h3>
                </div>
                <div className="code-editor-content">
                  <textarea
                    className="code-textarea"
                    value={userCode}
                    onChange={(e) => setUserCode(e.target.value)}
                    placeholder="Escribe tu código aquí..."
                  />
                  <div className="code-actions">
                    <button className="btn-run">Ejecutar</button>
                    <button className="btn-secondary">Reiniciar</button>
                    <button className="btn-secondary">Guardar</button>
                  </div>
                </div>
              </div>

              {/* Sección de salida - Lado derecho */}
              <div className="output-section">
                {/* Salida Esperada - Rediseñada según la imagen */}
                <div className="expected-output-card">
                  <div className="expected-output-header">
                    {/* Ícono de ojo grande como en la imagen */}
                    <svg
                      className="expected-output-icon"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                    </svg>
                  </div>
                  <h3 className="expected-output-title">Salida Esperada</h3>
                  <div className="expected-output-content">
                    <pre className="expected-output-pre">{exercise.expectedOutput}</pre>
                  </div>
                </div>

                {/* Consola - Rediseñada según la imagen */}
                <div className="console-card">
                  <div className="console-header">
                    <h3 className="console-title">Consola</h3>
                  </div>
                  <div className="console-content">
                    <div className="console-output">
                      <div className="console-placeholder">Ejecuta tu código para ver la salida...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ejercicio
