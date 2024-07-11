import axios from "axios"

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/Product/`

export const GetAllProducts = async () => {
    try {
        debugger
        let result = await axios.get(`${API_BASE_URL}GetAllProduct`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetProById = async (language) => {
    debugger
    try {
        let result = await axios.get(`${API_BASE_URL}GetProById?Language=${language}`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const PostProduct = async (productForm) => {
    try {
        let result = await axios.post(`${API_BASE_URL}PostProduct`, productForm)
        debugger
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const PutProduct = async (id, product) => {
    try {
        let result = await axios.put(`${API_BASE_URL}PutProduct/${id}`, product)
        debugger
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetRecommendedProducts = async () => {
    try {
        let result = await axios.get(`${API_BASE_URL}GetRecommendedProducts`)
        return result.data
    }
    catch (ch) {
        console.log(ch)
    }
}

export const GetProductsByCategory = async (categoryId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}GetProductByCategory/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products by category:', error);
        throw error;
    }
};

export const deleteProductInCategory = async (idCategory, idProduct) => {
    try {
        await axios.delete(`${API_BASE_URL}DeleteProductCategory/${idProduct}/${idCategory}`);
        return true;
    } catch (error) {
        console.error('Error delete product in category  :', error);
        throw error;
    }
};

export const addProductToCategory = async (idCategory, idProduct) => {
    try {
        debugger
        const response = await axios.post(`${API_BASE_URL}AddProductCategory/${idProduct}/${idCategory}`);
        return response.data;
    } catch (error) {
        console.error('Error adding product in category  :', error);
        throw error;
    }
};


