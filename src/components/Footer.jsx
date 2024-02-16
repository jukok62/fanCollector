import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../Image/logo.png'
import logoFacebook from '../Image/icon/facebook.png'
import logoTwitter from '../Image/icon/twitter.png'
import logoInsta from '../Image/icon/instagram.png'
import '../styles/footer.css'


const Footer = () => {
    return ( <>
    
    <div className="conteneur-footer">

        <div className="nomSite-footer">
            <p>FAN C</p>
            <img src={logo} alt="Logo du site" />
            <p>LLECTOR</p>
        </div>

        <div className="retrouvez-nous">
            <div className="barre-gauche-footer"></div>
            <p>RETROUVEZ-NOUS</p>
            <div className='barre-droite-footer'></div>
        </div>

        <div className='reseau-footer'>
            <Link to={'https://www.facebook.com/fancollector62000/'}><img src={logoFacebook} alt="logo facebook" /></Link>
            <Link to={'https://www.instagram.com/'}><img src={logoInsta} alt="logo instagram" /></Link>
            <Link to={'https://twitter.com/twitterfrance'}><img src={logoTwitter} alt="logo twitter" /></Link>
        </div>

        <div className="info-footer">
            <Link to={'/'}><p>Accueil</p></Link>
            <Link><p>Galerie</p></Link>
            <Link to={'/aPropos'}><p>A propos</p></Link>
            <Link to={'/contact'}><p>Contact</p></Link>
        </div>
    </div>


    
    
    </> );
}
 
export default Footer;