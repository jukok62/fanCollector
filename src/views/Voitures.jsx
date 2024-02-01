import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import '../styles/categorie.css'
import categorieService from '../Services/categorieService';
import Header from '../components/Header';

const Voiture = () => {
    const [voitures, setVoitures] = useState([]);

    const getCategorieVoiture = async () => {
        try {
            const response = await categorieService.getCategorieVoiture()
            setVoitures(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        getCategorieVoiture();
    })
    return ( <>

   <Header/>
    
  <div className='Conteneur-Card-Categorie'>
        
        {voitures.map((voit) => (
                
                        <div className='categorie-card' key={voit.ID_Categorie}>
                        <img className={`imgCategorie${voit.ID_Categorie}`}
                            src={process.env.PUBLIC_URL + `/Asset/categorie/${voit.Categorie_img}.jpg`}
                            alt={voit.Categorie_Nom}
                        />
                            <p className={"text-categorie"}>{voit.Categorie_Nom}</p>
                            <div className="overlay">
                                <p className='main-text'>{voit.Categorie_Nom}</p>
                                <Link to={`/card/${voit.ID_Categorie}`}><p className='second-text'>découvrir</p></Link>
                            </div>
                    </div>
                
            ))}
    </div>
    
    
    </> );
}
 
export default Voiture;