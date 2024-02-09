import React, {useContext} from 'react';
import {Link, useNavigate } from 'react-router-dom'
import '../styles/favoris.css'
import GlobalContext from '../context/GlobalContext';
import Header2 from '../components/Header2'
import Footer from '../components/Footer'

import iconSupp from '../Image/icon/bin.png'

const Favoris = () => {

    const {userId} = useContext(GlobalContext)
    const navigate = useNavigate();

    const newFavoris = JSON.parse(localStorage.getItem(`favoris_${userId}`));
    console.log(newFavoris);

    const deleteFavoris = (id) => {
        // Filtrer les favoris pour exclure le produit avec l'ID spécifié
        const nouveauFavoris = newFavoris.filter((fav) => fav.ID_Produit !== id);
        // Mettre à jour les favoris dans le LocalStorage
        localStorage.setItem(`favoris_${userId}`, JSON.stringify(nouveauFavoris));
        setTimeout(() => {
            window.location.reload();
        }, 200);
    }
    return ( <>

    <Header2/>
    
    <div className='conteneur-favoris'>

    { newFavoris.map((fav) =>(
        
            <div className="card-favoris" onClick={() => navigate(`/detailsProduit/${fav.ID_Produit}`)}>
                
                <img id='img-principale' src={`/Asset/produit/${fav.Produit_Image_Principale}`} alt="" />
                <p>{fav.Produit_nom}</p>
                <p>Prix : {fav.Produit_prix}€</p>
                <img id='icon-supp' src={iconSupp} alt=""  onClick={(e) => {
                    e.stopPropagation();
                    deleteFavoris(fav.ID_Produit);
                }} />

            </div>

    ))}

    </div>
    
    <Footer/>
    
    </> );
}
 
export default Favoris;