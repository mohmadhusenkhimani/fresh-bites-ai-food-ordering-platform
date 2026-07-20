import axios from "axios";

const API_URL = "http://localhost:5000/api/user/address";


// Get all addresses
export const getAddresses = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};



// Add address
export const addAddress = async (addressData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        API_URL,
        addressData,
        {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }
    );

    return response.data;
};



// Update address
export const updateAddress = async (id,addressData)=>{

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/${id}`,
        addressData,
        {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }
    );

    return response.data;
};



// Delete address
export const deleteAddress = async(id)=>{

    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }
    );

    return response.data;
};



// Set Default Address
export const setDefaultAddress = async(id)=>{

    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/default/${id}`,
        {},
        {
            headers:{
                Authorization:`Bearer ${token}`,
            }
        }
    );

    return response.data;
};