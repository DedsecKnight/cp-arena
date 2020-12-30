import axios from 'axios';

export const getProblem = async () => {
    try {
        const res = await axios.get('http://localhost:5000/api/submissions/me');    
        return res.data;
    } 
    catch (error) {
        console.error(error.response);
    }
}