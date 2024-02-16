import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import produitsServices from '../Services/produitsServices';
import Header2 from '../components/Header2';
import DetailsProduitComponent from '../components/DetailsProduitsComponent'
import Footer from '../components/Footer'

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
    
    <Header2/>
    <DetailsProduitComponent produit={produitById}/>
    <div className="footer">
      <Footer/>
    </div>
   
    
    
    </> );
}
 
export default DetailsProduitsView;