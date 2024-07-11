import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/CommonQuestions/`

export const getCommonQuestions = async () => {

  try {
    let result = await axios.get(`${API_BASE_URL}GetAllFAQ`)
    debugger
    return result
  }
  catch (ch) {
    debugger
    console.log(ch)
  }
}

