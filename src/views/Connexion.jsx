import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import {Link, useNavigate} from 'react-router-dom'
import '../styles/connexion.css'
import img1 from '../Image/fond-connection.jpg'
import connexionService from '../Services/connexionService';
import GlobalContext from '../context/GlobalContext';

const Connexion = () => {

    const navigate = useNavigate();
    const { setUserId, setUser} = useContext(GlobalContext);

    const [connection, setConnection] = useState({
        email : "",
        mdp : "",
    });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setConnection({ ...connection, [name]: value });
    }

    const newConnexion = async (e) => {
        e.preventDefault();
        try {
            const response = await connexionService.Connect(connection)
            // stock userId en récupérant l'ID au moment de la connection
            setUserId(response.data.userSQL.User_ID)
            // on stock le USER COMPLET dans user
            setUser(response.data.userSQL)

            // Onstock le token dans la clé token du localStorage
            window.localStorage.setItem("token", response.data.access_token);
            // on demande que toutes nos routes axios aient besoin d'une autorisation qui sera stocké dans Bearer            
            axios.defaults.headers['Authorization'] = "Bearer " + response.data.access_token;

            console.log(response);
            setTimeout(() => {
                navigate("/monCompte")
            }, 500); // Délai en millisecondes (500ms = 0.5 seconde)
        } catch (e) {
            console.log(e);
            toast.error('problème de connection')
        }
    }

    useEffect(() => {
        // on créer des const pour stocker l'utilisateur et l'id 
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const storedUserId = localStorage.getItem('userId');

        // Onvérifie que storedUser affiche bien le storedUserId avec de les mettre a jour
        if (storedUser && storedUserId) {
            setUser(storedUser);
            setUserId(storedUserId);
        }
    },[])

    return ( <>
    
    <Header/>
    <div className='img-fond '> 
    <img src={img1} alt="Fond de connexion" />
    </div>
    <div className='conteneur-connexion'>
        <h2>SE CONNECTER</h2>
        <div className='conteneur-form'>
            <div className="email-connection">
                <label htmlFor="email">Adresse email</label>
                <input type="email" id='email' name='email' placeholder='   Adresse email' value={connection.email} onChange={handleChange} required/>
            </div>
            <div className='mdp-connection'>
                <label htmlFor="mdp">Mot de passe</label>
                <input type="password" id='mdp' name='mdp' placeholder='   ********'value={connection.mdp} onChange={handleChange} required/>
                <p>Mot de passe oublié ?</p>
            </div>
            <div className='button-connection'>
                    <button className='connect-btn' onClick={newConnexion}>Se connecter</button>
                    <div className='pasDeCompte'>
                        <div className='BarreGauche'></div>
                        <p>Vous n'avez pas de compte ?</p>
                        <div className='BarreDroite'></div>
                    </div>
                    <Link to={'/inscription'}><button className='inscription-btn'>Créer un compte</button></Link>
            </div>
        </div>
    
    </div>
    
    </> );
}
 
export default Connexion;