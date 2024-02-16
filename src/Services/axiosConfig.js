// axiosConfig.js
import axios from 'axios';


axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Gérer ici la déconnexion ou la redirection vers la page de connexion
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      window.location.reload();
      console.log("Erreur 401 : Token expiré ou non valide");
    }
    return Promise.reject(error);
  }
);

export default axios;
