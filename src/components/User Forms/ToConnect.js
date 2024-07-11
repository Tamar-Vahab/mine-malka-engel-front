
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const ToConnect = () => {
    const navigate = useNavigate();
    const handleClose = () => {navigate('/myOrderForm')};
    const handleShowLogin = () => {navigate('/myLogin')}; 
    const handleShowLogin2 = () => {navigate('/myOrderForm')};  
    const { currentUser, connected } = useSelector(u => u.DataReducer_Users);


    return (
      <div>
      <Modal show={!connected} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>אתם לא מחוברים</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>כדי להמשיך, בבקשה ללכת ל-<Button variant="link" onClick={handleShowLogin}>התחברות</Button>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={connected} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>אתם מחוברים</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p> שנמשיך<Button variant="link" onClick={handleShowLogin2}>continue</Button>.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            סגור
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  };
  