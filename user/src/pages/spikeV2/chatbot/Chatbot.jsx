"use client"

import { useState, useEffect } from "react"
import { X, Send, Bot, User, Zap, AlertCircle, RefreshCw, Code, BookOpen, Lightbulb } from "lucide-react"
import "./Chatbot.css"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [debugInfo, setDebugInfo] = useState("")
  const [currentSuggestionSet, setCurrentSuggestionSet] = useState(0)

  // Sugerencias rotativas organizadas por categorías
  const suggestionSets = [
    {
      category: "Fundamentos",
      icon: <BookOpen size={12} />,
      suggestions: [
        "¿Cómo declaro variables en Python?",
        "¿Qué son los tipos de datos básicos?",
        "Explícame la sintaxis básica de Python",
      ],
    },
    {
      category: "Estructuras de Control",
      icon: <Code size={12} />,
      suggestions: ["¿Cómo funcionan los bucles for?", "¿Cuándo usar if, elif y else?", "Explícame los bucles while"],
    },
    {
      category: "Estructuras de Datos",
      icon: <Zap size={12} />,
      suggestions: [
        "¿Qué diferencia hay entre listas y tuplas?",
        "¿Cómo usar diccionarios en Python?",
        "Explícame los conjuntos (sets)",
      ],
    },
    {
      category: "Funciones",
      icon: <Lightbulb size={12} />,
      suggestions: [
        "¿Cómo crear funciones en Python?",
        "¿Qué son los parámetros y argumentos?",
        "Explícame las funciones lambda",
      ],
    },
    {
      category: "Programación Orientada a Objetos",
      icon: <Bot size={12} />,
      suggestions: [
        "¿Qué son las clases y objetos?",
        "¿Cómo funciona la herencia?",
        "Explícame los métodos especiales",
      ],
    },
    {
      category: "Manejo de Errores",
      icon: <AlertCircle size={12} />,
      suggestions: [
        "¿Cómo usar try y except?",
        "¿Qué tipos de excepciones existen?",
        "¿Cómo crear excepciones personalizadas?",
      ],
    },
  ]

  // Rotar sugerencias cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestionSet((prev) => (prev + 1) % suggestionSets.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Debug al montar
  useEffect(() => {
    console.log("🔧 Chatbot LearnPy iniciado")
    handleTestConnection()
  }, [])

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)
    setDebugInfo("Procesando tu consulta...")

    try {
      console.log("📤 Enviando consulta:", userMessage.content)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 45000)

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        const errorText = await response.text()
        let errorData
        try {
          errorData = JSON.parse(errorText)
        } catch {
          errorData = { error: errorText }
        }
        throw new Error(errorData.error || `Error ${response.status}`)
      }

      const responseText = await response.text()
      const assistantMessage = JSON.parse(responseText)

      setMessages((prev) => [...prev, assistantMessage])
      setDebugInfo("✅ Respuesta generada exitosamente")
      setError(null)
    } catch (err) {
      console.error("💥 Error en consulta:", err)

      if (err.name === "AbortError") {
        setError(new Error("La consulta tardó demasiado tiempo"))
        setDebugInfo("❌ Tiempo de espera agotado")
      } else {
        setError(err)
        setDebugInfo(`❌ Error: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleTestConnection = async () => {
    setDebugInfo("Verificando sistema...")
    try {
      const response = await fetch("/api/test")
      if (response.ok) {
        const data = await response.json()
        setDebugInfo("✅ Sistema LearnPy operativo")
        console.log("🔗 Sistema conectado:", data)
      } else {
        setDebugInfo("❌ Sistema no disponible")
      }
    } catch (err) {
      setDebugInfo(`❌ Error de sistema: ${err.message}`)
      console.error("🔗 Error de conexión:", err)
    }
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
    setDebugInfo("")
  }

  const retryLastMessage = () => {
    if (messages.length > 0) {
      const lastUserMessage = [...messages].reverse().find((msg) => msg.role === "user")
      if (lastUserMessage) {
        setInput(lastUserMessage.content)
        setError(null)
      }
    }
  }

  const currentSet = suggestionSets[currentSuggestionSet]

  return (
    <>
      {/* Floating Chat Button */}
      <button onClick={() => setIsOpen(true)} className={`chatbot-floating-button ${isOpen ? "hidden" : ""}`}>
        <div className="floating-robot">
          <div className="robot-body">
            <div className="robot-eye robot-eye-left"></div>
            <div className="robot-eye robot-eye-right"></div>
            <div className="robot-mouth"></div>
          </div>
          <div className="robot-pulse"></div>
        </div>
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="chatbot-modal-overlay" onClick={() => setIsOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} className="chatbot-modal">
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="chatbot-header-avatar">
                  <div className="animated-robot">
                    <div className="robot-head">
                      <div className="robot-eye robot-eye-left"></div>
                      <div className="robot-eye robot-eye-right"></div>
                      <div className="robot-antenna"></div>
                    </div>
                    <div className="robot-body-small">
                      <div className="robot-chest"></div>
                    </div>
                  </div>
                </div>
                <div className="chatbot-header-text">
                  <h3>Asistente LearnPy</h3>
                  <div className="chatbot-header-subtitle">
                    <Code size={12} />
                    <span>Tu mentor de Python interactivo</span>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={clearChat} className="chatbot-close-button" title="Nueva conversación">
                  🔄
                </button>
                <button onClick={() => setIsOpen(false)} className="chatbot-close-button">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="chatbot-messages">
              {error && (
                <div className="chatbot-error">
                  <div className="chatbot-error-header">
                    <AlertCircle size={16} />
                    <div>Error en la consulta</div>
                  </div>
                  <div className="chatbot-error-message">{error.message || "No se pudo procesar tu consulta."}</div>
                  <div className="chatbot-error-tip">
                    💡 Tip: Intenta reformular tu pregunta o usar términos más específicos
                  </div>
                  {debugInfo && <div className="chatbot-error-tip">🔧 Estado: {debugInfo}</div>}
                  <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                    <button
                      onClick={handleTestConnection}
                      style={{
                        padding: "4px 8px",
                        background: "#dc2626",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Verificar Sistema
                    </button>
                    <button
                      onClick={retryLastMessage}
                      style={{
                        padding: "4px 8px",
                        background: "#059669",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <RefreshCw size={12} style={{ marginRight: "4px" }} />
                      Reintentar
                    </button>
                    <button
                      onClick={clearChat}
                      style={{
                        padding: "4px 8px",
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "12px",
                        cursor: "pointer",
                      }}
                    >
                      Nueva Consulta
                    </button>
                  </div>
                </div>
              )}

              {messages.length === 0 && !error && (
                <div className="chatbot-welcome">
                  <div className="welcome-robot">
                    <div className="robot-large">
                      <div className="robot-head-large">
                        <div className="robot-eye robot-eye-left"></div>
                        <div className="robot-eye robot-eye-right"></div>
                        <div className="robot-antenna"></div>
                      </div>
                      <div className="robot-body-large">
                        <div className="robot-chest-large"></div>
                        <div className="robot-arm robot-arm-left"></div>
                        <div className="robot-arm robot-arm-right"></div>
                      </div>
                    </div>
                  </div>
                  <h4>¡Hola! Soy tu asistente de Python en LearnPy</h4>
                  <p>Estoy aquí para ayudarte con conceptos, ejercicios y dudas sobre programación en Python</p>
                  {debugInfo && <div style={{ fontSize: "12px", color: "#666", marginTop: "8px" }}>🔧 {debugInfo}</div>}

                  <div className="chatbot-suggestions">
                    <div className="suggestion-category">
                      <div className="category-header">
                        {currentSet.icon}
                        <span>{currentSet.category}</span>
                        <div className="category-indicator">
                          {suggestionSets.map((_, index) => (
                            <div
                              key={index}
                              className={`indicator-dot ${index === currentSuggestionSet ? "active" : ""}`}
                            />
                          ))}
                        </div>
                      </div>
                      {currentSet.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className={`chatbot-suggestion-button ${index % 2 === 0 ? "" : "blue"}`}
                        >
                          "{suggestion}"
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className={`chatbot-message ${message.role}`}>
                  {message.role === "assistant" && (
                    <div className="chatbot-message-avatar">
                      <div className="message-robot">
                        <div className="robot-eye robot-eye-left"></div>
                        <div className="robot-eye robot-eye-right"></div>
                      </div>
                    </div>
                  )}

                  <div className="chatbot-message-content" style={{ whiteSpace: "pre-wrap" }}>
                    {message.content}
                  </div>

                  {message.role === "user" && (
                    <div className="chatbot-message-avatar user-avatar">
                      <User size={16} />
                    </div>
                  )}
                </div>
              ))}

              {isLoading && (
                <div className="chatbot-loading">
                  <div className="chatbot-message-avatar">
                    <div className="loading-robot">
                      <div className="robot-eye robot-eye-left thinking"></div>
                      <div className="robot-eye robot-eye-right thinking"></div>
                      <div className="robot-mouth thinking"></div>
                    </div>
                  </div>
                  <div className="chatbot-loading-content">
                    <div className="chatbot-loading-dots">
                      <div className="chatbot-loading-dot"></div>
                      <div className="chatbot-loading-dot"></div>
                      <div className="chatbot-loading-dot"></div>
                      <span className="chatbot-loading-text">Analizando tu consulta...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="chatbot-input-area">
              <form onSubmit={handleSubmit} className="chatbot-input-form">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu pregunta sobre Python..."
                  className="chatbot-input"
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="chatbot-send-button">
                  <Send size={20} />
                </button>
              </form>
              <div className="chatbot-footer-text">LearnPy • Plataforma educativa interactiva de Python</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
