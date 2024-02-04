import axios from 'axios';

export const saveCart = async (cart) => {
    try {
        const {data} = await axios.post('/api/user/saveCart', {
            cart,
        });
        return data;
    } catch(error) {
        console.log(error.response.data.message)
        return error.response.data.message;
    }
}

export const saveAddress = async (address) => {
    try {
        const {data} = await axios.post('/api/user/saveAddress', {
            address,
        });
        return data;
    } catch(error) {
        return error.response.data.message;
    }
}