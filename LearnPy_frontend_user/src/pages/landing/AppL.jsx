"use client"

import { useEffect, useState } from "react"
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle, Code, Zap, BookOpen, MessageSquare, Smartphone, BarChart } from "lucide-react"
import ParticlesContainer from "./components/ParticlesContainer"
import Button from "./components/Button"
import Card from "./components/Card"
import "./AppL.css";

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const fibonacci = (n) => {
      if (n <= 1) {
        return n
      } else {
        return fibonacci(n - 1) + fibonacci(n - 2)
      }
    }
    setResult(fibonacci(10))
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="sticky-header">
        <div className="container header-container">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-items-center"
          >
            <div className="logo-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 9H7.5a2.5 2.5 0 0 1 0-5H12m0 0v5m0-5h4.5a2.5 2.5 0 0 1 0 5H12" />
                <path d="M12 15H7.5a2.5 2.5 0 0 0 0 5H12m0 0v-5m0 5h4.5a2.5 2.5 0 0 0 0-5H12" />
              </svg>
            </div>
            <span className="logo-text">LearnPy</span>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="nav-links"
          >
            <a href="/listar" className="nav-link">
              Inicio
            </a>
            <a href="#features" className="nav-link">
              Características
            </a>
            <a href="#courses" className="nav-link">
              lecciones
            </a>
            <a href="#testimonials" className="nav-link">
              Testimonios
            </a>
          </motion.nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-items-center header-buttons"
          >
            <Button variant="outline" className="login-button">
              <span className="relative z-10">Iniciar Sesión</span>
            </Button>
            <Button className="register-button">
              <span className="relative z-10">Registrarse</span>
            </Button>
          </motion.div>
        </div>
      </header>

      <main className="main-content">
        {/* Hero Section */}
        <section className="hero-section">
          <ParticlesContainer />
          <div
            className="hero-background"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          ></div>
          <motion.div
            className="blob blob-1"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="blob blob-2"
            animate={{
              x: [0, -30, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <div className="container section-container">
            <div className="hero-grid">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="hero-content"
              >
                <div className="hero-text-container">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="hero-badge"
                  >
                    <span className="badge-text">Aprende Python de forma interactiva</span>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="hero-title"
                  >
                    Domina Python con nuestra plataforma Educativa
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="hero-description"
                  >
                    Aprende a programar con Python de manera efectiva con nuestros Lecciones y cursos interactivos, simuladores
                    visuales y evaluaciones en tiempo real.
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="hero-buttons"
                >
                  <Button className="start-button">
                    <span className="relative z-10">Comenzar Ahora</span>
                  </Button>
                  <Button variant="outline" className="demo-button">
                    <span className="relative z-10">Ver Demostración</span>
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="hero-features"
                >
                  <div className="feature-item">
                    <CheckCircle className="feature-icon purple" />
                    <span>Lecciones interactivos</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="feature-icon blue" />
                    <span>Feedback inmediato</span>
                  </div>
                  <div className="feature-item">
                    <CheckCircle className="feature-icon purple" />
                    <span>Certificación</span>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-image-container"
              >
                <div className="hero-image-glow"></div>
                <motion.div
                  className="code-editor"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                >
                  <div className="code-editor-inner">
                    <div className="code-editor-header">
                      <div className="window-controls">
                        <div className="control red"></div>
                        <div className="control yellow"></div>
                        <div className="control green"></div>
                      </div>
                      <div className="file-name">python_simulator.py</div>
                    </div>
                    <div className="code-editor-body">
                      <div className="code-line blue">def fibonacci(n):</div>
                      <div className="code-line comment"> """Return the nth Fibonacci number"""</div>
                      <div className="code-line purple indent-1"> if n &lt;= 1:</div>
                      <div className="code-line green indent-2"> return n</div>
                      <div className="code-line purple indent-1"> else:</div>
                      <div className="code-line green indent-2"> return fibonacci(n-1) + fibonacci(n-2)</div>
                      <div className="code-line blue mt-2">result = fibonacci(10)</div>
                      <div className="code-line yellow">print(f"The 10th Fibonacci number is: {result}")</div>
                      <motion.div
                        className="code-line output"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.5 }}
                      >
                        {result !== null && `# Output: The 10th Fibonacci number is: ${result}`}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className="floating-orb"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                ></motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="features-section">
          <motion.div
            className="blob blob-3"
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="blob blob-4"
            animate={{
              x: [0, -50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <div className="container section-container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="section-header"
            >
              <div className="section-header-content">
                <div className="section-badge">
                  <span className="badge-text">Características</span>
                </div>
                <h2 className="section-title">Funcionalidades principales del sistema</h2>
                <p className="section-description">
                  Nuestra plataforma está diseñada para ofrecer la mejor experiencia de aprendizaje de Python
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="features-grid"
            >
              {[
                {
                  title: "Simuladores visuales",
                  description: "Visualiza el comportamiento del código con simuladores interactivos",
                  icon: <Code className="feature-card-icon" />,
                  highlighted: true,
                },
                {
                  title: "Evaluaciones interactivas",
                  description: "Ejercicios de programación en tiempo real con feedback inmediato",
                  icon: <Zap className="feature-card-icon blue" />,
                  highlighted: true,
                },
                {
                  title: "Retroalimentación inmediata",
                  description: "Feedback instantáneo sobre errores en el código de los estudiantes",
                  icon: <CheckCircle className="feature-card-icon" />,
                  highlighted: true,
                },
                {
                  title: "Material educativo",
                  description: "Acceso a PDFs, videos y presentaciones de alta calidad",
                  icon: <BookOpen className="feature-card-icon blue" />,
                  highlighted: true,
                },
                {
                  title: "Chatbot integrado",
                  description: "Asistente virtual que responde preguntas sobre temas del curso",
                  icon: <MessageSquare className="feature-card-icon" />,
                  highlighted: true,
                },
                {
                  title: "Diseño responsive",
                  description: "Accede desde computadoras, tablets y dispositivos móviles",
                  icon: <Smartphone className="feature-card-icon blue" />,
                  highlighted: true,
                },
              ].map((feature, index) => (
                <motion.div key={index} variants={item}>
                  <Card className={`feature-card ${feature.highlighted ? "feature-card-highlighted" : ""}`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      className="feature-card-icon-container"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="feature-card-title">{feature.title}</h3>
                    <p className="feature-card-description">{feature.description}</p>
                    <div className="feature-card-line"></div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Courses Preview */}
        <section id="courses" className="courses-section">
          <div className="courses-background"></div>
          <motion.div
            className="blob blob-5"
            animate={{
              x: [0, 30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="blob blob-6"
            animate={{
              x: [0, -30, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <div className="container section-container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="section-header"
            >
              <div className="section-header-content">
                <div className="section-badge">
                  <span className="badge-text">Lecciones y cursos</span>
                </div>
                <h2 className="section-title">Nuestros Lecciones de Python</h2>
                <p className="section-description">
                  Desde principiantes hasta expertos, tenemos el curso perfecto para ti
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="courses-grid"
            >
              {[
                {
                  title: "Python para principiantes",
                  description: "Aprende los fundamentos de Python desde cero",
                  level: "Básico",
                  duration: "8 semanas",
                  image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=300&h=200&fit=crop",
                },
                {
                  title: "Estructuras de datos en Python",
                  description: "Domina listas, diccionarios, tuplas y más",
                  level: "Intermedio",
                  duration: "6 semanas",
                  image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
                },
                {
                  title: "Python para ciencia de datos",
                  description: "Aprende a analizar datos con pandas, numpy y matplotlib",
                  level: "Avanzado",
                  duration: "10 semanas",
                  image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
                },
              ].map((course, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="course-card">
                    <div className="course-image-container">
                      <img src={course.image || "/placeholder.svg"} alt={course.title} className="course-image" />
                      <div className="course-image-overlay"></div>
                      <div className="course-button-container">
                        <Button className="course-button">Ver detalles</Button>
                      </div>
                    </div>
                    <div className="course-content">
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      <div className="course-meta">
                        <div className="course-tags">
                          <span className="course-level">{course.level}</span>
                          <span className="course-duration">{course.duration}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="courses-button-container"
            >
              <Button className="view-all-button">
                <span className="relative z-10">Ver todos los Lecciones</span>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="testimonials-section">
          <motion.div
            className="blob blob-7"
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="blob blob-8"
            animate={{
              x: [0, -50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <div className="container section-container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="section-header"
            >
              <div className="section-header-content">
                <div className="section-badge">
                  <span className="badge-text">Testimonios</span>
                </div>
                <h2 className="section-title">Lo que dicen nuestros estudiantes</h2>
                <p className="section-description">
                  Miles de estudiantes han transformado sus carreras con nuestros Lecciones y cursos 
                </p>
              </div>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="testimonials-grid"
            >
              {[
                {
                  name: "Ana Martínez",
                  role: "Desarrolladora Web",
                  content:
                    "Gracias a los Leciones de Python, pude cambiar de carrera y ahora trabajo como desarrolladora. Los simuladores visuales fueron clave para entender conceptos complejos.",
                  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
                },
                {
                  name: "Carlos Rodríguez",
                  role: "Estudiante de Ingeniería",
                  content:
                    "La retroalimentación inmediata sobre mis errores me ayudó a mejorar rápidamente. Ahora puedo crear mis propios proyectos con confianza.",
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
                },
                {
                  name: "Laura Sánchez",
                  role: "Científica de Datos",
                  content:
                    "El curso de Python para ciencia de datos me dio las herramientas que necesitaba para avanzar en mi carrera. Altamente recomendado.",
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
                },
              ].map((testimonial, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="testimonial-card">
                    <div className="testimonial-content">
                      <div className="testimonial-quote-container">
                        <svg
                          className="testimonial-quote-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                        <p className="testimonial-text">{testimonial.content}</p>
                      </div>
                      <div className="testimonial-author">
                        <div className="testimonial-avatar-container">
                          <div className="testimonial-avatar-glow"></div>
                          <img
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            className="testimonial-avatar"
                          />
                        </div>
                        <div>
                          <h4 className="testimonial-name">{testimonial.name}</h4>
                          <p className="testimonial-role">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-background"></div>
          <div className="container section-container">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={container}
              className="stats-grid"
            >
              {[
                {
                  value: "10K+",
                  label: "Estudiantes",
                  icon: <BarChart className="stats-icon purple" />,
                },
                { value: "50+", label: "Cursos", icon: <BookOpen className="stats-icon blue" /> },
                {
                  value: "95%",
                  label: "Satisfacción",
                  icon: <CheckCircle className="stats-icon purple" />,
                },
                {
                  value: "24/7",
                  label: "Soporte",
                  icon: <MessageSquare className="stats-icon blue" />,
                },
              ].map((stat, index) => (
                <motion.div key={index} variants={item} className="stat-item">
                  {stat.icon}
                  <motion.div
                    className="stat-value"
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                    }}
                  >
                    {stat.value}
                  </motion.div>
                  <p className="stat-label">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-background"></div>
          <motion.div
            className="blob blob-9"
            animate={{
              x: [0, 50, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <motion.div
            className="blob blob-10"
            animate={{
              x: [0, -50, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          ></motion.div>
          <div className="container section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="cta-content"
            >
              <div className="cta-text">
                <h2 className="cta-title">Comienza tu viaje de aprendizaje hoy</h2>
                <p className="cta-description">
                  Únete a miles de estudiantes que están transformando sus carreras con Python
                </p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="cta-buttons"
              >
                <Button className="cta-button-primary">
                  <span className="relative z-10">Registrarse Gratis</span>
                </Button>
                <Button variant="outline" className="cta-button-secondary">
                  Ver planes premium
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <motion.div
          className="blob blob-11"
          animate={{
            x: [0, 30, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>
        <motion.div
          className="blob blob-12"
          animate={{
            x: [0, -30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>
        <div className="container footer-container">
          <div className="footer-grid">
            <div className="footer-column">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="footer-logo"
              >
                <div className="footer-logo-container">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 9H7.5a2.5 2.5 0 0 1 0-5H12m0 0v5m0-5h4.5a2.5 2.5 0 0 1 0 5H12" />
                    <path d="M12 15H7.5a2.5 2.5 0 0 0 0 5H12m0 0v-5m0 5h4.5a2.5 2.5 0 0 0 0-5H12" />
                  </svg>
                </div>
                <span className="footer-logo-text">LearnPy</span>
              </motion.div>
              <p className="footer-description">
                Plataforma líder en enseñanza de Python con Lecciones y cursos interactivos y herramientas innovadoras.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="social-icon"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="social-icon"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="social-icon"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="social-icon"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Plataforma</h3>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Cursos
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Tutoriales
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Ejercicios
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Certificaciones
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Comunidad
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Soporte</h3>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Centro de ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Contacto
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Recursos
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-column">
              <h3 className="footer-title">Legal</h3>
              <ul className="footer-links">
                <li>
                  <a href="#" className="footer-link">
                    Términos de servicio
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="footer-link">
                    Licencias
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2025 LearnPy. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
