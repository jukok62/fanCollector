import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import '../styles/inscription.css'
import { toast } from 'react-toastify';
import Header2 from '../components/Header2';
import inscriptionService from '../Services/inscriptionService';
import img1 from '../Image/inmage-inscription.png'
import ReCAPTCHA from 'react-google-recaptcha';

const Inscription = () => {

    const navigate = useNavigate();
    const key = '6Lc-bnIpAAAAAObQjFI-0VjozhZwOKvTkryApQkp'
    const [captchaIsDone, setCaptchaIsDone] = useState(false);
    const [capcha, setCapcha] = useState("");
    

    // INSCRIPTION

    const [inscription, setInscription] = useState({
        email: "",
        nom : "",
        prenom : "",
        genre :"",
        adresse : "",
        telephone : "",
        mdp : "",
    });

    // si changement du captcha
    const handleCaptchaChange = (value) => {
        setCapcha(value);
        console.log(inscription);
    };

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        setInscription({ ...inscription, [name]: value });
        console.log(inscription);
    }

    const checkEmail = (e) => {
        const { name, value } = e.currentTarget;
        // Vérifier si le nom est "email" et si la valeur ne contient pas "@"
        if (name === 'email' && !value.includes('@')) {
          // Afficher un message d'erreur ou prendre une autre action
          toast.error("L'adresse e-mail doit contenir '@'");
        }
      };

    const handleInscription = async (e) => {
        e.preventDefault();
        // Vérifier si l'adresse e-mail est valide avant de soumettre
        if (!inscription.email.includes('@')) {
        // Afficher un message d'erreur 
        toast.error("L'adresse e-mail doit contenir '@'");
        return; // Arrêter la soumission du formulaire
      }
        try {
            const response = await inscriptionService.postUser(inscription, capcha);
            console.log(response); // Vérifiez si le statut de la réponse est correct
    
            // Vérification du statut de la réponse
            if (response && response.status === 201 ) {
                console.log(response); // Pour les réponses réussies
                // Gérer la réponse pour les requêtes réussies (statut 200 ou similaire)
                toast.success('Inscription réussie');
            } else if (response && response.data.status === 400) {
                console.log(response.data.message); // Pour les réponses avec erreur 400
                // Gérer la réponse pour les erreurs (statut 400)
                
                if (response.data && response.data.message === "l'adresse mail existe déjà") {
                    toast.error("L'adresse e-mail est déjà utilisée");
                } else {
                    toast.error('Erreur lors de l\'inscription');
                }
            } else {
                console.log('Réponse inattendue du serveur');
            }
        } catch (error) {
            console.log(error);
            toast.error('Erreur lors de l\'inscription');
        }
        setTimeout(() => {
        //    navigate('/connexion');
        }, 1000);
    }


    return ( <>

<Header2/>
    {/* <div className="background-Croix"></div>
    <div className="background-croix2"></div> */}
    <div className="image-inscription">
        <img src={img1}  alt="" />
    </div>
    <div className='formulaire-inscription'>
        <h2>Créer un compte</h2>
        <form>
            <div className='genre' >
                <input type="radio" id="Mr" name="genre" value="Mr" checked={inscription.genre === "Mr"} onChange={handleChange}/>
                <label htmlFor="Mr">Monsieur</label>

                <input type="radio" id="Mme" name="genre" value="Mme" checked={inscription.genre === "Mme"} onChange={handleChange}/>
                <label htmlFor="Mme">Madame</label>

                <input type="radio" id="autre" name="genre" value="autre" checked={inscription.genre === "autre"} onChange={handleChange}/>
                <label htmlFor="autre">Autres</label>
            </div>
            <div className='input-inscription'>
                <label htmlFor="nom">Nom</label>
                <input type="text" id='nom' required placeholder='Nom' name='nom'  value={inscription.nom} onChange={handleChange}/>
            </div>
            <div className='input-inscription'>
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id='prenom' required placeholder='Prénom' name='prenom' value={inscription.prenom} onChange={handleChange}/>
            </div>
            <div className='input-inscription'>
                <label htmlFor="adresse">Adresse postale</label>
                <input type="text" id='adresse' required placeholder='1 rue de Paris, 62000 Arras' name='adresse' value={inscription.adresse} onChange={handleChange}/>
            </div>
            <div className='input-inscription'>
                <label htmlFor="numero">Numéro de téléphone</label>
                <input type="text" maxLength={10} id='numero' required placeholder='Numéro de téléphone' name='telephone' value={inscription.telephone} onChange={handleChange}/>
            </div>
            <div className='input-inscription'>
                <label htmlFor="email">Adresse email</label>
                <input type="email" id='email' required placeholder='Adresse email' name='email' value={inscription.email} onBlur={checkEmail} onChange={handleChange}/>
            </div>
            <div className='input-inscription'>
                <label htmlFor="mdp">Mot de passe</label>
                <input type="password" id='mdp' required placeholder='*************' name='mdp' value={inscription.mdp} onChange={handleChange}/>
            </div>
            <div className='button-inscription'>
                <button className='compte' disabled={captchaIsDone} onClick={handleInscription}>Créer un compte</button>
                <ReCAPTCHA 
                sitekey={key}
                onChange={handleCaptchaChange}
                />
                <div className='div-entre-deux'>
                    <div className='barreGauche'></div>
                    <p>Vous avez déjà un compte ?</p>
                    <div className='barreDroite'></div>
                </div>
                <Link to={'/connexion'}><button className='connection'>Se connecter</button></Link>
            </div>
            
        </form>

    </div>

    </> );
}
 
export default Inscription;