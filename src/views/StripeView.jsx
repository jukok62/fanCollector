import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripeComponent from '../components/Stripe'
const StripeView = () => {

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });
    
        if (error) {
          console.error(error);
        } else {
          // Envoyez le token de paiement (paymentMethod.id) au serveur
          // pour finaliser la transaction
        }
      };
    return ( <>
    
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Payer
      </button>
    </form>
    
    
    </> );
}
 
export default StripeView;