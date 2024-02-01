import React from 'react';
import {Link} from 'react-router-dom'
import logo from '../Image/logo.png'
import iconBurger from '../Image/icon/menu.png'
import iconAccueil from '../Image/icon/accueil (1).png'
import '../styles/header2.css'

const Header2 = () => {
    return ( <>

            <div className="conteneur-navbar">
            <div className='logo-header'>
                <img id='iconAccueil' src={iconAccueil} alt="" />
                <p>FAN C</p><img src={logo} alt="image de mon logo" /><p>LLECTOR</p>
            </div>
            <nav>
                <div className='menu-burger'>
                    <img src={iconBurger} alt="icon du menu burger" />
                </div>
                <div className=''>
                    <Link>VEHICULES</Link>
                    <Link>FIGURINES</Link>
                    <Link>PIECES</Link>
                </div>
                <div className="icon-header">
                    <img src="" alt="" />
                </div>
            </nav>
            </div>
    
    
    </> );
}
 
export default Header2;