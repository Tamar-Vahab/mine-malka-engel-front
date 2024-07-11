import React,{ useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useValidation from './useValidation';
import { SendEmail, SendEmailToReset } from '../../axios/EmailAxios';

export const ResetPassword=()=>{

    const { t, i18n } = useTranslation();
    // const [user, setUser] = useState({});
    const [emailError, setEmailError] = useState('');
//Email
const [emailRequest, setEmailRequest]=useState({
    toAddress: "",
    subject: "Email to reset password",
    body: "Click on this link...........",
    isBodyHtml: false
  } )  
//Pupup 
const [showModal, setShowModal] = useState(true);
const [restSec, setRestSec] = useState(false);

const handleClose = () => {navigate(-2)};    
  //יצירת משנה שישמש לניווט
  const navigate = useNavigate()
   //Custom Hook for Validation
 const {validateEmail} = useValidation()

//On click function
const handleClick= async() => {
    debugger
    if (!validateEmail(emailRequest.toAddress)) {
        setEmailError(t('resetPasswordPage.invalidEmail'));
    }
    else{
        setEmailError('');
    //Send a Email to Rest the password
//כאן צריך להיות פעולה של שליחת מייל 
//המייל יכנס ל - '/myResetPasswordLink'
debugger
let result = await SendEmailToReset(emailRequest.toAddress)
if (result && result.status == 200)
//Go back
        setRestSec(true)
// navigate(-2) 
else
alert("Network error: ")
    }
}
const style3={
    ' width': '100%',
    ' height': '700px',
     'border': '5px'
   }
return<>

<Modal show={showModal} onHide={handleClose}  centered> 
    <Modal.Body>
{/*  */}
{restSec?(<h3 className="text-center">{t('resetPasswordPage.secMassage')}</h3>):(
<Container className="d-flex justify-content-center align-items-center vh-50" style={style3}>
    <Row className="w-100">
      <Col xs={80} md={50} lg={100} className="mx-auto">
        <Form className="text-center">
            <h3>{t('resetPasswordPage.title')}</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label > {t('resetPasswordPage.putEmail')}</Form.Label>
            <Form.Control type="email"
             onChange={(e) => {setEmailRequest({ ...emailRequest, toAddress: e.target.value })}} />
              {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          </Form.Group>

          <Button className="w-100 mt-3" onClick={handleClick}>
          {t('resetPasswordPage.resetButton')}
          </Button>
          </Form>
      </Col>
    </Row>
  </Container>)}
{/*  */}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      {/* Add additional buttons if needed */}
    </Modal.Footer>
  </Modal>
 
      
);
  </>
};
