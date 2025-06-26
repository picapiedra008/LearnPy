import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Plugin personalizado para manejar la API
    {
      name: "api-plugin",
      configureServer(server) {
        server.middlewares.use("/api/chat", async (req, res, next) => {
          if (req.method === "POST") {
            console.log("🚀 LearnPy API procesando consulta")

            let body = ""
            req.on("data", (chunk) => {
              body += chunk.toString()
            })

            req.on("end", async () => {
              try {
                const { createGroq } = await import("@ai-sdk/groq")
                const { streamText } = await import("ai")

                const groq = createGroq({
                  apiKey: process.env.GROQ_API_KEY || "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",
                })

                const { messages } = JSON.parse(body)

                const availableModels = [
                  "llama-3.1-8b-instant",
                  "llama-3.1-70b-versatile",
                  "mixtral-8x7b-32768",
                  "gemma2-9b-it",
                ]

                let fullText = ""
                let lastError

                for (const modelName of availableModels) {
                  try {
                    console.log(`🤖 Usando modelo: ${modelName}`)

                    const result = await streamText({
                      model: groq(modelName),
                      messages,
                      system: `Eres el asistente educativo EXCLUSIVO de LearnPy, especializado ÚNICAMENTE en Python.

REGLAS ESTRICTAS:
- SOLO responde preguntas sobre Python, programación y desarrollo de software
- Si la pregunta NO es sobre Python/programación, responde: "Lo siento, soy un asistente especializado únicamente en Python. ¿Tienes alguna pregunta sobre programación en Python?"
- NO respondas sobre: recetas, deportes, historia, medicina, entretenimiento, etc.
- SIEMPRE verifica que la pregunta esté relacionada con programación antes de responder

TEMAS PERMITIDOS:
✅ Sintaxis de Python
✅ Estructuras de datos (listas, diccionarios, tuplas, sets)
✅ Funciones y métodos
✅ Programación orientada a objetos
✅ Manejo de errores y excepciones
✅ Librerías de Python (pandas, numpy, matplotlib, etc.)
✅ Algoritmos y lógica de programación
✅ Buenas prácticas de código
✅ Debugging y optimización
✅ Frameworks web (Django, Flask)
✅ Ciencia de datos con Python
✅ Automatización con Python

FORMATO DE RESPUESTA:
- Máximo 200 palabras
- Incluye ejemplos de código cuando sea útil
- Tono educativo y amigable
- Siempre en español
- Enfoque práctico

Si detectas que la pregunta NO es sobre Python/programación, usa exactamente esta respuesta:
"Lo siento, soy un asistente especializado únicamente en Python y programación. ¿Tienes alguna pregunta sobre desarrollo en Python que pueda ayudarte a resolver?"`,
                    })

                    console.log(`✅ Modelo ${modelName} exitoso`)

                    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 30000))

                    const textPromise = (async () => {
                      const chunks = []
                      for await (const chunk of result.textStream) {
                        chunks.push(chunk)
                      }
                      return chunks.join("")
                    })()

                    fullText = await Promise.race([textPromise, timeout])
                    console.log("📥 Respuesta generada:", fullText.substring(0, 100) + "...")
                    break
                  } catch (modelError) {
                    console.log(`❌ Modelo ${modelName} falló:`, modelError.message)
                    lastError = modelError
                    continue
                  }
                }

                if (!fullText) {
                  throw lastError || new Error("Servicio temporalmente no disponible")
                }

                const response = {
                  id: Date.now().toString(),
                  role: "assistant",
                  content: fullText,
                }

                res.setHeader("Content-Type", "application/json")
                res.setHeader("Access-Control-Allow-Origin", "*")
                res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
                res.setHeader("Access-Control-Allow-Headers", "Content-Type")

                res.end(JSON.stringify(response))
              } catch (error) {
                console.error("💥 Error en LearnPy API:", error)

                const errorResponse = {
                  error: error.message || "Error interno del sistema",
                  details: "El asistente de LearnPy está temporalmente no disponible",
                }

                res.statusCode = 500
                res.setHeader("Content-Type", "application/json")
                res.end(JSON.stringify(errorResponse))
              }
            })
          } else if (req.method === "OPTIONS") {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
            res.setHeader("Access-Control-Allow-Headers", "Content-Type")
            res.statusCode = 200
            res.end()
          } else {
            next()
          }
        })

        server.middlewares.use("/api/test", (req, res, next) => {
          if (req.method === "GET") {
            console.log("🧪 Verificación del sistema LearnPy")
            res.setHeader("Content-Type", "application/json")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.end(
              JSON.stringify({
                message: "Sistema LearnPy operativo",
                platform: "LearnPy - Plataforma educativa de Python",
                status: "Asistente IA disponible",
                timestamp: new Date().toISOString(),
              }),
            )
          } else {
            next()
          }
        })
      },
    },
  ],
  server: {
    port: 5173,
    host: true,
  },
})
