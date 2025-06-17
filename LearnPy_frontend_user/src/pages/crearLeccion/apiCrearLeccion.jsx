// API específica para crear lecciones
const API_BASE_URL = "http://127.0.0.1:5000"

// Mapeo de tipos de material del frontend al backend
const materialTypeMapping = {
  document: 1, // Documentos
  video: 2, // Videos
  image: 3, // Imágenes
}

const getMaterialTypeCode = (type) => {
  return materialTypeMapping[type] || 1
}

// Función para crear una lección completa
export const crearLeccionCompleta = async (lessonData, topics) => {
  try {
    console.log("=== INICIANDO CREACIÓN DE LECCIÓN ===")
    console.log("Datos de lección:", lessonData)
    console.log("Tópicos:", topics)

    // 1. Crear la lección principal
    const formData = new FormData()
    formData.append("user_code", 1) // Aquí deberías usar el ID del usuario actual
    formData.append("level_code", lessonData.level)
    formData.append("visibility_code", lessonData.visibility)
    formData.append("title", lessonData.title)
    formData.append("description", lessonData.description)

    // SOLUCIÓN: Siempre enviar un archivo front_page, aunque sea vacío
    if (lessonData.coverFile) {
      console.log("Agregando archivo de portada:", lessonData.coverFile.name)
      formData.append("front_page", lessonData.coverFile)
    } else {
      // Crear un archivo blob vacío si no hay imagen
      console.log("No hay imagen de portada, enviando archivo vacío")
      const emptyFile = new File([""], "empty.txt", { type: "text/plain" })
      formData.append("front_page", emptyFile)
    }

    // Debug: Mostrar todos los campos del FormData
    console.log("=== CONTENIDO DEL FORMDATA ===")
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value)
      if (value instanceof File) {
        console.log(`  - Archivo: ${value.name}, Tamaño: ${value.size}, Tipo: ${value.type}`)
      }
    }

    // Prueba simple primero - sin archivo
    console.log("=== PRUEBA SIN ARCHIVO PRIMERO ===")
    const testFormData = new FormData()
    testFormData.append("user_code", "1")
    testFormData.append("level_code", "1")
    testFormData.append("visibility_code", "1")
    testFormData.append("title", "Test Simple")
    testFormData.append("description", "Test description")

    const testResponse = await fetch(`${API_BASE_URL}/lesson/create_lesson`, {
      method: "POST",
      body: testFormData,
    })

    console.log("Test response status:", testResponse.status)
    if (!testResponse.ok) {
      const testError = await testResponse.text()
      console.log("Test error:", testError)
      // Si falla sin archivo, el problema es más básico
      throw new Error(`Falla básica sin archivo: ${testError}`)
    }

    const testResult = await testResponse.json()
    console.log("Test exitoso:", testResult)

    console.log("=== ENVIANDO LECCIÓN AL SERVIDOR ===")
    const lessonResponse = await fetch(`${API_BASE_URL}/lesson/create_lesson`, {
      method: "POST",
      body: formData,
    })

    console.log("Response status:", lessonResponse.status)
    console.log("Response ok:", lessonResponse.ok)

    if (!lessonResponse.ok) {
      const errorText = await lessonResponse.text()
      console.error("Error response:", errorText)
      throw new Error(`Error al crear la lección: ${lessonResponse.status} - ${errorText}`)
    }

    const lessonResult = await lessonResponse.json()
    console.log("=== LECCIÓN CREADA EXITOSAMENTE ===")
    console.log("Resultado:", lessonResult)

    // Verificar que tenemos el lesson_code
    const lessonCode = lessonResult.lesson_code || lessonResult.id || lessonResult.code
    if (!lessonCode) {
      console.error("No se encontró lesson_code en la respuesta:", lessonResult)
      throw new Error("No se pudo obtener el código de la lección")
    }

    console.log("Lesson code obtenido:", lessonCode)

    // 2. Procesar cada tópico con sus materiales y ejercicios
    const processedTopics = []

    for (let topicIndex = 0; topicIndex < topics.length; topicIndex++) {
      const topic = topics[topicIndex]
      console.log(`=== PROCESANDO TÓPICO ${topicIndex + 1}: ${topic.title} ===`)

      // 2.1 Subir materiales del tópico
      const materialCodes = []

      for (const material of topic.materials) {
        try {
          console.log(`Subiendo material: ${material.title} (${material.type})`)
          const materialFormData = new FormData()
          materialFormData.append("topic_code", 0) // Se asignará después
          materialFormData.append("material_type_code", getMaterialTypeCode(material.type))
          materialFormData.append("material_name", material.title)
          materialFormData.append("file", material.file)

          const materialResponse = await fetch(`${API_BASE_URL}/material/create_material`, {
            method: "POST",
            body: materialFormData,
          })

          if (materialResponse.ok) {
            const materialResult = await materialResponse.json()
            console.log("Material creado:", materialResult)
            if (materialResult.material_code) {
              materialCodes.push(materialResult.material_code)
            }
          } else {
            const errorText = await materialResponse.text()
            console.error("Error creando material:", errorText)
          }
        } catch (err) {
          console.error("Error subiendo material:", err)
        }
      }

      // 2.2 Crear ejercicios del tópico
      const exerciseCodes = []

      for (const exercise of topic.exercises) {
        try {
          console.log(`Creando ejercicio: ${exercise.title}`)
          const exerciseData = {
            topic_code: 0, // Se asignará después
            title: exercise.title,
            instructions: exercise.description,
            answer: exercise.expectedOutput || "",
            initial_code: exercise.starterCode || "",
          }

          const exerciseResponse = await fetch(`${API_BASE_URL}/exercise/create_exercise`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(exerciseData),
          })

          if (exerciseResponse.ok) {
            const exerciseResult = await exerciseResponse.json()
            console.log("Ejercicio creado:", exerciseResult)

            if (exerciseResult.exercise_code) {
              exerciseCodes.push(exerciseResult.exercise_code)

              // 2.3 Subir documentos del ejercicio
              for (const document of exercise.documents || []) {
                try {
                  console.log(`Subiendo documento de ejercicio: ${document.title}`)
                  const docFormData = new FormData()
                  docFormData.append("exercise_code", exerciseResult.exercise_code)
                  docFormData.append("material_type_code", getMaterialTypeCode("document"))
                  docFormData.append("material_name", document.title)
                  docFormData.append("file", document.file)

                  const docResponse = await fetch(`${API_BASE_URL}/material/create_material_of_exercise`, {
                    method: "POST",
                    body: docFormData,
                  })

                  if (docResponse.ok) {
                    const docResult = await docResponse.json()
                    console.log("Documento de ejercicio creado:", docResult)
                  } else {
                    const errorText = await docResponse.text()
                    console.error("Error creando documento de ejercicio:", errorText)
                  }
                } catch (err) {
                  console.error("Error subiendo documento de ejercicio:", err)
                }
              }
            }
          } else {
            const errorText = await exerciseResponse.text()
            console.error("Error creando ejercicio:", errorText)
          }
        } catch (err) {
          console.error("Error creando ejercicio:", err)
        }
      }

      // 2.4 Preparar datos del tópico para la API
      const processedTopic = {
        index: topicIndex + 1,
        topic_title: topic.title,
        topic_description: topic.description,
        material_code: materialCodes[0] || null, // Usar el primer material como principal
        exercises: exerciseCodes,
      }

      processedTopics.push(processedTopic)
      console.log(`Tópico ${topicIndex + 1} procesado:`, processedTopic)
    }

    // 3. Crear tópicos con sus relaciones
    if (processedTopics.length > 0) {
      console.log("=== CREANDO TÓPICOS ===")
      const topicsData = {
        lesson_code: lessonCode,
        topics: processedTopics,
      }

      console.log("Datos de tópicos a enviar:", topicsData)

      const topicsResponse = await fetch(`${API_BASE_URL}/lesson/topics`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(topicsData),
      })

      if (topicsResponse.ok) {
        const topicsResult = await topicsResponse.json()
        console.log("=== TÓPICOS CREADOS EXITOSAMENTE ===")
        console.log("Resultado:", topicsResult)
      } else {
        const errorText = await topicsResponse.text()
        console.error("Error creando tópicos:", errorText)
        throw new Error(`Error al crear tópicos: ${topicsResponse.status} - ${errorText}`)
      }
    }

    console.log("=== LECCIÓN COMPLETA CREADA EXITOSAMENTE ===")
    return {
      success: true,
      lessonCode: lessonCode,
      message: "Lección creada exitosamente",
    }
  } catch (error) {
    console.error("=== ERROR EN CREACIÓN DE LECCIÓN ===")
    console.error("Error completo:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Función para obtener niveles
export const obtenerNiveles = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/lesson/get_levels`)
    if (!response.ok) {
      throw new Error("Error al obtener niveles")
    }
    return await response.json()
  } catch (error) {
    console.error("Error obteniendo niveles:", error)
    return []
  }
}

// Función para obtener visibilidades
export const obtenerVisibilidades = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/lesson/get_visibilities`)
    if (!response.ok) {
      throw new Error("Error al obtener visibilidades")
    }
    return await response.json()
  } catch (error) {
    console.error("Error obteniendo visibilidades:", error)
    return []
  }
}

// Función para obtener tipos de material (opcional)
export const obtenerTiposMaterial = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/material/get_material_types`)
    if (!response.ok) {
      throw new Error("Error al obtener tipos de material")
    }
    return await response.json()
  } catch (error) {
    console.error("Error obteniendo tipos de material:", error)
    return []
  }
}
