import axios from "axios"
const API_BASE_URL = "https://localhost:7297/api/Email"
export const SendEmail = async (emailRequest) => {
    try {
        debugger
        let result = await axios.post("https://localhost:7297/api/Email/send", emailRequest)
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const addEmail = async (newEmail) => {
    try {
        const response = await axios.put("https://localhost:7297/api/Email/add-data", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

export const SendEmails = async (newEmail) => {
    try {
        const response = await axios.post("https://localhost:7297/api/Email/send-emails", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

export const send = async (newEmail) => {
    try {
        const response = await axios.post("https://localhost:7297/api/Email/send", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};

//עבור שליחת מייל לכתובת אחת
export const sendEmails = async ({ Greeting, ToAddress, Subject, Body, Attachments }) => {
  try {
    const formData = new FormData();
    formData.append('Greeting', Greeting);
    formData.append('ToAddress', ToAddress);
    formData.append('Subject', Subject);
    formData.append('Body', Body);

    Attachments.forEach((file, index) => {
      if (file) {
        formData.append(`Attachments`, file);
      }
    });

    const response = await axios.post("https://localhost:7297/api/Email/send", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log('Email sent successfully:', response.data);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


export const postSendEmails = async (newEmail) => {
    try {
        const response = await axios.post("https://localhost:7297/api/Email/send-emails", newEmail);
        return response;
    } catch (error) {
        console.error('Error adding category :', error);
        throw error;
    }
};
export const SendEmailToReset = async (toAddress) => {
    try {
        debugger
        const response = await axios.post(`${API_BASE_URL}/sendToResetPas`, toAddress);
        return response;

    } catch (error) {
        throw error;
    }
};



export const sendEmailsForAllUsers = async ({ Greeting, Subject, Body, Attachments }) => {
    try {
      const formData = new FormData();
      formData.append('Greeting', Greeting);
    //   formData.append('ToAddress', ToAddress);
      formData.append('Subject', Subject);
      formData.append('Body', Body);
  
      Attachments.forEach((file, index) => {
        if (file) {
          formData.append(`Attachments`, file);
        }
      });
  
      const response = await axios.post("https://localhost:7297/api/Email/send-emails", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log('Email sent successfully:', response.data);
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }



export const getMessage = async () => {
  try {
      let result = await axios.get("https://localhost:7297/api/Messages/get-all-messages");
      return result.data;
  } catch (error) {
      console.log(error);
  }
}