"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  X,
  Maximize2,
  Minimize2,
  BookOpen,
  Video,
  FileText,
  ExternalLink,
  AlertCircle,
  Lightbulb,
  Trophy,
  Clock,
  Target,
  Award,
  Sun,
  Moon,
  Play,
  Volume2,
  Music,
  Home,
  LogOut,
  User,
} from "lucide-react"

import "./spikeV2.css"

const DIFFICULTY_LEVELS = {
  beginner: {
    label: "Principiante",
    color: "#10B981",
    bgColor: "bg-emerald-500",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-200",
    bgLight: "bg-emerald-100",
    icon: "🟢",
  },
  intermediate: {
    label: "Intermedio",
    color: "#F59E0B",
    bgColor: "bg-amber-500",
    textColor: "text-amber-700",
    borderColor: "border-amber-200",
    bgLight: "bg-amber-100",
    icon: "🟡",
  },
  advanced: {
    label: "Avanzado",
    color: "#EF4444",
    bgColor: "bg-red-500",
    textColor: "text-red-700",
    borderColor: "border-red-200",
    bgLight: "bg-red-100",
    icon: "🔴",
  },
}

const PROBLEMS = {
  beginner: [
    {
      title: "Suma de Números Pares",
      description: `Escribe una función llamada 'suma_pares' que tome una lista de números enteros como parámetro y devuelva la suma de todos los números pares en la lista.

Ejemplo:
- Input: [1, 2, 3, 4, 5, 6]
- Output: 12 (2 + 4 + 6)

Requisitos:
- La función debe llamarse exactamente 'suma_pares'
- Debe manejar listas vacías (retornar 0)
- Solo considerar números enteros pares`,
      testCases: [
        { input: "[1, 2, 3, 4, 5, 6]", expected: "12" },
        { input: "[1, 3, 5]", expected: "0" },
        { input: "[]", expected: "0" },
      ],
      initialCode: "def suma_pares(numeros):\n    # Escribe tu código aquí\n    pass",
      solutionCode: `def suma_pares(numeros):
    """
    Calcula la suma de todos los números pares en una lista.
    """
    return sum(num for num in numeros if num % 2 == 0)`,
      completed: true,
    },
    {
      title: "Contar Vocales",
      description: `Escribe una función llamada 'contar_vocales' que tome una cadena de texto como parámetro y devuelva el número total de vocales (a, e, i, o, u) en la cadena, sin importar mayúsculas o minúsculas.

Ejemplo:
- Input: "Hola Mundo"
- Output: 4 (o, a, u, o)

Requisitos:
- La función debe llamarse exactamente 'contar_vocales'
- Considerar tanto mayúsculas como minúsculas
- Solo contar a, e, i, o, u`,
      testCases: [
        { input: '"Hola Mundo"', expected: "4" },
        { input: '"Python"', expected: "1" },
        { input: '""', expected: "0" },
      ],
      initialCode: "def contar_vocales(texto):\n    # Escribe tu código aquí\n    pass",
      solutionCode: `def contar_vocales(texto):
    """
    Cuenta el número de vocales en una cadena de texto.
    """
    vocales = "aeiouAEIOU"
    return sum(1 for char in texto if char in vocales)`,
      completed: true,
    },
    {
      title: "Número Mayor",
      description: `Escribe una función llamada 'encontrar_mayor' que tome una lista de números como parámetro y devuelva el número más grande de la lista.

Ejemplo:
- Input: [3, 7, 2, 9, 1]
- Output: 9

Requisitos:
- La función debe llamarse exactamente 'encontrar_mayor'
- Manejar listas con un solo elemento
- Asumir que la lista nunca estará vacía`,
      testCases: [
        { input: "[3, 7, 2, 9, 1]", expected: "9" },
        { input: "[5]", expected: "5" },
        { input: "[-1, -5, -2]", expected: "-1" },
      ],
      initialCode: "def encontrar_mayor(numeros):\n    # Escribe tu código aquí\n    pass",
      solutionCode: `def encontrar_mayor(numeros):
    """
    Encuentra el número más grande en una lista.
    """
    return max(numeros)`,
      completed: false,
    },
  ],
  intermediate: [
    {
      title: "Palíndromo con Validación",
      description: `Escribe una función llamada 'es_palindromo_valido' que determine si una cadena es un palíndromo válido, considerando solo caracteres alfanuméricos e ignorando mayúsculas/minúsculas.

Ejemplo:
- Input: "A man, a plan, a canal: Panama"
- Output: True

Requisitos:
- La función debe llamarse exactamente 'es_palindromo_valido'
- Ignorar espacios, puntuación y mayúsculas/minúsculas
- Solo considerar caracteres alfanuméricos`,
      testCases: [
        { input: '"A man, a plan, a canal: Panama"', expected: "True" },
        { input: '"race a car"', expected: "False" },
        { input: '""', expected: "True" },
      ],
      initialCode: "def es_palindromo_valido(cadena):\n    # Escribe tu código aquí\n    pass",
      solutionCode: `def es_palindromo_valido(cadena):
    """
    Determina si una cadena es un palíndromo válido.
    """
    texto_limpio = ''.join(char.lower() for char in cadena if char.isalnum())
    return texto_limpio == texto_limpio[::-1]`,
      completed: false,
    },
    {
      title: "Anagramas",
      description: `Escribe una función llamada 'son_anagramas' que determine si dos cadenas son anagramas entre sí. Dos palabras son anagramas si contienen exactamente las mismas letras con la misma frecuencia.

Ejemplo:
- Input: "listen", "silent"
- Output: True

Requisitos:
- La función debe llamarse exactamente 'son_anagramas'
- Ignorar espacios y mayúsculas/minúsculas
- Considerar solo letras`,
      testCases: [
        { input: '"listen", "silent"', expected: "True" },
        { input: '"hello", "bello"', expected: "False" },
        { input: '"a", "aa"', expected: "False" },
      ],
      initialCode: "def son_anagramas(palabra1, palabra2):\n    # Escribe tu código aquí\n    pass",
      solutionCode: `def son_anagramas(palabra1, palabra2):
    """
    Determina si dos palabras son anagramas.
    """
    def limpiar_palabra(palabra):
        return ''.join(char.lower() for char in palabra if char.isalpha())
    
    limpia1 = limpiar_palabra(palabra1)
    limpia2 = limpiar_palabra(palabra2)
    
    return sorted(limpia1) == sorted(limpia2)`,
      completed: false,
    },
    {
      title: "Fibonacci con Memoización",
      description: `Escribe una función llamada 'fibonacci_memo' que calcule el n-ésimo número de Fibonacci usando memoización para optimizar el rendimiento.

Ejemplo:
- Input: 10
- Output: 55

Requisitos:
- La función debe llamarse exactamente 'fibonacci_memo'
- Usar memoización para evitar cálculos repetidos
- Manejar casos base (n=0 retorna 0, n=1 retorna 1)`,
      testCases: [
        { input: "10", expected: "55" },
        { input: "0", expected: "0" },
        { input: "1", expected: "1" },
      ],
      initialCode: "def fibonacci_memo(n, memo={}):\n    # Escribe tu código aquí\n    pass",
      solutionCode: `def fibonacci_memo(n, memo={}):
    """
    Calcula el n-ésimo número de Fibonacci con memoización.
    """
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]`,
      completed: false,
    },
  ],
  advanced: [
    {
      title: "Algoritmo de Ordenamiento Merge Sort",
      description: `Implementa el algoritmo de ordenamiento Merge Sort de forma recursiva. Crea una función llamada 'merge_sort' que ordene una lista de números de menor a mayor.

Ejemplo:
- Input: [64, 34, 25, 12, 22, 11, 90]
- Output: [11, 12, 22, 25, 34, 64, 90]

Requisitos:
- Implementar el algoritmo divide y vencerás
- Usar recursión para dividir la lista
- Complejidad temporal O(n log n)`,
      testCases: [
        { input: "[64, 34, 25, 12, 22, 11, 90]", expected: "[11, 12, 22, 25, 34, 64, 90]" },
        { input: "[5, 2, 8, 1, 9]", expected: "[1, 2, 5, 8, 9]" },
        { input: "[]", expected: "[]" },
      ],
      initialCode:
        "def merge_sort(lista):\n    # Escribe tu código aquí\n    pass\n\ndef merge(izq, der):\n    # Función auxiliar\n    pass",
      solutionCode: `def merge_sort(lista):
    """
    Implementa Merge Sort recursivamente.
    """
    if len(lista) <= 1:
        return lista
    
    medio = len(lista) // 2
    izquierda = merge_sort(lista[:medio])
    derecha = merge_sort(lista[medio:])
    
    return merge(izquierda, derecha)

def merge(izq, der):
    """
    Combina dos listas ordenadas.
    """
    resultado = []
    i = j = 0
    
    while i < len(izq) and j < len(der):
        if izq[i] <= der[j]:
            resultado.append(izq[i])
            i += 1
        else:
            resultado.append(der[j])
            j += 1
    
    resultado.extend(izq[i:])
    resultado.extend(der[j:])
    return resultado`,
      completed: false,
    },
    {
      title: "Búsqueda Binaria",
      description: `Implementa el algoritmo de búsqueda binaria. Crea una función llamada 'busqueda_binaria' que busque un elemento en una lista ordenada y retorne su índice, o -1 si no se encuentra.

Ejemplo:
- Input: [1, 3, 5, 7, 9, 11], 7
- Output: 3

Requisitos:
- La función debe llamarse 'busqueda_binaria'
- Implementar el algoritmo iterativo o recursivo
- Complejidad temporal O(log n)
- Retornar -1 si el elemento no existe`,
      testCases: [
        { input: "[1, 3, 5, 7, 9, 11], 7", expected: "3" },
        { input: "[1, 3, 5, 7, 9, 11], 4", expected: "-1" },
        { input: "[], 5", expected: "-1" },
      ],
      initialCode: "def busqueda_binaria(lista, objetivo):\n    # Escribe tu código aquí\n    pass",
      solutionCode: `def busqueda_binaria(lista, objetivo):
    """
    Implementa búsqueda binaria iterativa.
    """
    izquierda, derecha = 0, len(lista) - 1
    
    while izquierda <= derecha:
        medio = (izquierda + derecha) // 2
        
        if lista[medio] == objetivo:
            return medio
        elif lista[medio] < objetivo:
            izquierda = medio + 1
        else:
            derecha = medio - 1
    
    return -1`,
      completed: false,
    },
    {
      title: "Árbol Binario de Búsqueda",
      description: `Implementa una clase 'ArbolBST' que represente un árbol binario de búsqueda con métodos para insertar elementos y buscar elementos.

Ejemplo:
- Insertar: 5, 3, 7, 1, 9
- Buscar: 7 → True, 4 → False

Requisitos:
- Clase llamada 'ArbolBST'
- Método 'insertar(valor)'
- Método 'buscar(valor)' que retorne True/False
- Mantener la propiedad BST`,
      testCases: [
        { input: "insertar 5,3,7 y buscar 7", expected: "True" },
        { input: "insertar 5,3,7 y buscar 4", expected: "False" },
        { input: "árbol vacío buscar 1", expected: "False" },
      ],
      initialCode: `class ArbolBST:
    def __init__(self):
        # Escribe tu código aquí
        pass
    
    def insertar(self, valor):
        # Escribe tu código aquí
        pass
    
    def buscar(self, valor):
        # Escribe tu código aquí
        pass`,
      solutionCode: `class ArbolBST:
    def __init__(self):
        self.raiz = None
    
    def insertar(self, valor):
        """Inserta un valor en el BST."""
        self.raiz = self._insertar_recursivo(self.raiz, valor)
    
    def _insertar_recursivo(self, nodo, valor):
        if nodo is None:
            return NodoBST(valor)
        
        if valor < nodo.valor:
            nodo.izquierda = self._insertar_recursivo(nodo.izquierda, valor)
        elif valor > nodo.valor:
            nodo.derecha = self._insertar_recursivo(nodo.derecha, valor)
        
        return nodo
    
    def buscar(self, valor):
        """Busca un valor en el BST."""
        return self._buscar_recursivo(self.raiz, valor)
    
    def _buscar_recursivo(self, nodo, valor):
        if nodo is None:
            return False
        
        if valor == nodo.valor:
            return True
        elif valor < nodo.valor:
            return self._buscar_recursivo(nodo.izquierda, valor)
        else:
            return self._buscar_recursivo(nodo.derecha, valor)

class NodoBST:
    def __init__(self, valor):
        self.valor = valor
        self.izquierda = None
        self.derecha = None`,
      completed: false,
    },
  ],
}

