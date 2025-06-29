import SpikeV2 from "./spikeV2.jsx"

// Configuración de rutas para el proyecto LearnPy
export const spikeV2Routes = {
  path: "/spike-v2",
  component: SpikeV2,
  name: "SpikeV2",
  title: "Práctica de Programación Python - Spike V2",
  description: "Plataforma interactiva para practicar programación en Python con ejercicios adaptativos",
  meta: {
    requiresAuth: true,
    roles: ["student", "teacher", "admin"],
    category: "practice",
    difficulty: "all",
  },
}

// Configuración adicional para integración con LearnPy
export const spikeV2Config = {
  // Configuración de la API
  api: {
    baseUrl: process.env.REACT_APP_API_URL || "http://localhost:3000",
    endpoints: {
      evaluateCode: "/api/evaluate-code",
      saveProgress: "/api/progress/save",
      loadProgress: "/api/progress/load",
      getProblems: "/api/problems",
      submitSolution: "/api/solutions/submit",
    },
  },

  // Configuración de recursos multimedia
  media: {
    videosPath: "/videos",
    documentsPath: "/documentos",
    imagesPath: "/images",
    audioPath: "/audio",
  },

  // Configuración de temas y colores
  theme: {
    primaryColor: "#7c3aed", // Purple-700
    secondaryColor: "#8b5cf6", // Purple-600
    accentColor: "#3b82f6", // Blue-500
    successColor: "#10b981", // Green-500
    warningColor: "#f59e0b", // Amber-500
    errorColor: "#ef4444", // Red-500
  },

  // Configuración de dificultades
  difficulties: {
    beginner: {
      label: "Principiante",
      color: "#10b981",
      icon: "🟢",
      exerciseCount: 3,
      timeLimit: 300, // 5 minutos por ejercicio
    },
    intermediate: {
      label: "Intermedio",
      color: "#f59e0b",
      icon: "🟡",
      exerciseCount: 3,
      timeLimit: 600, // 10 minutos por ejercicio
    },
    advanced: {
      label: "Avanzado",
      color: "#ef4444",
      icon: "🔴",
      exerciseCount: 3,
      timeLimit: 900, // 15 minutos por ejercicio
    },
  },

  // Configuración de gamificación
  gamification: {
    pointsPerExercise: {
      beginner: 10,
      intermediate: 20,
      advanced: 30,
    },
    bonusPoints: {
      firstTry: 5,
      perfectSolution: 10,
      fastCompletion: 5,
    },
    achievements: [
      {
        id: "first_steps",
        name: "Primeros Pasos",
        description: "Completa tu primer ejercicio",
        icon: "🎯",
        condition: "complete_1_exercise",
      },
      {
        id: "python_novice",
        name: "Novato en Python",
        description: "Completa 5 ejercicios de principiante",
        icon: "🐍",
        condition: "complete_5_beginner",
      },
      {
        id: "code_warrior",
        name: "Guerrero del Código",
        description: "Completa todos los ejercicios de un nivel",
        icon: "⚔️",
        condition: "complete_all_level",
      },
      {
        id: "perfect_solver",
        name: "Solucionador Perfecto",
        description: "Resuelve 10 ejercicios en el primer intento",
        icon: "💎",
        condition: "perfect_10_exercises",
      },
    ],
  },

  // Configuración de analytics
  analytics: {
    trackEvents: true,
    events: {
      exerciseStarted: "exercise_started",
      exerciseCompleted: "exercise_completed",
      solutionViewed: "solution_viewed",
      codeEvaluated: "code_evaluated",
      difficultyChanged: "difficulty_changed",
    },
  },

  // Configuración de accesibilidad
  accessibility: {
    enableKeyboardNavigation: true,
    enableScreenReader: true,
    enableHighContrast: false,
    fontSize: "normal", // 'small', 'normal', 'large'
    reduceMotion: false,
  },
}

// Función para inicializar el componente SpikeV2
export const initializeSpikeV2 = (config = {}) => {
  const mergedConfig = {
    ...spikeV2Config,
    ...config,
  }

  // Aplicar configuración global
  if (mergedConfig.theme) {
    const root = document.documentElement
    Object.entries(mergedConfig.theme).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }

  // Configurar analytics si está habilitado
  if (mergedConfig.analytics.trackEvents) {
    // Inicializar tracking de eventos
    console.log("Analytics initialized for SpikeV2")
  }

  return mergedConfig
}

// Función de utilidad para tracking de eventos
export const trackEvent = (eventName, properties = {}) => {
  if (spikeV2Config.analytics.trackEvents) {
    // Implementar tracking real aquí
    console.log(`Event tracked: ${eventName}`, properties)
  }
}

// Función para guardar progreso local
export const saveLocalProgress = (progress) => {
  try {
    localStorage.setItem("spikeV2_progress", JSON.stringify(progress))
  } catch (error) {
    console.error("Error saving progress:", error)
  }
}

// Función para cargar progreso local
export const loadLocalProgress = () => {
  try {
    const progress = localStorage.getItem("spikeV2_progress")
    return progress ? JSON.parse(progress) : null
  } catch (error) {
    console.error("Error loading progress:", error)
    return null
  }
}

// Función para validar código Python (básica)
export const validatePythonCode = (code) => {
  const errors = []

  // Validaciones básicas
  if (!code.trim()) {
    errors.push("El código no puede estar vacío")
  }

  // Verificar indentación básica
  const lines = code.split("\n")
  let inFunction = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.includes("def ") && line.includes(":")) {
      inFunction = true
    }

    if (inFunction && line.trim() && !line.startsWith("    ") && !line.includes("def ") && !line.startsWith("#")) {
      errors.push(`Línea ${i + 1}: Posible problema de indentación`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export default SpikeV2
