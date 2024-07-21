import axios from "axios"

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Review/`

export const GetAllReviews = async () => {
    try {
        let result = await axios.get(`${API_BASE_URL}GetReviews`)
        return result;
    }
    catch (ch) {
        console.log(ch)
    }
}

export const AddReview = async (reviewToAdd) => {
    debugger
    try {
        let result = await axios.post(`${API_BASE_URL}AddReview`, reviewToAdd);
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetReviewByProd = async (prodId) => {
    debugger
    try {
        debugger
        let result = await axios.get(`${API_BASE_URL}GetReviewByProd/${prodId}`)
        debugger
        return result
    }
    catch (ch) {
        console.log(ch)
    }
}

