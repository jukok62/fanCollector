import React from 'react';
import Header from '../components/Header';
import '../styles/admin.css'

const Admin = () => {
    return ( <>
    
   <Header/>
   <div className="benvenue-admin">
        <h3>Bienvenue</h3>
        <p>Julien Coquerie</p>
   </div>
   <div className="conteneur-tableau-admin">
    <div className="header-tableau">
        <div className="liste-produit">
            <img src="" alt="icon burger" />
            <p>Liste des produits</p>
        </div>
        <div className="search-produit">
            <img src="" alt="icon search" />
            <input type="text" placeholder='  Nom du produit'/>
            <img className='btn-ajouter' src="" alt="icon ajouter" />
        </div>
    </div>
    <table></table>
   </div>
    
    </> );
}
 
export default Admin;