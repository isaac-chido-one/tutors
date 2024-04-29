import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ModalCreate() {
    const [showModalEditar, setShowModalEditar] = useState(false);

    function handleCloseModalEditar() {
        console.log('handleCloseModalEditar');
    };

    function updateUser() {
        console.log('updateUser');
    };

    return (
<div>
    <div className="modal" tabindex="-1" id="modal_create">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Modal body text goes here.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" className="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <Modal show={showModalEditar} onHide={handleCloseModalEditar}>
        <Modal.Header closeButton>
            <Modal.Title>Actualizar usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="card">
                <div className="card-body">
                    <form id="formEditar" >
                    <div className="form-group">
                        <label htmlFor="nombre" >Nombre usuario</label>
                        <input type="text" className="form-control" id="nombre" placeholder="Juan" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="primerApellido" >Primer apellido</label>
                        <input type="text" className="form-control" id="primerApellido" placeholder="Pérez" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="segundoApellido" >Segundo apellido</label>
                        <input type="text" className="form-control" id="segundoApellido" placeholder="López" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="alias" >Alias</label>
                        <input type="text" className="form-control" id="alias" placeholder="juanito" />
                    </div>
                    <br />
                    </form>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalEditar}>
                Cerrar
            </Button>
            <Button variant="primary"  onClick={updateUser}>
                Guardar
            </Button>
        </Modal.Footer>
    </Modal>
</div>
    );

}

export default ModalCreate;
