import React, { useContext, useState} from 'react';
import axios from 'axios'
import { format } from 'date-fns';
import '../styles/stripe.css'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import GlobalContext from '../context/GlobalContext';
import achatService from '../Services/achatService';
import { toast } from 'react-toastify';

export const CheckoutForm = ({onClose, amount}) => {
   
    const stripe = useStripe();
    const elements = useElements();

    const {userId} = useContext(GlobalContext)
    const panierLocalStorage = JSON.parse(localStorage.getItem(`panier_${userId}`));
    const dateCommande = format(new Date(), 'yyyy-MM-dd');
    // Numéro de commande générer de manière unique
    const numeroCommande = genererNumeroCommande();
    
    // Ajouter la date et le numéro de commande à chaque produit dans le panier
    const panierAvecInfosSupplementaires = panierLocalStorage.map((produit) => ({
        ...produit,
        dateCommande,
        numeroCommande,
    }));
    const [validPanier, setValidPanier] = useState({
        user : userId,
        date : panierLocalStorage[0].dateCommande,
        numero : panierLocalStorage[0].numeroCommande,
        produits : panierLocalStorage.map((produit) => ({
            produit : produit.ID_Produit,
            quantite : produit.quantiteCommander,
        }))
    });

    console.log(panierLocalStorage[0].dateCommande);

    const newCommand = async () => {
        try {
            const response = await achatService.postCommande(validPanier)
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    // Fonction pour générer un numéro de commande unique (vous devez définir votre propre logique)
    function genererNumeroCommande() {
        // Utiliser le timestamp actuel pour garantir l'unicité du numéro de commande
        const timestamp = new Date().getTime();
        
        //  contient une chaîne de caractères alphanumériques générée aléatoirement de longueur 6 (8 - 2)
        const caracteresSupplementaires = Math.random().toString(36).substring(2, 8);
    
        return `${timestamp}-${caracteresSupplementaires}`;
    }
    

    // Mettez à jour le panier dans le LocalStorage avec les informations supplémentaires
    localStorage.setItem(`panier_${userId}`, JSON.stringify(panierAvecInfosSupplementaires));
 

    const handleSubmit = async(event) => {
        event.preventDefault();
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type : "card",
            card : elements.getElement(CardElement),
        });
        console.log(error);
        console.log(paymentMethod);
        if(!error){
            console.log("Token généré : " , paymentMethod);
            //  envoie du token au back-end
            try {
                const {id} = paymentMethod;
                const response = await axios.post("http://localhost:8080/stripe/charge",
                {
                    amount : amount,
                    id :id
                })
                if(response.data.success){
                    console.log("payment réussie");
                    toast.success("paiemenr réussie")
                }
                
            } catch (error) {
                console.log("paymenet échoué" , error);
                toast.error("paiement refusé")
            }
        }
        else{
            console.log(error.message);
        }
    }


    return ( <>

    <div className='formStripe'>
        <form onSubmit={handleSubmit} style={{maxWidth : 500}}>
            <CardElement 
                options={{
                    hidePostalCode: true,
                    style: {
                        base: {
                            backgroundColor: '#fff',
                            fontSize: '20px',
                            color: '#30313d',
                            '::placeholder': {
                                color: '#30313d',
                            },
                            fontSmoothing: 'antialiased',
                            ':-webkit-autofill': {
                                color: '#fce883',
                            },
                            
                        },
                        invalid: {
                            color: '#df1b41',
                        },
                    },
                }}
            />
            <button className='btn-stripe' onClick={() => { onClose(); newCommand(); }}>
                Payer
            </button>


        </form>
    </div>
    
    </>
        
    )
}

export default CheckoutForm