import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import '../styles/categorie.css'
import categorieService from '../Services/categorieService';
import Header2 from '../components/Header2';

const Tracteurs = () => {
    const [tracteurs, setTracteurs] = useState([]);

    const getCategorieVoiture = async () => {
        try {
            const response = await categorieService.getCategorieTracteur()
            setTracteurs(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        getCategorieVoiture();
    })
    return ( <>
    <Header2/>
    
  <div className='Conteneur-Card-Categorie'>
        
        {tracteurs.map((tract) => (
                
                        <div className='categorie-card' key={tract.ID_Categorie}>
                        <img className={`imgCategorie${tract.ID_Categorie}`}
                            src={process.env.PUBLIC_URL + `/Asset/categorie/${tract.Categorie_img}.jpg`}
                            alt={tract.Categorie_Nom}
                        />
                            <p className={"text-categorie"}>{tract.Categorie_Nom}</p>
                            <div className="overlay">
                                <p className='main-text'>{tract.Categorie_Nom}</p>
                                <Link to={`/card/${tract.ID_Categorie}`}><p className='second-text'>découvrir</p></Link>
                            </div>
                    </div>
                
            ))}
    </div>
    
    
    </> );
}
 
export default Tracteurs;