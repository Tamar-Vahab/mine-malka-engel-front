// import React, { useState } from 'react';
// import { Container, Form, Button } from 'react-bootstrap';
// import { addEmail } from '../../axios/EmailAxios';
// export const EmailForm = () => {
// const [error, setError] = useState('');

//   const [newE, setNewE] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });
//   // const handleSubmit = async (e) => {
//   //  try{e.preventDefault();
//   //   addEmail(newEmail);}
//   //   catch(error){console.log(error.message)}
//   // }
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewE({
//       ...newE,
//       [name]: value
//     });
//   };

//   // const handleSubmit = async (e) => {
//   //   try {
//   //     await addEmail(newEmail);
//   //     console.log(response.data);
//   //     // Handle successful response
//   //   } catch (err) {
//   //       alert(err.message);
//   //   }
//   // };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(''); // Reset error before new request
//     try {
//       await addEmail(newEmail);
//       // Handle successful response if needed
//     } catch (err) {
//       alert("לא הצלחנו להכניס את הנתונים נראה שאין לך חיבור לשרת");
//       setError(err.message); // Optional: set error state to display in the UI
//     }
//   };
//   const newEmail = {
//     "greeting": "string",
//     "toAddress": "string",
//     "subject": "string",
//     "body": "string",
//     "isBodyHtml": true,
//     "message": newE.message,
//     "email": newE.email,
//     "name": newE.name
//   }

//   return (
//     <Container>
//       <Form onSubmit={handleSubmit}>
//         <Form.Group controlId="formName">
//           <Form.Label>Name</Form.Label>
//           <Form.Control
//             type="text"
//             name="name"
//             placeholder="Enter your name"
//             defaultValue={newE.name}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formEmail">
//           <Form.Label>Email</Form.Label>
//           <Form.Control
//             type="email"
//             name="email"
//             placeholder="Enter your email"
//             defaultValue={newE.email}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Form.Group controlId="formMessage">
//           <Form.Label>Message</Form.Label>
//           <Form.Control
//             as="textarea"
//             name="message"
//             placeholder="Enter your message"
//             defaultValue={newE.message}
//             onChange={handleChange}
//           />
//         </Form.Group>
//         <Button variant="primary" type="submit">
//           Submit
//         </Button>
//       </Form>
//     </Container>
//   );
// };

// export default EmailForm;

//-עובד-עמוד הישארו מעודכנים
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { addEmail } from '../../axios/EmailAxios';
export const EmailForm = () => {
  const [error, setError] = useState('');

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

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (selectedFile) {
  //     console.log('Selected file:', selectedFile);
  //     // כאן תוכל להוסיף לוגיקה להעלאת הקובץ לשרת
  //   }
  // };}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before new request
    try {
      await addEmail(newEmail);
      // Handle successful response if needed
    } catch (err) {
      alert("לא הצלחנו להכניס את הנתונים נראה שאין לך חיבור לשרת");
      setError(err.message); // Optional: set error state to display in the UI
    }
  };
  const newEmail = {
    "greeting": "string",
    "toAddress": "string",
    "subject": "string",
    "body": "string",
    "isBodyHtml": true,
    "message": newE.message,
    "email": newE.email,
    "name": newE.name
  }

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
    </Container>
  );
};
export default EmailForm;

