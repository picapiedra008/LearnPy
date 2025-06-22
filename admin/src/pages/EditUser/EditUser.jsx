import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./EditUser.css";

const API_URL = "http://localhost:5000/user";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState(1);
  const [error, setError] = useState({});
  const [cargando, setCargando] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const res = await fetch(`${API_URL}/get_user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: parseInt(id) }),
        });

        if (!res.ok) throw new Error("Error al obtener usuario");
        const data = await res.json();
        setNombre(data.name);
        setEmail(data.email);

        const tipoRecibido = parseInt(data.type);
        if ([1, 2, 3].includes(tipoRecibido)) {
          setTipo(tipoRecibido);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError({ general: "No se pudo cargar el usuario." });
      } finally {
        setCargando(false);
      }
    };

    cargarUsuario();
  }, [id]);

  const confirmSubmit = async () => {
    setCargando(true);
    setMostrarModal(false);

    try {
      const response = await fetch(`${API_URL}/edit_user`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: parseInt(id),
          name: nombre.trim(),
          email: email.trim(),
          type: tipo,
        }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw new Error(data.errors?.join(", ") || data.error || "Error desconocido");
      }

      navigate("/ListUsers");
    } catch (err) {
      setError({ general: `Error al editar usuario: ${err.message}` });
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    const trimmedNombre = nombre.trim();
    const trimmedEmail = email.trim();

    const nombreValido = /^[a-zA-Z][a-zA-Z0-9_ .]{2,40}$/.test(trimmedNombre);
    const emailValido = /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(trimmedEmail);

    if (!nombreValido) {
      newErrors.nombre = "El nombre debe tener entre 3 y 40 caracteres, comenzar con una letra y puede contener letras, números, espacios, punto o guion bajo.";
    }

    if (!emailValido) {
      newErrors.email = "Debe ingresar un correo válido que termine en @gmail.com.";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    setMostrarModal(true);
  };

  if (cargando && !mostrarModal) {
    return <p className="loading-message">Cargando usuario...</p>;
  }

  if (error.general && !mostrarModal) {
    return (
      <div className="admin-container">
        <Header titulo="Editar Usuario" />
        <p className="error-message">{error.general}</p>
        <button className="cancel-button" onClick={() => navigate("/ListUsers")}>
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <Header titulo="Editar Usuario" />
      <div className="admin-content">
        <main className="admin-main">
          <form className="usuario-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              {error.nombre && <p className="error-message">{error.nombre}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email (solo @gmail.com)</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error.email && <p className="error-message">{error.email}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="tipo">Tipo de Usuario</label>
              <select
                id="tipo"
                value={tipo}
                onChange={(e) => setTipo(Number(e.target.value))}
              >
                <option value={1}>Estudiante</option>
                <option value={2}>Docente</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={cargando}>
                {cargando ? "Guardando..." : "Guardar Cambios"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/ListUsers")}
                className="cancel-button"
                disabled={cargando}
              >
                Cancelar
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* MODAL DE CONFIRMACIÓN */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Estás seguro de que deseas modificar este usuario?</p>
            <div className="modal-buttons">
              <button onClick={confirmSubmit} disabled={cargando}>
                Sí, confirmar
              </button>
              <button onClick={() => setMostrarModal(false)} disabled={cargando}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
