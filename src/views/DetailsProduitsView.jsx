import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import produitsServices from '../Services/produitsServices';
import Header from '../components/Header';
import DetailsProduitComponent from '../components/DetailsProduitsComponent'

const DetailsProduitsView = () => {

    const { id } = useParams();
    const [produitById, setProduitById] = useState([]);

    const getProduitById = async () => {
        try {
          const response = await produitsServices.getProduitById(id)
          setProduitById(response.data[0]);
        } catch (e) {
          console.log(e);
        }
      };

      useEffect(() => {
        getProduitById();
      }, []);


    return ( <>
    
    <Header/>
    <DetailsProduitComponent produit={produitById}/>
    
    
    </> );
}
 
export default DetailsProduitsView;