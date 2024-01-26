import React, { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../styles/header.css'

import iconAdmin from '../Image/icon/profil-de-lutilisateur.png'
import imgLogin2 from '../Image/icon/user-lock2.png'
import imgDeconnection from '../Image/icon/se-deconnecter32px.png'
import iconBurger from '../Image/icon/menu.png'
import iconAccueil from '../Image/icon/accueil (1).png'
import GlobalContext from '../context/GlobalContext';


const Header = () => {

    const {userId, user} = useContext(GlobalContext)
    const navigate = useNavigate();
    const [listeBurger, setListeBurger] = useState(false);

    const listeDeroulante = () => {
        setListeBurger(!listeBurger);
      };

    const deconnexion = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem(`panier${userId}`)
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }  


    return ( <>

    
        <div className="header-flex">
        <div className="burger-icon-header">
            <img src={iconBurger} alt="icon du menu burger" onClick={listeDeroulante}/>
            {listeBurger && (
                <div className="burger-menu">
                    <Link to={'/'}><img src={iconAccueil}  alt="icon de retour à l'accueil" /></Link>
                    <Link to={'/categorie'}>CATEGORIES</Link>
                    <Link>VEHICULES</Link>
                    <Link>FIGURINES</Link>
                    <Link>PIECES</Link>
                </div>
            )}
        </div>
            <Link to={'/'} className='logo-link'>
            <img src={process.env.PUBLIC_URL +`/Asset/Logo/wolverine.png`} className='logo-header' alt="Logo de la page Wolverine" />
            </Link>
            <p className="invisibleP">FAN COLLECTOR</p>
            <p className='noBurger'><Link to={'/categorie/Vehicule'}>VEHICULES</Link></p>
            <p className='noBurger'><Link to={'/categorie/Figurine'}>FIGURINES</Link></p>
            <p className='noBurger'><Link to={'/categorie/Piece'}>PIECES</Link></p>
            <Link to={'/categorie'}><p className='noBurger'>CATEGORIES</p></Link>
            
            <div className="search-header">
                <img src={process.env.PUBLIC_URL + `/Asset/Icons/search-36px.png`} className='button-search-header' alt="icon pour éffectuer une recherche" />
                <input type="text" placeholder='  recherche' />
            </div>

            {user === null ? (

            <div className="compte-header">
                <img src={imgLogin2} className='button-compte-header' alt="icon pour accéder à son compte" onClick={() => navigate('/connexion')}/>
                <Link to={'/connexion'} className='Link'><p className='seConnecter noBurger'>Connection</p></Link>
            </div>
             ) : (<div className="compte-header">
             <img src={imgDeconnection}  className='button-compte-header' alt="icon pour accéder à son compte" onClick={deconnexion}/>
             <Link to={"/monCompte"} className='Link'><p className=' noBurger seConnecter'>{user?.User_genre}.{user?.User_nom}</p></Link>
             <img src={iconAdmin} alt="icon admin" onClick={() => navigate('/admin')}/>
         </div>)
            }
            <img src={process.env.PUBLIC_URL + `/Asset/Icons/paniers.png`} className='button-panier-header' alt="icon pour accéder au panier" onClick={() => navigate('/panier')} />
        </div>
    
    </> );
}
 
export default Header;