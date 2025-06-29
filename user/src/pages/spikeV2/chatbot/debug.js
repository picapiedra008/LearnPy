// Archivo para debuggear la configuración
export function checkConfiguration() {
  console.log("🔍 Checking configuration...")

  // Verificar si estamos en el cliente o servidor
  const isClient = typeof window !== "undefined"
  console.log("📍 Running on:", isClient ? "Client" : "Server")

  // Verificar la URL de la API
  const apiUrl = isClient ? window.location.origin + "/api/chat" : "/api/chat"
  console.log("🌐 API URL:", apiUrl)

  // Verificar dependencias
  if (isClient) {
    console.log("✅ Running on client side")
  }
}

// Función para probar la conexión a la API
export async function testApiConnection() {
  try {
    console.log("🧪 Testing API connection...")

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: "Hola, ¿puedes ayudarme con Python?",
          },
        ],
      }),
    })

    console.log("📡 Response status:", response.status)
    console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      const errorText = await response.text()
      console.error("❌ API Error:", errorText)
      return false
    }

    console.log("✅ API connection successful")
    return true
  } catch (error) {
    console.error("💥 Connection test failed:", error)
    return false
  }
}

// Función para verificar que las dependencias estén instaladas
export function checkDependencies() {
  const dependencies = ["ai", "@ai-sdk/groq", "framer-motion", "lucide-react"]

  console.log("📦 Checking dependencies...")

  dependencies.forEach((dep) => {
    try {
      require(dep)
      console.log(`✅ ${dep} - OK`)
    } catch (error) {
      console.error(`❌ ${dep} - NOT FOUND`)
      console.log(`   Run: npm install ${dep}`)
    }
  })
}
