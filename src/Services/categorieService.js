import axios from 'axios';

const getCategories = () => {
    return axios.get('http://localhost:8080/categorie')
}

export default {
    getCategories
}