const LEARNING_RESOURCES = [
  {
    type: "video",
    title: "Funciones en Python",
    icon: Video,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    src: "/videos/tutopy.mp4",
    mediaType: "video",
  },
  {
    type: "article",
    title: "Listas y Bucles",
    icon: FileText,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    src: "/documentos/listas-bucles.pdf",
    mediaType: "pdf",
  },
  {
    type: "tutorial",
    title: "Operadores Matemáticos",
    icon: BookOpen,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    src: "/documentos/funciones-python.pdf",
    mediaType: "pdf",
  },
  {
    type: "example",
    title: "Ejemplos de Filtrado",
    icon: Lightbulb,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    src: "/documentos/funciones-python.pdf",
    mediaType: "pdf",
  },
]

// Componente ParticlesContainer
const ParticlesContainer = () => {
  return (
    <div className="particles-container">
      <canvas className="particles-canvas"></canvas>
    </div>
  )
}

// Componente MediaModal
const MediaModal = ({ isOpen, onClose, type, src, title }) => {
  const [isMaximized, setIsMaximized] = useState(false)

  if (!isOpen) return null

  const modalSize = isMaximized ? "modal-maximized" : "modal-normal"

  return (
    <div className="modal-overlay">
      <div className={`modal-container ${modalSize}`}>
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
          <div className="modal-controls">
            <button className="modal-control-btn" onClick={() => setIsMaximized(!isMaximized)}>
              {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
            <button className="modal-control-btn" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>
        <div className="modal-content">
          {type === "video" && (
            <video controls className="modal-video" src={src} preload="metadata">
              Tu navegador no soporta el elemento de video.
            </video>
          )}
          {(type === "pdf" || type === "pptx") && <iframe src={src} className="modal-iframe" title={title} />}
        </div>
      </div>
    </div>
  )
}

// Componente ProgressFooter
const ProgressFooter = ({ completedExercises, totalExercises, currentLevel }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const progressPercentage = (completedExercises / totalExercises) * 100
  const isExamReady = progressPercentage >= 70
  const exercisesNeeded = Math.ceil(((70 - progressPercentage) / 100) * totalExercises)

  const handleExamClick = () => {
    if (isExamReady) {
      console.log("Iniciando examen...")
      setIsModalOpen(false)
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <footer className="progress-footer">
        <div className="progress-footer-content">
          <div className="progress-section">
            <div className="progress-bar-container">
              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            <span className="progress-text">{Math.round(progressPercentage)}%</span>
          </div>

          <button onClick={handleExamClick} className={`exam-button ${isExamReady ? "exam-ready" : "exam-locked"}`}>
            {isExamReady ? (
              <>
                <Trophy size={16} />
                <span className="hidden sm:inline">Rendir Examen</span>
                <span className="sm:hidden">Examen</span>
              </>
            ) : (
              <>
                <Clock size={16} />
                <span className="hidden sm:inline">Ver Progreso</span>
                <span className="sm:hidden">Progreso</span>
              </>
            )}
          </button>

          <div className="level-indicator">
            <span className="level-text">Nivel:</span>
            <div className="level-badge">
              <span>{currentLevel.icon}</span>
              <span className="level-label">{currentLevel.label}</span>
            </div>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="progress-modal">
            <div className="progress-modal-header">
              <BookOpen size={20} />
              <span>Estado del Examen</span>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="progress-modal-content">
              {isExamReady ? (
                <div className="exam-ready-section">
                  <div className="exam-status-icon">
                    <Trophy size={32} />
                  </div>
                  <h3>¡Examen Disponible!</h3>
                  <p>Has completado suficientes ejercicios para rendir el examen</p>
                  <button
                    onClick={() => {
                      console.log("Iniciando examen...")
                      setIsModalOpen(false)
                    }}
                    className="start-exam-btn"
                  >
                    <Award size={16} />
                    Iniciar Examen Ahora
                  </button>
                </div>
              ) : (
                <div className="exam-locked-section">
                  <div className="exam-status-icon locked">
                    <Clock size={32} />
                  </div>
                  <h3>Examen Bloqueado</h3>
                  <p>Completa más ejercicios para desbloquear el examen</p>
                  <div className="exercises-needed">
                    <Target size={16} />
                    <span>
                      Necesitas completar {exercisesNeeded} ejercicio{exercisesNeeded !== 1 ? "s" : ""} más
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Componente Navbar
const Navbar = ({ username = "Jesus Valdivia", userAvatar = "/images/jesus-photo.png" }) => {
  const handleHome = () => {
    console.log("Navegando a Home")
  }

  const handleLogout = () => {
    console.log("Cerrando sesión")
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <img src="/images/new-learnpy-logo.png" alt="LearnPy Logo" />
          </div>
          <div className="navbar-title">
            <h1>LearnPy</h1>
            <p>Práctica de Programación</p>
          </div>
        </div>

        <div className="navbar-user">
          <div className="user-avatar">
            <img src={userAvatar || "/placeholder.svg"} alt={username} />
          </div>
          <div className="user-info">
            <p className="user-name">{username}</p>
            <div className="user-details">
              <span>Estudiante</span>
              <span>•</span>
              <span>
                <User size={12} />
                <span>Masculino</span>
              </span>
            </div>
          </div>
        </div>

        <div className="navbar-controls">
          <button className="nav-control-btn" onClick={handleHome} title="Ir a Inicio">
            <Home size={20} />
          </button>
          <button className="nav-control-btn logout" onClick={handleLogout} title="Cerrar Sesión">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

// Componente TopControls
const TopControls = () => {
  const [theme, setTheme] = useState("light")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    document.documentElement.setAttribute("data-theme", theme === "light" ? "dark" : "light")
  }

  return (
    <div className="top-controls">
      <div className="controls-container">
        <button
          className="control-btn"
          onClick={toggleTheme}
          title={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>

        <div className="controls-divider"></div>

        <div className="music-controls">
          <button className="control-btn" title="Reproducir música">
            <Play size={16} />
          </button>
          <button className="control-btn" title="Volumen">
            <Volume2 size={16} />
          </button>
          <button className="control-btn" title="Seleccionar género">
            <Music size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

// Componente principal SpikeV2
const SpikeV2 = () => {
  const [currentDifficulty, setCurrentDifficulty] = useState("beginner")
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [code, setCode] = useState(PROBLEMS.beginner[0].initialCode)
  const [output, setOutput] = useState("")
  const [aiFeedback, setAiFeedback] = useState("")
  const [isCodeExpanded, setIsCodeExpanded] = useState(false)
  const [isChecking, setIsChecking] = useState(false)
  const [hasChecked, setHasChecked] = useState(false)
  const [isShowingSolution, setIsShowingSolution] = useState(false)
  const [isLoadingSolution, setIsLoadingSolution] = useState(false)

  // Modal state
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "video",
    src: "",
    title: "",
  })

  const currentProblem = PROBLEMS[currentDifficulty][currentProblemIndex]
  const currentLevel = DIFFICULTY_LEVELS[currentDifficulty]
  const totalProblems = PROBLEMS[currentDifficulty].length

  // Calculate progress
  const allProblems = [...PROBLEMS.beginner, ...PROBLEMS.intermediate, ...PROBLEMS.advanced]
  const completedExercises = allProblems.filter((problem) => problem.completed).length
  const totalExercises = allProblems.length

  const resetProblemState = () => {
    setOutput("")
    setAiFeedback("")
    setHasChecked(false)
    setIsShowingSolution(false)
  }

  const handleDifficultyChange = () => {
    const difficulties = ["beginner", "intermediate", "advanced"]
    const currentIndex = difficulties.indexOf(currentDifficulty)
    const nextIndex = (currentIndex + 1) % difficulties.length
    const newDifficulty = difficulties[nextIndex]

    setCurrentDifficulty(newDifficulty)
    setCurrentProblemIndex(0)
    setCode(PROBLEMS[newDifficulty][0].initialCode)
    resetProblemState()
  }

  const handlePreviousProblem = () => {
    if (currentProblemIndex > 0) {
      const newIndex = currentProblemIndex - 1
      setCurrentProblemIndex(newIndex)
      setCode(PROBLEMS[currentDifficulty][newIndex].initialCode)
      resetProblemState()
    }
  }

  const handleNextProblem = () => {
    const newIndex = (currentProblemIndex + 1) % totalProblems
    setCurrentProblemIndex(newIndex)
    setCode(PROBLEMS[currentDifficulty][newIndex].initialCode)
    resetProblemState()
  }

  const handleResourceClick = (resource) => {
    setModalState({
      isOpen: true,
      type: resource.mediaType,
      src: resource.src,
      title: resource.title,
    })
  }

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: "video",
      src: "",
      title: "",
    })
  }

  const evaluateCodeWithAI = async (userCode) => {
    try {
      // Simulación de evaluación con IA
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const feedback = `✅ **Análisis de tu código:**

Tu implementación está en buen camino. Aquí hay algunos puntos clave:

**Aspectos positivos:**
- Estructura de función correcta
- Uso apropiado de parámetros

**Sugerencias de mejora:**
- Considera usar comprensiones de lista para un código más conciso
- Verifica el manejo de casos edge (listas vacías)
- La lógica parece correcta, pero revisa la implementación

**Próximos pasos:**
1. Prueba tu código con los casos de test
2. Optimiza la solución si es posible
3. Considera diferentes enfoques al problema

¡Sigue así! 🚀`

      return feedback
    } catch (error) {
      console.error("Error evaluating code:", error)
      return `Error al evaluar el código: ${error instanceof Error ? error.message : "Error desconocido"}`
    }
  }

  const getSolutionFeedbackFromAI = async () => {
    try {
      // Simulación de feedback de solución
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const feedback = `🎯 **Explicación de la Solución Oficial:**

Esta solución utiliza las mejores prácticas de Python:

**Técnicas implementadas:**
- **Comprensión de lista**: Más eficiente y legible
- **Función sum()**: Aprovecha las funciones built-in de Python
- **Filtrado condicional**: Usando 'if' en la comprensión

**Por qué funciona:**
1. Itera sobre cada elemento de la lista
2. Aplica la condición (% 2 == 0 para números pares)
3. Suma solo los elementos que cumplen la condición

**Complejidad:**
- Tiempo: O(n) - lineal
- Espacio: O(1) - constante

**Variaciones posibles:**
- Usando un bucle for tradicional
- Usando filter() y map()
- Implementación recursiva

¡Esta es una solución óptima y pythónica! 🐍✨`

      return feedback
    } catch (error) {
      console.error("Error getting solution feedback:", error)
      return `Error al obtener explicación de la solución: ${error instanceof Error ? error.message : "Error desconocido"}`
    }
  }

  const simulateCodeExecution = (userCode) => {
    try {
      const functionName = currentProblem.initialCode.split("(")[0].replace("def ", "").replace("class ", "")

      if (!userCode.includes(functionName)) {
        return `❌ Error: No se encontró la función/clase '${functionName}'

Por favor, asegúrate de definir correctamente '${functionName}'.`
      }

      let testResults = "🔄 Ejecutando código...\n\n"

      currentProblem.testCases.forEach((testCase, index) => {
        testResults += `📋 Test ${index + 1}: ${functionName}(${testCase.input})\n`
        testResults += `✅ Resultado: ${testCase.expected}\n`
        testResults += `🎯 Esperado: ${testCase.expected}\n`
        testResults += `✓ Estado: PASÓ\n\n`
      })

      testResults += "🎉 ¡Todos los tests pasaron correctamente!\n\n"
      testResults += "🏆 Tu código funciona perfectamente. ¡Bien hecho!"
      return testResults
    } catch (error) {
      return `❌ Error en la ejecución: ${error}`
    }
  }

  const simulateSolutionExecution = () => {
    const functionName = currentProblem.initialCode.split("(")[0].replace("def ", "").replace("class ", "")
    let testResults = `🎯 EJECUTANDO SOLUCIÓN OFICIAL...\n\n`

    currentProblem.testCases.forEach((testCase, index) => {
      testResults += `📋 Test ${index + 1}: ${functionName}(${testCase.input})\n`
      testResults += `✅ Resultado: ${testCase.expected} ✨ PERFECTO\n`
      testResults += `🎯 Esperado: ${testCase.expected}\n`
      testResults += `📝 Explicación: Caso de prueba ${index + 1} validado correctamente\n\n`
    })

    testResults += `🏆 TODOS LOS TESTS PASARON - SOLUCIÓN PERFECTA!\n\n`

    if (currentDifficulty === "beginner") {
      testResults += "💡 Esta solución demuestra conceptos fundamentales de Python."
    } else if (currentDifficulty === "intermediate") {
      testResults += "💡 Esta solución utiliza técnicas intermedias de programación."
    } else {
      testResults += "💡 Esta solución implementa algoritmos avanzados y estructuras de datos."
    }

    return testResults
  }

  const handleCheck = async () => {
    setIsChecking(true)
    setHasChecked(true)

    const executionResult = simulateCodeExecution(code)
    setOutput(executionResult)

    try {
      const aiFeedbackResult = await evaluateCodeWithAI(code)
      setAiFeedback(aiFeedbackResult)
    } catch (error) {
      setAiFeedback("Error al obtener retroalimentación de IA. Por favor, intenta de nuevo.")
    }

    setIsChecking(false)
  }

  const handleSolve = async () => {
    setIsLoadingSolution(true)
    setIsShowingSolution(true)
    setHasChecked(true)

    setCode(currentProblem.solutionCode)

    const solutionOutput = simulateSolutionExecution()
    setOutput(solutionOutput)

    try {
      const solutionFeedback = await getSolutionFeedbackFromAI()
      setAiFeedback(solutionFeedback)
    } catch (error) {
      setAiFeedback(
        "Error al obtener explicación de la solución. La solución se ha cargado correctamente en el editor.",
      )
    }

    setIsLoadingSolution(false)
  }

  return (
    <div className="spike-v2-container">
      {/* Particles Background */}
      <ParticlesContainer />

      {/* Navbar */}
      <Navbar username="Jesus Valdivia" userAvatar="/images/jesus-photo.png" />

      {/* Top Controls */}
      <TopControls />

      {/* Media Modal */}
      <MediaModal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
        src={modalState.src}
        title={modalState.title}
      />

      {/* Main Content */}
      <div className="main-content">
        <ParticlesContainer />
        <div className="content-wrapper">
          {/* Header */}
          <div className="header-section">
            <h1 className="main-title">Práctica de Programación Python</h1>
            <p className="main-subtitle">Resuelve problemas paso a paso y mejora tus habilidades</p>
          </div>

          {/* Main Layout */}
          <div className="main-layout">
            {/* Problem Statement */}
            <div className="problem-section">
              <div className="card">
                <div className="card-header">
                  <div className="problem-title-section">
                    <h2 className="problem-title">{currentProblem.title}</h2>
                    <button
                      className={`difficulty-btn ${currentLevel.label.toLowerCase()}`}
                      onClick={handleDifficultyChange}
                    >
                      <span>{currentLevel.icon}</span>
                      <span className="difficulty-label">{currentLevel.label}</span>
                    </button>
                    <div className="problem-counter">
                      {currentProblemIndex + 1} de {totalProblems}
                    </div>
                    {isShowingSolution && <div className="solution-badge">💡 Solución Mostrada</div>}
                  </div>
                </div>
                <div className="card-content">
                  <div className="problem-description">{currentProblem.description}</div>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className={`code-section ${isCodeExpanded ? "expanded" : ""}`}>
              <div className="card">
                <div className="card-header">
                  <div className="code-header">
                    <h3 className="code-title">
                      Editor de Código
                      {isShowingSolution && <span className="solution-indicator">(Solución Oficial)</span>}
                    </h3>
                    <button className="expand-btn" onClick={() => setIsCodeExpanded(!isCodeExpanded)}>
                      {isCodeExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className={`code-editor ${isShowingSolution ? "solution-mode" : ""}`}
                    placeholder="Escribe tu código aquí..."
                  />
                </div>
              </div>
            </div>

            {/* Output and Feedback */}
            {!isCodeExpanded && (
              <div className="output-section">
                {/* Output */}
                <div className="card">
                  <div className="card-header">
                    <h3 className="output-title">
                      Resultado de Ejecución
                      {isShowingSolution && <span className="solution-indicator">(Tests de Solución)</span>}
                    </h3>
                  </div>
                  <div className="card-content">
                    <div className="output-content">
                      <pre className={`output-text ${isShowingSolution ? "solution-mode" : ""}`}>
                        {output || 'Presiona "Evaluar" para ejecutar tu código...'}
                      </pre>
                    </div>
                  </div>
                </div>

                {/* AI Feedback */}
                <div
                  className={`card feedback-card ${hasChecked ? "has-feedback" : ""} ${isShowingSolution ? "solution-mode" : ""}`}
                >
                  <div className="card-header">
                    <div className="feedback-header">
                      <div className="feedback-title-section">
                        <AlertCircle size={20} />
                        <h3>Retroalimentación IA</h3>
                        {isShowingSolution && <span className="solution-indicator">(Explicación de Solución)</span>}
                      </div>

                      <div className="resource-buttons">
                        {LEARNING_RESOURCES.map((resource, index) => (
                          <button
                            key={index}
                            className={`resource-btn ${resource.type}`}
                            onClick={() => handleResourceClick(resource)}
                            title={resource.title}
                          >
                            <resource.icon size={16} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="card-content">
                    <div className="feedback-content">
                      {isChecking || isLoadingSolution ? (
                        <div className="loading-feedback">
                          <div className="spinner"></div>
                          <span>
                            {isLoadingSolution
                              ? "Generando explicación de la solución..."
                              : "Analizando tu código con IA..."}
                          </span>
                        </div>
                      ) : aiFeedback ? (
                        <div className="feedback-response">
                          <div className={`feedback-text ${isShowingSolution ? "solution-mode" : ""}`}>
                            {aiFeedback}
                          </div>
                          <button className="more-info-btn">
                            <ExternalLink size={12} />
                            Más información
                          </button>
                        </div>
                      ) : (
                        <p className="feedback-placeholder">
                          La retroalimentación de IA aparecerá aquí después de evaluar tu código.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Control Buttons */}
            <div className="controls-section">
              <div className="card">
                <div className="card-content">
                  <div className="control-buttons">
                    <button
                      className="control-btn secondary"
                      onClick={handlePreviousProblem}
                      disabled={currentProblemIndex === 0}
                    >
                      <ChevronLeft size={16} />
                      <span>Anterior</span>
                    </button>

                    <button className="control-btn secondary" onClick={handleNextProblem}>
                      <span>Siguiente</span>
                      <ChevronRight size={16} />
                    </button>

                    <button className="control-btn solution" onClick={handleSolve} disabled={isLoadingSolution}>
                      {isLoadingSolution ? <div className="spinner small"></div> : <Lightbulb size={16} />}
                      <span>{isLoadingSolution ? "Cargando..." : "Mostrar Solución"}</span>
                    </button>

                    <button className="control-btn primary" onClick={handleCheck} disabled={isChecking}>
                      {isChecking ? <div className="spinner small"></div> : <CheckCircle size={16} />}
                      <span>{isChecking ? "Evaluando..." : "Evaluar"}</span>
                    </button>

                    <button className="control-btn danger">
                      <X size={16} />
                      <span>Salir</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Footer */}
        <ProgressFooter
          completedExercises={completedExercises}
          totalExercises={totalExercises}
          currentLevel={currentLevel}
        />
      </div>
    </div>
  )
}

export default SpikeV2
