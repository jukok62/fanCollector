import React, { useContext, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import logo from '../Image/logo.png'
import iconBurger from '../Image/icon/navbar/menu.png'
import iconAccueil from '../Image/icon/navbar/accueil (2).png'
import inconPanier from '../Image/icon/navbar/shopping-bag.png'
import iconConnection from '../Image/icon/navbar/user-lock (2).png'
import iconConnecter from '../Image/icon/navbar/user (1).png'
import iconFavoris from '../Image/icon/navbar/favori.png'
import iconSupp from '../Image/icon/cross-circle.png'
import iconDeconnexion from '../Image/icon/navbar/se-deconnecter (4).png'
import '../styles/header2.css'
import GlobalContext from '../context/GlobalContext';

const Header2 = () => {

    const navigate = useNavigate();
    const [menuBurger, setMenuBurger] = useState(false);
    const {user, userId} = useContext(GlobalContext);

    const listeDeroulante = () => {
        setMenuBurger(!menuBurger)
    }
    const deconnexion = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('userId')
        localStorage.removeItem(`panier${userId}`)
        setTimeout(() => {
            window.location.reload();
        }, 500);
        setTimeout(() => {
            navigate('/');
        }, 1500); 
    } 

    return ( <>

<div className="conteneur-navbar">
    <div className='logo-header' onClick={() => navigate('/')}>
        <img id='iconAccueil' src={iconAccueil} alt="logo pour revenir a l'accueil" className='hover-icon-accueil' onClick={() => navigate('/')} />
        <p>FAN C</p><img src={logo} alt="image de mon logo" /><p>LLECTOR</p>
    </div>
    <nav>
        <div className='menu-burger'>
            <img src={iconBurger} alt="icon du menu burger" onClick={listeDeroulante}/>
            {menuBurger ? 
            <ul className='menu-burger-ul'>
                <img id='icon-supp-burger' src={iconSupp} alt="icon de fermeture" onClick={listeDeroulante}/>
                <Link to={'/'}><li>Accueil</li></Link>
                <Link to={'/categorie/Vehicule'} className='responsive-header'><li>Véhicules</li></Link>
                <Link to={'/categorie/Figurine'} className='responsive-header'><li>Figurines</li></Link>
                <Link to={'/categorie/Piece'} className='responsive-header'><li>Pièces</li></Link>
                <Link to={'/categorie'} className='responsive-header'><li>Toutes catégories</li></Link>
                <Link to={'/produits'}><li>Tous nos produits</li></Link>
                <Link to={'/aPropos'}><li>A propos de Nous</li></Link>
                <Link to={'/contact'}><li>Nous contacter</li></Link>
            </ul> : ""}
        </div>
        <div className='categorie-navbar'>
            <Link to={'/categorie/Vehicule'} className='responsive-header2'>VEHICULES</Link>
            <Link to={'/categorie/Figurine'} className='responsive-header2'>FIGURINES</Link>
            <Link to={'/categorie/Piece'} className='responsive-header2'>PIECES</Link>
            <Link to={'/categorie'} className='responsive-header2'>CATEGORIES</Link>
        </div>
        <div className="icon-header">
        {!user ? (
            <Link to={'/connexion'}>
                <div>
                    <img src={iconConnection} alt="se connecter" className="hover-icon-connexion"/>
                    <span className="hover-text hover-text-connexion">Connectez-vous</span>
                </div>
            </Link>
        ) : (
            <>
            <Link to={'/monCompte'}>
                <div>
                    <img src={iconConnecter} alt="se connecter" className="hover-icon-connecter"/>
                    <span className="hover-text hover-text-connecter">{user.User_genre === "autre" ? "M" : user.User_genre}.{user.User_nom}</span>
                </div>
            </Link>
            
                <div onClick={deconnexion}>
                    <img src={iconDeconnexion} alt="se connecter" className="hover-icon-deconnecter"/>
                    <span className="hover-text hover-text-deconnecter">Déconnexion</span>
                </div>
            

            </>
        )}

            <Link to={'#'}>
                <div>
                    <img src={iconFavoris} alt="partie favoris" className="hover-icon-favoris"/>
                    <span className="hover-text hover-text-favoris">Favoris</span>
                </div>
            </Link>
            <Link to={'/panier'}>
                <div>
                    <img src={inconPanier} alt="accéder au panier" className="hover-icon-panier" />
                    <span className="hover-text hover-text-panier">Panier</span>
                </div>
            </Link>
        </div>
    </nav>
</div>
    
    
    </> );
}
 
export default Header2;