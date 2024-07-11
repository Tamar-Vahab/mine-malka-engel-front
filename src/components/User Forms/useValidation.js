import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const useValidation = () => {
    const { t, i18n } = useTranslation();

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordComfirmError, setPasswordComfirmError] = useState('');

    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [isValid, setIsValid] = useState(true);
// בדיקות תקינות למייל ,סיסמא וטלפון
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
 
  const validatePassword = (password) => {
    return password != null && password.length >= 8; 
  };
  const invalidPasswordConfirmation = (password1, password2) => {
    return password1 == password2
  };
  const validatePhone = (phone) => {
   // בדיקה של מספר ישראלי עם קידומת בינלאומית או מקומית
   const re = /^(\+972|0|02)?[5-9]\d{8}$/;
   return re.test(phone);
  }
const validPasswordError = (password, password2) => {
  if (password && !validatePassword(password)) {
    setPasswordError(t('loginPage.invalidPassword'));
    setIsValid(false);
  }
   else {setPasswordError('');
     setIsValid(true);
   } 
   if (password && password2 && !invalidPasswordConfirmation(password, password2)) {
    setPasswordComfirmError(t('resetPasswordCarePage.invalidPasswordConfirmation'));
    setIsValid(false);

  }
   else {setPasswordComfirmError('');
     setIsValid(true);

   } 
   return isValid;
}
   const validForm = (newUser) => {
   debugger  
   //Check email
       if (newUser.email && !validateEmail(newUser.email)) {
         setEmailError(t('loginPage.invalidEmail'));
         setIsValid(false);
       } 
       else{setEmailError(''); 
        setIsValid(true);

       }
   
   //Check password   
       if (newUser.passwordHash && !validatePassword(newUser.passwordHash)) {
         setPasswordError(t('loginPage.invalidPassword'));
         setIsValid(false);

       }
        else {setPasswordError('');
          setIsValid(true);

        } 
   //Check Phone Number
   if(newUser.phoneNumber != null){
   if (!validatePhone(newUser.phoneNumber)) {
     setPhoneNumberError(t('loginPage.invalidphoneNumber'));
     setIsValid(false);
    }
    else {setPhoneNumberError('');
    setIsValid(true);
    } 
  } 
    debugger 
    return isValid;
 }
  
 
  return {
    validatePhone,
    validateEmail,
    validatePassword,
    invalidPasswordConfirmation,
    phoneNumberError,
    passwordError,
    passwordComfirmError,
    emailError,
    validForm,
    validPasswordError
    
    
  };
};

export default useValidation;
