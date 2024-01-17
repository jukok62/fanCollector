import React, {useState} from 'react';
import Header from '../components/Header';
import { toast } from 'react-toastify';
import '../styles/connexion.css'
import img1 from '../Image/fond-connection.jpg'
import connexionService from '../Services/connexionService';

const Connexion = () => {

    const [connection, setConnection] = useState({
        email : "",
        mdp : "",
    });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setConnection({ ...connection, [name]: value });
        console.log(connection);
    }

    const newConnexion = async (e) => {
        e.preventDefault();
        try {
            const response = await connexionService.Connect(connection)
            console.log(response);
            toast.success('connection réussie');
        } catch (e) {
            console.log(e);
            toast.error('problème de connection')
        }
    }

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
                    <button className='inscription-btn'>Créer un compte</button>
            </div>
        </div>
    
    </div>
    
    </> );
}
 
export default Connexion;