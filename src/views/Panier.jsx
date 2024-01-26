import React, { useContext, useEffect } from 'react';
import '../styles/panier.css'
import Header from '../components/Header';
import imgPrincipale from '../Image/Test-Details-Produit/alpine renault.jpg'
import iconPoubelle from '../Image/icon/bin.png'
import iconPlus from '../Image/icon/plus.png'
import iconMoins from '../Image/icon/moins.png'
import GlobalContext from '../context/GlobalContext';

const Panier = () => {

    const {userPanier, setUserPanier} = useContext(GlobalContext)

    useEffect(() => {
    // au chargement de la page et a chaque fois que userPanier change je récupère le panier depuis le LocalStorage
        const storedPanier = localStorage.getItem('panier');
        if (storedPanier){
            setUserPanier(JSON.parse(storedPanier))
        }
    },[setUserPanier])
    return ( <>

    <Header/>

    <div className="titre-panier">
            <h3>Votre Panier</h3>
            <p>Vous avez 1 produit dans votre panier</p>
        </div>
    
    <div className="conteneur-panier">

        {userPanier.map((panier) => (

       
        <div className="panier-principale">
            <img className='imgPrincipale' src={`/Asset/produit/${panier.Produit_Image_Principale}`} alt="" />

            <div className="info-panier">
                <p>{panier.Produit_nom}</p>
                <p>{panier.Produit_description}</p>
                <p>Prix unitaire : {panier.Produit_prix}€</p>
                <div className='buttonIncrementation'>
                    <img src={iconMoins} width={40} alt="" />
                    <p>12</p>
                    <img src={iconPlus} width={50} alt="" />
                </div>
                <img className='iconPoubelle' src={iconPoubelle} width={40} alt="" />
                <p className='total-panier'>total : 90€</p>
            </div>
        </div>
         ))}
    </div>

    <div className="conteneur-recap">

        <div className="recap">
            <p>RECAPITULATIF</p>
            <div>
                <p>total</p>
                <p>prix</p>
            </div>
            <button>COMMANDER</button>
        </div>

        <div className="info-supp">
            <p>infos supplémentaires</p>
        </div>
    </div>
    
    
    </> );
}
 
export default Panier;