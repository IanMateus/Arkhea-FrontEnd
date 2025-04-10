import { Button, Modal } from 'react-bootstrap';

function Error_Modal(state) {
    return (
            <Modal show = {state.error_state.active} onHide={() => state.error_state.setActive(false)}>
                <Modal.Header closeButton>
                    {state.error_state.name}
                </Modal.Header>
                <Modal.Body>
                    {state.error_state.message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {state.error_state.onCancel(); state.error_state.setActive(false)}}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => {state.error_state.onConfirm(); state.error_state.setActive(false)}}>
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
)}

export default Error_Modal;