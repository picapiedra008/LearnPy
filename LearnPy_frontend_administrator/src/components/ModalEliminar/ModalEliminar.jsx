import "./ModalEliminar.css";

const ModalEliminar = ({ nombre, cargando, onConfirmar, onCancelar }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirmar eliminación</h2>
                <p>¿Está seguro que desea eliminar {nombre}?</p>
                <div className="modal-actions">
                    <button className="btn-cancelar" onClick={onCancelar} disabled={cargando}>
                        Cancelar
                    </button>
                    <button className="btn-confirmar" onClick={onConfirmar} disabled={cargando}>
                        {cargando ? "Eliminando..." : "Eliminar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEliminar;