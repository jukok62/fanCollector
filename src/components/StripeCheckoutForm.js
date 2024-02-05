import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/modalPayment.css'


const StripeCheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    
      const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!stripe || !elements) {
          // Stripe.js has not yet loaded.
          // Make sure to disable form submission until Stripe.js has loaded.
          return;
        }
    
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: elements.getElement(CardElement),
        });
    
        if (error) {
          console.error(error);
        } else {
          // Envoyez le token de paiement (paymentMethod.id) au serveur
          // pour finaliser la transaction
          handlePaymentConfirmation(paymentMethod.id);
        }
      };

      const handlePaymentConfirmation = async (paymentMethodId) => {
        try {
          const response = await fetch('/api/confirm-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentMethodId }),
          });
    
          if (response.ok) {
            // Le paiement a été confirmé avec succès
            console.log('Paiement confirmé avec succès!');
          } else {
            console.error('Erreur lors de la confirmation du paiement');
          }
        } catch (error) {
          console.error('Erreur réseau', error);
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
 
export default StripeCheckoutForm;