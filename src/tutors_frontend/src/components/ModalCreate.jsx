import { tutors_backend } from 'declarations/tutors_backend';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function ModalCreate(props) {
    const [show, setShow] = useState(false);
    const ref = useRef(null);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
    };

    const saveTutor = async (e) => {
        e.preventDefault();
        const form = ref.current.elements;
        const name = form.name.value;
        const category = parseInt(form.category.value);
        const subject = form.subject.value;
        const cost = parseFloat(form.cost.value);
        const phone = form.phone.value;
        await tutors_backend.create(name, category, subject, cost, phone);
        props.handler();
        setShow(false);
    };

    return (
    <>
        <button variant="primary" onClick={handleShow}>Registrar</button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register a course</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={saveTutor} controlId="formCreateTutor" ref={ref}>
                    <Form.Group as={Row} className="mb-3" controlId="formName">
                        <Form.Label column sm="4">Full</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Full name" name="name" required="required" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formCategory">
                        <Form.Label column sm="4">Category</Form.Label>
                        <Col sm="8">
                            <Form.Select aria-label="Default select example" name="category" required="required">
                                <option value="">Select a category</option>
                                {Object.entries(props.categories).map((category) => {
                                    return (
                                    <option value={category[0]}>{category[1]}</option>
                                    );
                                })}
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formSubject">
                        <Form.Label column sm="4">Subject</Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Curse name" required="required" name="subject" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formCost">
                        <Form.Label column sm="4">Cost</Form.Label>
                        <Col sm="8">
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                                <Form.Control type="number" placeholder="Cost" required="required" min="0" step="0.01" name="cost" />
                            </InputGroup>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3" controlId="formPhone">
                        <Form.Label column sm="4">Phone</Form.Label>
                        <Col sm="8">
                            <Form.Control type="tel" placeholder="Phone" name="phone" required="required" />
                        </Col>
                    </Form.Group>
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={saveTutor}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
}

export default ModalCreate;
