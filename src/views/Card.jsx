import React from 'react';
import Header from '../components/Header';
import CardProduit from '../components/CardProduit';
import MenuCard from '../components/MenuCard'
import { useParams } from 'react-router-dom';
import '../styles/menuCard.css'

const Card = () => {

    const {id} = useParams();
    return ( <>
    
    <Header/>
    <div className='Page-Card'> 
        <MenuCard id={id}/>
   
        <div className='Invisible'></div>

        <CardProduit id={id}/>
    </div>
    
    </> );
}
 
export default Card;