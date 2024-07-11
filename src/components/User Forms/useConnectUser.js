import { useDispatch } from "react-redux";
import { GetUserDetails } from "../../axios/UsersAxios"
import {connect, setCurrentUser } from "../../redux/DataActions/DataAction.Users";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";




export const useConnectUser = ()=>{

const dispatch = useDispatch()


const ConnectMe = async()=>{
    debugger
    const token = Cookies.get('token')   
    if (token){
        const result = await GetUserDetails(token)
        if(result && result.status === 200){
        dispatch(connect(true))
        dispatch(setCurrentUser(result.data));
    }
    }
}
const Logout = ()=>{
    debugger
    Cookies.remove('token')
    dispatch(connect(false))
   dispatch(setCurrentUser(null))
}
return {
    ConnectMe,
    Logout
}
    

}
