//עמוד זה- המנהל שולח מייל עם או בלי קבצים עבור  כתובת אחת
import React, { useState } from 'react';
import { Container, Form, Button,Modal } from 'react-bootstrap';
import { sendEmailsForAllUsers } from '../../axios/EmailAxios';

export const MailingList = () => {
  const [newE, setNewE] = useState({
    Greeting: '',
    Subject: '',
    Body: '',
    Attachments: []
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSuccessModal(true); // Show success modal
    setTimeout(() => {
      setShowSuccessModal(false); // Close the modal after 2 seconds
    }, 2000);
    const { Greeting, Subject, Body, Attachments } = newE;
    try {
      await sendEmailsForAllUsers({ Greeting,Subject, Body, Attachments });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Attachments") {
      const updatedAttachments = [...newE.Attachments];
      updatedAttachments[e.target.dataset.index] = files[0];
      setNewE({
        ...newE,
        Attachments: updatedAttachments
      });
    } else {
      setNewE({
        ...newE,
        [name]: value
      });
    }
  };

  const handleAddFile = () => {
    setNewE({
      ...newE,
      Attachments: [...newE.Attachments, null]
    });
  };

  const handleRemoveAttachment = (index) => {
    const updatedAttachments = [...newE.Attachments];
    updatedAttachments.splice(index, 1);
    setNewE({
      ...newE,
      Attachments: updatedAttachments
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formGreeting">
          <Form.Label>מילת פתיחה</Form.Label>
          <Form.Control
            type="text"
            name="Greeting"
            // placeholder="Greeting"
            value={newE.Greeting}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formSubject">
          <Form.Label>נושא</Form.Label>
          <Form.Control
            type="text"
            name="Subject"
            // placeholder="Subject"
            value={newE.Subject}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBody">
          <Form.Label> הודעה</Form.Label>
          <Form.Control
            as="textarea"
            name="Body"
            // placeholder="Body"
            value={newE.Body}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {newE.Attachments.map((file, index) => (
          <div key={index}>
            <Form.Group controlId={`formAttachments${index}`}>
              <Form.Label>קבצים </Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="file"
                  name="Attachments"
                  data-index={index}
                  onChange={handleChange}
                  className="mb-2 mr-2"
                />
                <Button variant="danger" onClick={() => handleRemoveAttachment(index)}>Remove</Button>
              </div>
            </Form.Group>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddFile}>
          הוספת קובץ
        </Button>
        <Button variant="primary" type="submit" className="ml-2">
          שלח
        </Button>
      </Form>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>נשלח בהצלחה</Modal.Body>
      </Modal>
    </Container>
  );
};
export default MailingList;