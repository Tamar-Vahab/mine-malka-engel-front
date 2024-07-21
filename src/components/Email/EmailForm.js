import React, { useState } from 'react';
import { Container, Form, Button, Modal } from 'react-bootstrap';
import { addEmail } from '../../axios/EmailAxios';

export const EmailForm = () => {
  const [error, setError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [newE, setNewE] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewE({
      ...newE,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before new request
    try {
      await addEmail(newEmail);
      setShowSuccessModal(true); // Show success modal
      setTimeout(() => {
        setShowSuccessModal(false); // Close the modal after 2 seconds
      }, 2000);
    } catch (err) {
      alert("לא הצלחנו להכניס את הנתונים נראה שאין לך חיבור לשרת");
      setError(err.message); // Optional: set error state to display in the UI
    }

  };

  const newEmail = {
    greeting: "string",
    toAddress: "string",
    subject: "string",
    body: "string",
    isBodyHtml: true,
    message: newE.message,
    email: newE.email,
    name: newE.name
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>שם</Form.Label>
          <Form.Control
            type="text"
            name="name"
            // placeholder="Enter your name"
            defaultValue={newE.name}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>כתובת אימייל</Form.Label>
          <Form.Control
            type="email"
            name="email"
            // placeholder="Enter your email"
            defaultValue={newE.email}
            onChange={handleChange}
            required />
        </Form.Group>
        <Form.Group controlId="formMessage">
          <Form.Label>הודעה</Form.Label>
          <Form.Control
            as="textarea"
            name="message"
            // placeholder="Enter your message"
            defaultValue={newE.message}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          שלח
        </Button>
      </Form>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>הצטרפת בהצלחה</Modal.Title>
        </Modal.Header>
        <Modal.Body>הצטרפת בהצלחה לרשימת התפוצה שלנו!</Modal.Body>
      </Modal>
    </Container>
  );
};

export default EmailForm;
