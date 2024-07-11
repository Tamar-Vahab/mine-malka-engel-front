import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { PutUser } from '../../axios/UsersAxios';
import { setCurrentUser } from '../../redux/DataActions/DataAction.Users';
import useValidation from './useValidation';
import { useConnectUser } from './useConnectUser';

export const Profile = () => {
    const { t, i18n } = useTranslation();

  const [isEditing, setIsEditing] = useState(false);
  const currentUser = useSelector(s=>s.DataReducer_Users.currentUser);
  const {ConnectMe} = useConnectUser()

  const [profileData, setProfileData] = useState(currentUser)
  const [isChecked, setIsChecked] = useState(profileData.typeID === 2);
  //Custom Hook for Validation
  const {validForm,
    //משתנים לבדיקות תקינות 
    emailError, passwordError, phoneNumberError} = useValidation()

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async() => {
    if(profileData.typeID)
        setProfileData({ ...profileData, typeID: 2})
    else 
        setProfileData({ ...profileData, typeID: 1})
    //בדיקת תקינות קלטים
    debugger
if(validForm(profileData)){
    // כאן אפשר להוסיף לוגיקה לשמירת הנתונים לשרת
   let result =await PutUser(profileData)
   debugger
   if(result && result.status==200)
    {
        setCurrentUser(profileData)
        ConnectMe()
        setIsEditing(false);

    }
else{
    alert("Network error")
}

  };
  }
  return <>
          
<Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="text-center">{t('profilePage.title')}</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>{t('profilePage.userName')}</Form.Label>
              <Form.Control type="text" name="username" value={profileData.name}   
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}                
                readOnly={!isEditing}/> 
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>{t('profilePage.phoneNumber')}</Form.Label>
              <Form.Control type="text" name="phone"  
                value={profileData.phoneNumber}
                onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}                
                readOnly={!isEditing}
              />
           {phoneNumberError && <div style={{ color: 'red' }}>{t('signUpPage.invalidphoneNumber')}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>{t('profilePage.email')}</Form.Label>
              <Form.Control    type="email"  name="email" 
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}                
                readOnly={!isEditing}
              />
             {emailError && <div style={{ color: 'red' }}>{t('signUpPage.invalidEmail')}</div>}
             
            </Form.Group>

            <Form.Group controlId="formType">
              <Form.Label> {t('signUpPage.typeName')}</Form.Label>
                <input type="checkbox"
                 checked={isChecked}
                 onChange={(e) => setProfileData({ ...profileData,typeID : e.target.checked})}
                 disabled={!isEditing} 
                 />
              </Form.Group>


            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>{t('profilePage.password')}</Form.Label>
              <Form.Control
                type="text"
                name="password"
                value={profileData.passwordHash}
                onChange={(e) => setProfileData({ ...profileData, passwordHash: e.target.value })}                
                readOnly={!isEditing}
              />
{passwordError && <div style={{ color: 'red' }}>{t('signUpPage.invalidPassword')}</div>}
            </Form.Group>

            {isEditing ? (
              <Button variant="primary" onClick={handleSave}>
                {t('profilePage.saveButton')}
              </Button>
            ) : (
              <Button variant="secondary" onClick={handleEdit}>
                {t('profilePage.editButton')}
              </Button>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  </>;
};

