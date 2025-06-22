import { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ModalEliminar from "../../components/ModalEliminar/ModalEliminar";
import "./lecciones.css";

import { obtenerLecciones } from "../../repositories/LeccionRepository";

const API_URL = "http://localhost:5000/lesson";

const Lecciones = () => {
    const [userCode] = useState(1);
    const [lecciones, setLecciones] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [leccionEliminar, setLeccionEliminar] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const todosSeleccionados = seleccionados.length === lecciones.length && lecciones.length > 0;
    const haySeleccionados = seleccionados.length > 0;

    // Función simulada para cargar lecciones
    const cargarLecciones = useCallback(async () => {
        setCargando(true);
        setError(null);
        try {
            // Usamos los datos falsos
            var data = await fetch(`${API_URL}/get_lessons`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_code: userCode })
            });
            console.log(data)
            if (!data.ok) {
                data = await obtenerLecciones();
                //throw new Error("Error al cargar lecciones");
            }
            //var data = await obtenerLecciones();
            setLecciones(data);
            setSeleccionados([]);
        } catch (err) {
            setError("Error al cargar lecciones");
            console.error(err);
        } finally {
            setCargando(false);
        }
    }, [userCode]);

    useEffect(() => {
        cargarLecciones();
    }, [cargarLecciones]);

    const eliminarLeccion = async (endpoint, code) => {
        const response = await fetch(`${API_URL}/${endpoint}/${code}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar: ${response.status}`);
        }
    };

    const eliminarLecciones = async (endpoint, body) => {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar: ${response.status}`);
        }
    };

    const confirmarEliminar = async () => {
        setCargando(true);
        setError(null);
        try {
            if (haySeleccionados) {
                await eliminarLecciones("delete_lessons", { codes: seleccionados });
                setSeleccionados([]);
            } else {
                console.log("Code a eliminar: " + leccionEliminar.code)
                await eliminarLeccion("delete_lesson2", { code: leccionEliminar.code });
            }
            cargarLecciones();
            setModalEliminar(false);
        } catch (err) {
            setError(err.message);
            console.error("Error al eliminar: ", err);
        } finally {
            setCargando(false);
        }
    };

    const handleSeleccion = (code) => {
        setSeleccionados((prev) =>
            prev.includes(code) ? prev.filter((id) => id !== code) : [...prev, code]
        );
    };

    const seleccionarTodos = () => {
        setSeleccionados(todosSeleccionados ? [] : lecciones.map((l) => l.code));
    };

    const abrirModalEliminar = (leccion) => {
        setLeccionEliminar(leccion);
        setModalEliminar(true);
    };

    const eliminarSeleccionados = () => {
        setModalEliminar(true);
        setLeccionEliminar({ nombre: `${seleccionados.length} lecciones` });
    };

    const renderLeccionFila = (leccion) => (
        <tr key={leccion.code}>
            <td>
                <input
                    type="checkbox"
                    checked={seleccionados.includes(leccion.code)}
                    onChange={() => handleSeleccion(leccion.code)}
                />
            </td>
            <td>{leccion.titulo}</td>
            <td>{leccion.descripcion}</td>
            <td className="acciones">
                <button className="btn-editar" title="Editar lección">
                    <i className="edit-icon">✏️</i>
                </button>
                <button className="btn-eliminar" onClick={() => abrirModalEliminar(leccion)} title="Eliminar lección">
                    <i className="delete-icon" style={{ color: "red" }}>🗑️</i>
                </button>
            </td>
        </tr>
    );

    return (
        <div className="admin-container">
            <Header titulo="LearnPy Administrator" />
            <div className="admin-content">
                <aside className="admin-sidebar">
                    <div className="sidebar-item">
                        <i className="user-icon docente"></i> Docentes
                    </div>
                    <div className="sidebar-item">
                        <i className="user-icon estudiante"></i> Estudiantes
                    </div>
                    <div className="sidebar-item active">
                        <i className="user-icon leccion"></i> Lecciones
                    </div>
                </aside>

                <main className="admin-main">
                    {error && <div className="error-message">Error: {error}</div>}

                    <div className="table-actions">
                        <button
                            className="btn-eliminar-seleccionados"
                            onClick={eliminarSeleccionados}
                            disabled={!haySeleccionados || cargando}
                        >
                            Eliminar Seleccionados <i className="delete-icon">🗑</i>
                        </button>
                        <button className="btn-añadir" disabled={cargando}>
                            Añadir <i className="add-icon">+</i>
                        </button>
                    </div>

                    {cargando ? (
                        <div className="loading">Cargando lecciones...</div>
                    ) : (
                        <table className="usuarios-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            checked={todosSeleccionados}
                                            onChange={seleccionarTodos}
                                        />
                                    </th>
                                    <th>Título</th>
                                    <th>Descripción</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lecciones.length > 0 ? (
                                    lecciones.map(renderLeccionFila)
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="no-data">
                                            No hay lecciones para mostrar
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </main>
            </div>

            {modalEliminar && (
                <ModalEliminar
                    nombre={haySeleccionados ? `${seleccionados.length} lecciones seleccionadas` : leccionEliminar.nombre}
                    cargando={cargando}
                    onConfirmar={confirmarEliminar}
                    onCancelar={() => setModalEliminar(false)}
                />
            )}
        </div>
    );
};

export default Lecciones;