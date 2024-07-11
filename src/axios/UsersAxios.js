import axios from "axios"
import Cookies from 'js-cookie';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/User/`
export const GetAllUsers = async () => {
    try {

        let result = await axios.get(`${API_BASE_URL}GetUsers`)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

export const LoginUser = async (mail, pas) => {
    debugger
    try {
        let result = await axios.post(`${API_BASE_URL}Login?mail=${mail}&pas=${pas}`)
        debugger
        Cookies.set('token', result.data.token, {
            expires: 1, // זמן תפוגה של יום אחד
            secure: true, // מבטיח שהעוגייה תשלח רק על גבי HTTPS
            sameSite: 'Strict', // מבטיח שהעוגייה תשלח רק מהאתר שלך
          });
        //return token need to save in cookies
        return result
    }

    catch (ch) { debugger; return ch }
}

export const PostUser = async (user) => {
    debugger
    try {
        let result = await axios.post(`${API_BASE_URL}PostUser`, user)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

export const PutUser = async (user) => {
    debugger
    try {
        let result = await axios.put(`${API_BASE_URL}PutUser?id=${user.userID}`, user)
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}
export const GetUserDetails = async (token) => {

    try{
       
        debugger
let result = await axios.get(`${API_BASE_URL}GetUserDeteils`,{
    headers: {
        // 'Content-Type': 'application/json',
        'token': `Bearer ${token}` // שליחת הטוקן בכותרת בשם "token"
      }
})
return result
    }
    catch(ch){
        console.log(ch)
    }
}

