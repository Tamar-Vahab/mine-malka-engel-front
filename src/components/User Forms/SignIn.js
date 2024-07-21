import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { GetAllUsers, GetUserDetails, LoginUser } from '../../axios/UsersAxios';
import { Link, Route, useNavigate } from 'react-router-dom';
// import { connect, setCurrentUser } from '../../redux/DataActions/DataAction.Users';
import { ResetPassword } from './ResetPassword';
import useValidation from './useValidation';
import { useConnectUser } from './useConnectUser';


export const Login = () => {
  const { t, i18n } = useTranslation();
  const [user, setUser] = useState({});
  //
  const [showModal, setShowModal] = useState(true);
  const [errorLoginingin, setErrorLoginingin] = useState(false);

  //יצירת משנה שישמש לניווט
  const navigate = useNavigate()

  //Custom Hook for Validation
  const { validForm,
    //משתנים לבדיקות תקינות 
    emailError, passwordError } = useValidation()
  const { ConnectMe } = useConnectUser()
  const handleClose = () => { navigate(-1) };

  //--------------------------------------------------------------------------
  //Function to handle login
  const handleLogin = async () => {
    if (validForm(user)) {
      //Go to DB ......
      let userLogin = await LoginUser(user.email, user.passwordHash);
      if (userLogin != null && userLogin.status == 200) {
        debugger
        //User exists in the database

        debugger
        //  let current = await GetUserDetails(userLogin.data.token);
        // dispatch(setCurrentUser(current.data));
        ConnectMe()
        //save in cookies

        //Go to last page you visited
        navigate(-1)
      }
      else if (userLogin.code === "ERR_BAD_RESPONSE")
        setErrorLoginingin(true)
      else {
        alert("Network Error")
      }
    }
  }
  const style3 = {
    ' width': '100%',
    ' height': '700px',
    'border': '5px'
  }
  const f = () => {
    <ResetPassword />
  }
  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Body>
        {/*  */}
        <Container className="d-flex justify-content-center align-items-center vh-50" style={style3}>
          <Row className="w-100">
            <Col xs={80} md={50} lg={100} className="mx-auto">
              <Form>
                <br></br>
                <h3 className="text-center mb-4">{t('loginPage.title')}</h3>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label> {t('loginPage.email')}</Form.Label>
                  <Form.Control type="email"
                    onChange={(e) => { validForm(user); { setUser({ ...user, email: e.target.value }) } }} />
                  {/* onChange={(e) => {setUser({ ...user, email: e.target.value })}} /> */}
                  {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mt-3">
                  <Form.Label> {t('loginPage.password')}
                  </Form.Label>
                  <Form.Control type="password"
                    onChange={(e) => { validForm(user); setUser({ ...user, passwordHash: e.target.value }) }} />
                  {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                  <Link to="/myResetPassword">{t('loginPage.forgot')}</Link>

                </Form.Group>

                <Button className="w-100 mt-3" onClick={() => handleLogin()}>
                  {t('loginPage.loginButton')}
                </Button>
                <div className="text-center mt-3">   {t('loginPage.noAccount')}
                  <Link to="/mySignUp">{t('loginPage.createAccount')}</Link>
                  {errorLoginingin && <div style={{ color: 'red' }}>{t('loginPage.errorLoging')}</div>}

                </div>
              </Form>
            </Col>
          </Row>
        </Container>
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

};

