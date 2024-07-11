import axios from "axios";

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/OrderItem/`

export const GetAllOrderItems = async () => {
    try {
        debugger
        let result = await axios.get(`${API_BASE_URL}GetAllOrderItems`)
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const GetOrderItemByOrdId = async (orderId) => {
    try {
        let result = await axios.get(`${API_BASE_URL}GetAllFAQ/${orderId}`)
        debugger
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const PostOrderItem = async (orderItem) => {
    try {
        let result = await axios.post(`${API_BASE_URL}PostOrderItem`, orderItem)
        debugger
        return result
    }
    catch (ch) {
        debugger
        console.log(ch)
    }
}

export const PostOrderItemList = async (orderList) => {
    try {
        let result = await axios.post(`${API_BASE_URL}PostOrderItemList`, orderList);
        return result.data
    }
    catch (ch) {
        debugger
        console.log(ch)
        alert('i came to here!!!!');
    }
}