import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import parse from 'html-react-parser';

function Confirmation(props) {
    const { show, handleClose, onConfirm } = props;

    const handleConfirm = () => {
        onConfirm();
        props.handleClose();
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            // keyboard={false} 
        >
            <Modal.Header>
                <Modal.Title className='fw-bold text-center w-100'>
                    {props.title || "Confirmation"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* parse() is used to render HTML content */}
                {parse(props.message)}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirmation;