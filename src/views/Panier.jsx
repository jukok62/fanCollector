import React, { useContext, useEffect, useState } from 'react';
import '../styles/panier.css'
import Header from '../components/Header';
import imgPrincipale from '../Image/Test-Details-Produit/alpine renault.jpg'
import iconPoubelle from '../Image/icon/bin.png'
import iconPlus from '../Image/icon/plus.png'
import iconMoins from '../Image/icon/moins.png'
import GlobalContext from '../context/GlobalContext';

const Panier = () => {

    const {userPanier, setUserPanier} = useContext(GlobalContext)
    // useState pour afficher le total de tous les paniers
    const [totalPanier, setTotalPanier] = useState(0);
    
    // Fonction pour Incrementer le panier 
    const incrementQuantite = (id) => {
        const nouveauPanier = userPanier.map((panier) => {
            if (panier.ID_Produit === id) {
                return { ...panier, quantiteCommander: panier.quantiteCommander + 1 };
            }
            return panier;
        });
        setUserPanier(nouveauPanier);
        localStorage.setItem('panier', JSON.stringify(nouveauPanier));
    }

    // Fonction pour décrementer mon panier
    const decrementQuantite = (id) => {
        const nouveauPanier = userPanier.map((panier) => {
            if (panier.ID_Produit === id && panier.quantiteCommander > 1) {
                return { ...panier, quantiteCommander: panier.quantiteCommander - 1 };
            }
            return panier;
        });
        setUserPanier(nouveauPanier);
        localStorage.setItem('panier', JSON.stringify(nouveauPanier));
    }
    

    useEffect(() => {
    // au chargement de la page et a chaque fois que userPanier change je récupère le panier depuis le LocalStorage
        const storedPanier = localStorage.getItem('panier');
        if (storedPanier){
            setUserPanier(JSON.parse(storedPanier))
        }
    },[setUserPanier])

    // USEEFFECT pour mettre a jour le panier pour le total complet des produits
    useEffect(() => {
        // Calculez la somme totale du panier
        const total = userPanier.reduce((acc, panier) => { // reduce est une fonction de tableau JavaScript qui est utilisée pour réduire un tableau à une seule valeur.
                                                            // acc est l'accumulateur, qui conserve le résultat intermédiaire du calcul.
            return acc + (panier.Produit_prix * panier.quantiteCommander);
        }, 0); // 0 est la valeur initiale de l'accumulateur
    
        // Mettez à jour la variable d'état avec le total
        setTotalPanier(total);
    }, [userPanier]);

   
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
                <p>Prix unitaire : &nbsp; {panier.Produit_prix}€</p>
                <div className='buttonIncrementation'>
                    <img src={iconMoins} width={40} alt="icon pour retirer un produit" onClick={() => decrementQuantite(panier.ID_Produit)}/>
                    <p>{panier.quantiteCommander}</p>               
                    <img src={iconPlus} width={50} alt="icon pour ajouter un produit" onClick={() => incrementQuantite(panier.ID_Produit)}/>     
                </div>
                <img className='iconPoubelle' src={iconPoubelle} width={40} alt="" />
                <p className='total-panier'>total :&nbsp; {panier.Produit_prix * panier.quantiteCommander}  €</p>
            </div>
        </div>
         ))}
    </div>

    <div className="conteneur-recap">

        <div className="recap">
            <p>RECAPITULATIF</p>
            <div>
                <p>total : </p>
                <p>{totalPanier} €</p>
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