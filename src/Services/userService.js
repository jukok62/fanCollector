import axios from 'axios'
import { URL } from './config';

const getToken = () => localStorage.getItem('token');

const updateUser = (user) => {
    return axios.patch(`http://${URL}:8080/user`,  user, {
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
    }})
}


const updateMdp = (user) => {
    return axios.patch(`http://${URL}:8080/user/password`,  user, {
        headers : {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,
    }})
}

export default {
    updateUser,
    updateMdp
}