import axios from 'axios'
import { URL } from './config';

const updateUser = (user) => {
    return axios.patch(`http://${URL}:8080/user`,  user, {
        headers : {
            'Content-Type': 'application/json'
    }})
}


const updateMdp = (user) => {
    return axios.patch(`http://${URL}:8080/user/password`,  user, {
        headers : {
            'Content-Type': 'application/json'
    }})
}

export default {
    updateUser,
    updateMdp
}