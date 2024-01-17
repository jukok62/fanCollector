import React from 'react';
import '../styles/header.css'


const Header = () => {
    return ( <>
    
        <div className="header-flex">
            <img src={process.env.PUBLIC_URL +`/Asset/Logo/wolverine.png`} className='logo-header' alt="Logo de la page Wolverine" />
            <p>VEHICULES</p>
            <p>FIGURINES</p>
            <p>PIECES</p>
            <p>CATEGORIES</p>
            <div className="search-header">
                <img src={process.env.PUBLIC_URL + `/Asset/Icons/search-36px.png`} className='button-search-header' alt="icon pour éffectuer une recherche" />
                <input type="text" placeholder='  recherche' />
            </div>
            <div className="compte-header">
                <img src={process.env.PUBLIC_URL + `/Asset/Icons/Compte.png`} className='button-compte-header' alt="icon pour accéder à son compte" />
                <p>Se connecter</p>
            </div>
            <img src={process.env.PUBLIC_URL + `/Asset/Icons/paniers.png`} className='button-panier-header' alt="icon pour accéder au panier" />
        </div>
    
    </> );
}
 
export default Header;