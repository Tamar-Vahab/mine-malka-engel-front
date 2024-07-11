import { t } from "i18next";
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export const PopUp = () => {
    const [showModal, setShowModal] = useState(false);
    // to navigate the page after paying
    //const myNavigate = useNavigate();
    const handleClose = () => {setShowModal(false);/* myNavigate('./myHome'); //why it doesnt work??*/};
    const handleShow = () => setShowModal(true);
    return (<>
    <Button variant="primary" onClick={handleShow}>
        Open Popup
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('popUpPage.modalTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {/* Add additional buttons if needed */}
        </Modal.Footer>
      </Modal>
      </>
    );
}