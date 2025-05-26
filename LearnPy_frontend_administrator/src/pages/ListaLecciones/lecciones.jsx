import { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ModalEliminar from "../../components/ModalEliminar/ModalEliminar";
import "./lecciones.css";

const API_URL = "http://localhost:5000/lesson";

// Datos falsos para pruebas
const LECCIONES_FALSAS = [
    {
        id: 1,
        titulo: "Introducción a Python",
        descripcion: "Conceptos básicos del lenguaje Python",
        nombre: "Introducción a Python"
    },
    {
        id: 2,
        titulo: "Estructuras de datos",
        descripcion: "Listas, tuplas y diccionarios en Python",
        nombre: "Estructuras de datos"
    },
    {
        id: 3,
        titulo: "Funciones en Python",
        descripcion: "Cómo crear y usar funciones",
        nombre: "Funciones en Python"
    },
    {
        id: 4,
        titulo: "Programación orientada a objetos",
        descripcion: "Clases y objetos en Python",
        nombre: "Programación orientada a objetos"
    },
    {
        id: 5,
        titulo: "Manejo de archivos",
        descripcion: "Lectura y escritura de archivos",
        nombre: "Manejo de archivos"
    }
];


const Lecciones = () => {
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
            // Simulamos un retraso de red
            await new Promise(resolve => setTimeout(resolve, 800));

            // Usamos los datos falsos
            setLecciones(LECCIONES_FALSAS);
            setSeleccionados([]);
        } catch (err) {
            setError("Error al cargar lecciones");
            console.error(err);
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarLecciones();
    }, [cargando]);
    // Función simulada para eliminar lecciones
    const eliminarLecciones = async (tipo, datos) => {
        // Simulamos un retraso de red
        await new Promise(resolve => setTimeout(resolve, 500));

        if (tipo === "delete_many") {
            // Eliminar múltiples lecciones
            return new Promise((resolve) => {
                setLecciones(prev => prev.filter(l => !datos.ids.includes(l.id)));
                resolve();
            });
        } else {
            // Eliminar una sola lección
            return new Promise((resolve) => {
                setLecciones(prev => prev.filter(l => l.id !== datos.id));
                resolve();
            });
        }
    };

    const confirmarEliminar = async () => {
        setCargando(true);
        setError(null);
        try {
            if (haySeleccionados) {
                await eliminarLecciones("delete_many", { ids: seleccionados });
                setSeleccionados([]);
            } else {
                await eliminarLecciones("delete", { id: leccionEliminar.id });
            }
            setModalEliminar(false);
        } catch (err) {
            setError("Error al eliminar lecciones");
            console.error(err);
        } finally {
            setCargando(false);
        }
    };

    // const cargarLecciones = useCallback(async () => {
    //     setCargando(true);
    //     setError(null);
    //     try {
    //         const response = await fetch(`${API_URL}/get_all`);
    //         if (!response.ok) throw new Error("Error al cargar lecciones");
    //         const data = await response.json();
    //         setLecciones(data);
    //         setSeleccionados([]);
    //     } catch (err) {
    //         setError(err.message);
    //     } finally {
    //         setCargando(false);
    //     }
    // }, []);

    /**    useEffect(() => {
            cargarLecciones();
        }, [cargarLecciones]);
    
        const eliminarLecciones = async (endpoint, body) => {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            if (!response.ok) throw new Error("Error al eliminar lecciones");
        };
    
        const confirmarEliminar = async () => {
            setCargando(true);
            setError(null);
            try {
                if (haySeleccionados) {
                    await eliminarLecciones("delete_many", { ids: seleccionados });
                    setSeleccionados([]);
                } else {
                    await eliminarLecciones("delete", { id: leccionEliminar.id });
                }
                cargarLecciones();
                setModalEliminar(false);
            } catch (err) {
                setError(err.message);
            } finally {
                setCargando(false);
            }
        };
        */

    const handleSeleccion = (id) => {
        setSeleccionados((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const seleccionarTodos = () => {
        setSeleccionados(todosSeleccionados ? [] : lecciones.map((l) => l.id));
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
        <tr key={leccion.id}>
            <td>
                <input
                    type="checkbox"
                    checked={seleccionados.includes(leccion.id)}
                    onChange={() => handleSeleccion(leccion.id)}
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