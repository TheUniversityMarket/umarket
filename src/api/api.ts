import axios from 'axios';

const API_URL = "https://umarket-2o3xg.ondigitalocean.app";

export const getVerificationCode = async (email: string) => {
    try {
        const response = await axios.post(`${API_URL}/get_verification_code`, { email });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error sending verification code');
    }
};

export const verifyCode = async (email: string, code: string) => {
    try {
        const response = await axios.post(`${API_URL}/check_verification_code`, { email, code });
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || 'Error verifying code');
    }
};