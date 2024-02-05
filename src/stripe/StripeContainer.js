import React from 'react';
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './CheckoutForm'


const PUBLIC_KEY = "pk_test_51OexA3JtUND4zvAbrE9kvxyM9ZyX3ttaKOI71XeQeIBXj6D20i2UPRR09SWf38HRybD17DqdSBFWplxKr5FopF5B00JZe0TgYL";
const stripeTestPromise = loadStripe(PUBLIC_KEY)

const Stripe = ({onClose, amount}) => {
    return ( 
<Elements stripe={stripeTestPromise}>
    
    <CheckoutForm onClose={onClose} amount={amount}/>
        
</Elements>

     );
}
 
export default Stripe;