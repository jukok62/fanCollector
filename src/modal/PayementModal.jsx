import React, {useState} from 'react';
import Stripe from '../components/StripeComponent'
import '../styles/modalPayment.css'

const PayementModal = ({isOpen , onClose}) => {

    // Gérez l'état de la modal, le formulaire de paiement pourrait être géré dans le composant Stripe
  const [isPaymentSuccessful, setPaymentSuccessful] = useState(false);

  const handlePaymentSuccess = () => {
    setPaymentSuccessful(true);
    // Vous pouvez également inclure d'autres actions ici, par exemple, fermer la modal
    // onClose();
  };


    return ( 
    
    
        <div className={`payment-modal ${isOpen ? 'open' : ''}`}>
        {isOpen && <Stripe />}
      </div>
    
     );
}
 
export default PayementModal;