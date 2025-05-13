import { Link } from "react-router-dom"
import "./ListaLecciones.css"

const ListaLecciones = () => {
  return (
    <div className="learnpy-container">
      <header className="learnpy-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">LP</div>
            <nav className="header-nav">
              <Link to="/" className="nav-link active">
                Mis Lecciones
              </Link>
              <Link to="#" className="nav-link">
                Otros
              </Link>
            </nav>
          </div>
          <div className="header-right">
            <button className="notification-btn">
              <i className="bell-icon"></i>
              <span className="notification-badge"></span>
            </button>
            <div className="profile-avatar">
              <img src="/placeholder.svg?height=32&width=32" alt="Perfil" />
            </div>
          </div>
        </div>
      </header>

      <main className="learnpy-main">
        <div className="lista-header">
          <h2>Mis Lecciones</h2>
          <Link to="/crear-leccion" className="add-lesson-btn">
            Agregar Lección
          </Link>
        </div>

        <div className="lessons-grid">
          <div className="lesson-card">
            <div className="lesson-image">
              <img src="/placeholder.svg?height=160&width=320" alt="Portada de lección" />
            </div>
            <div className="lesson-content">
              <h3>Introducción a Python</h3>
              <p>Conceptos básicos de Python para principiantes</p>
              <div className="lesson-footer">
                <span className="level-badge beginner">Principiante</span>
                <div className="lesson-actions">
                  <button className="action-btn edit">
                    <i className="edit-icon"></i>
                  </button>
                  <button className="action-btn delete">
                    <i className="delete-icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lesson-card">
            <div className="lesson-image">
              <img src="/placeholder.svg?height=160&width=320" alt="Portada de lección" />
            </div>
            <div className="lesson-content">
              <h3>Estructuras de Datos en Python</h3>
              <p>Listas, diccionarios, tuplas y conjuntos</p>
              <div className="lesson-footer">
                <span className="level-badge intermediate">Intermedio</span>
                <div className="lesson-actions">
                  <button className="action-btn edit">
                    <i className="edit-icon"></i>
                  </button>
                  <button className="action-btn delete">
                    <i className="delete-icon"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ListaLecciones
