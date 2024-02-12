import React, {useState, useEffect} from 'react';
import produitsServices from '../Services/produitsServices';
import TousLesProduitsComponent from '../components/produits/TousLesProduitsComponent';
import Header2 from '../components/Header2';
import Footer from '../components/Footer';


const TousLesProduits = () => {

    const [produits, setProduits] = useState([]);

    const fecthProduits = async () => {
        try {
            const response = await produitsServices.getProduit()
            setProduits(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fecthProduits();
    },[])
    return ( <>
    <Header2/>
    <TousLesProduitsComponent produits={produits}/>
    <Footer/>
    
    </> );
}
 
export default TousLesProduits;