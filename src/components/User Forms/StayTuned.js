import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { LoginUser } from '../../axios/UsersAxios';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { connect, setCurrentUser } from '../../redux/DataActions/DataAction.Users';
import useValidation from './useValidation';

export const StayTuned = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState({});
  const [errorLoginingin, setErrorLoginingin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { validForm, emailError, passwordError } = useValidation();

  const handleLogin = async () => {
    if (validForm(user)) {
      let userLogin = await LoginUser(user.email, user.passwordHash);
      if (userLogin != null && userLogin.status === 200) {
        dispatch(setCurrentUser(userLogin.data));
        dispatch(connect());
        navigate(-1);
      } else if (userLogin == null) {
        alert("Network Error");
      } else {
        setErrorLoginingin(true);
      }
    }
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <div className="login-form-wrapper">
            <h2 className="text-center">{t('loginPage.title')}</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{t('loginPage.email')}</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => { validForm(user); setUser({ ...user, email: e.target.value }) }}
                />
                {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label>{t('loginPage.password')}</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => { validForm(user); setUser({ ...user, passwordHash: e.target.value }) }}
                />
                {passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
                <Link to="/myResetPassword" className="d-block mt-2">{t('loginPage.forgot')}</Link>
              </Form.Group>

              <Button className="w-100 mt-3" onClick={handleLogin}>
                {t('loginPage.loginButton')}
              </Button>
              <div className="text-center mt-3">
                {t('loginPage.noAccount')}
                <Link to="/mySignUp" className="d-block mt-2">{t('loginPage.createAccount')}</Link>
                {errorLoginingin && <div style={{ color: 'red' }}>{t('loginPage.errorLoging')}</div>}
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
