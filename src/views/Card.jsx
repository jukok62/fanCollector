import React, {useEffect, useState} from 'react';
import Header2 from '../components/Header2';
import CardProduit from '../components/CardProduit';
import MenuCard from '../components/MenuCard'
import { useParams } from 'react-router-dom';
import '../styles/menuCard.css'
import produitsServices from '../Services/produitsServices';

const Card = () => {

    const {id} = useParams();
    const [produitByCategorie, setProduitByCategorie] = useState([]);



    const getProduitByCategorie = async () => {
        try {
            const response = await produitsServices.getProduitByCategorie(id)
            setProduitByCategorie(response.data)
            console.log("produitByCategorie" ,produitByCategorie);
        } catch (e) {
            console.log(e);
        }
    }

    console.log(produitByCategorie);
    

    useEffect(() => {
        getProduitByCategorie();
    },[])
    

    return ( <>
    
    <Header2/>
    <div className='Page-Card'> 
        <MenuCard id={id}/>
   
        <div className='Invisible'></div>

        <CardProduit produitByCategorie={produitByCategorie} id={id}/>
    </div>
    
    </> );
}
 
export default Card;