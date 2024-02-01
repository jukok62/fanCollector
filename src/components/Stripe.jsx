import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51OexA3JtUND4zvAbrE9kvxyM9ZyX3ttaKOI71XeQeIBXj6D20i2UPRR09SWf38HRybD17DqdSBFWplxKr5FopF5B00JZe0TgYL');

const Stripe = () => {
    return ( <>
    
    <Elements stripe={stripePromise}>
        <CheckoutForm/>
    </Elements>
    
    
    </> );
}
 
export default Stripe;