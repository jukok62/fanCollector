import React, { useContext, useEffect, useState } from 'react';
import '../styles/panier.css'
import { toast } from 'react-toastify';
import Header2 from '../components/Header2';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import StripeContainer from '../stripe/StripeContainer'


import iconPoubelle from '../Image/icon/bin.png'
import iconPlus from '../Image/icon/plus.png'
import iconMoins from '../Image/icon/moins.png'
import imgStripe from '../Image/icon/stripe.png'




const Panier = () => {

    const navigate = useNavigate();
    const {user} = useContext(GlobalContext)

    const {userPanier, setUserPanier, userId} = useContext(GlobalContext)
    // useState pour afficher le total de tous les paniers
    const [totalPanier, setTotalPanier] = useState(0);
    // const pour initier la modal STRIPE
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    // const pour ouvrir ou fermer la modal
    const handleOpenPaymentModal = () => {
        setPaymentModalOpen(true);
      };
    
      const handleClosePaymentModal = () => {
        setTimeout(() => {
            setPaymentModalOpen(false);
        }, 3500); // 3500 millisecondes (3.5 secondes)
        localStorage.removeItem(`panier_${userId}`)
        setTimeout(() => {
            navigate('/');
        }, 4000);
      };
    
    // Fonction pour Incrementer le panier 
    const incrementQuantite = (id) => {
        const nouveauPanier = userPanier.map((panier) => {
            if (panier.ID_Produit === id) {
                return { ...panier, quantiteCommander: panier.quantiteCommander + 1 };
            }
            return panier;
        });
        setUserPanier(nouveauPanier);
        localStorage.setItem(`panier_${userId}`, JSON.stringify(nouveauPanier));
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
        localStorage.setItem(`panier_${userId}`, JSON.stringify(nouveauPanier));
    }
    
    // Fonction de suppression du panier
    const deleteProduit = (productId) => {
        // Filtrer le panier pour exclure le produit avec l'ID spécifié
        const nouveauPanier = userPanier.filter((panier) => panier.ID_Produit !== productId);
        
        // Mettre à jour le panier dans le LocalStorage
        localStorage.setItem(`panier_${userId}`, JSON.stringify(nouveauPanier));
        
        // Mettre à jour le panier dans l'état global
        setUserPanier(nouveauPanier);
    }
    

    useEffect(() => {
    // au chargement de la page et a chaque fois que userPanier change je récupère le panier depuis le LocalStorage
        const storedPanier = localStorage.getItem(`panier_${userId}`);
        console.log(storedPanier)
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

    // FONCTION POUR INDIQUER AUX CLIENTS DE REMPLIR LE PANIER OU SECONNECTER
    const Attention = () => {
        toast.error('veuillez vous connecter et/ou remplir le panier')
    }

    // Fonction pour dynamiquement dire a l'utilisateur le nombre d'objet au panier
    const nombreProduitAuPanier = () => {
        // Utilisez la méthode reduce pour obtenir la somme des quantités commandées
        const totalQuantite = userPanier.reduce((acc, panier) => acc + panier.quantiteCommander, 0);
        if(totalQuantite === 0 || totalQuantite === null){
            return 0
        } else{
            return totalQuantite;
        }
    }        
    

console.log("userPanier", userPanier);
   
    return ( <>

    <Header2/>

    <div className="titre-panier">
            <h3>Votre Panier</h3>
            <p>Vous avez {nombreProduitAuPanier()} produit dans votre panier</p>
        </div>
    
    <div className="conteneur-panier">

        {userPanier.map((panier) => (

       
        <div className="panier-principale">
            <img className='imgPrincipale' src={`/Asset/produit/${panier.Produit_Image_Principale}`} alt="" />

            <div className="info-panier">
                <p id='nom-produit'>{panier.Produit_nom}</p>
                <p id='prix-unitaire'>Prix unitaire : &nbsp; {panier.Produit_prix}€</p>
                <div className='buttonIncrementation'>
                    <img id='iconDecrement' src={iconMoins} width={40} alt="icon pour retirer un produit" onClick={() => decrementQuantite(panier.ID_Produit)}/>
                    <p>{panier.quantiteCommander}</p>               
                    <img id='iconIncrement' src={iconPlus} width={50} alt="icon pour ajouter un produit" onClick={() => incrementQuantite(panier.ID_Produit)}/>     
                </div>
                <img className='iconPoubelle' src={iconPoubelle} width={40} alt="icon pour supprimer le produit" onClick={() => deleteProduit(panier.ID_Produit)}/>
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
            {totalPanier === 0 || user == null ? <button onClick={Attention}>COMMANDER</button> :
            <button onClick={handleOpenPaymentModal}>COMMANDER</button> }
            
        </div>

        <div className="info-supp">
            <p>Paiements acceptés</p>
            <img className='imgStripe' src={imgStripe} alt="" />
            { isPaymentModalOpen && 
            <StripeContainer onClose={handleClosePaymentModal} amount={totalPanier*100}/>
            }
        </div>
    </div>
    
    
    </> );
}
 
export default Panier;