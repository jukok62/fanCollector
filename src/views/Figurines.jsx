import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import categorieService from '../Services/categorieService';
import Header2 from '../components/Header2';


const Figurines = () => {

    const [categorieFigurine, setCategorieFigurine] = useState([]);

    const getCategorieByFigurine = async () => {
        try {
            const response = await categorieService.getCategorieFigurine()
            setCategorieFigurine(response.data)
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCategorieByFigurine();
    },[])
    return ( <>

    <Header2/>
    
    <div className='Conteneur-Card-Categorie'>
        
        {categorieFigurine.map((cat) => (
            
                
                        <div className='categorie-card' key={cat.ID_Categorie}>
                        <img className={`imgCategorie${cat.ID_Categorie}`}
                            src={process.env.PUBLIC_URL + `/Asset/categorie/${cat.Categorie_img}.jpg`}
                            alt={cat.Categorie_Nom}
                        />
                            <p className={"text-categorie"}>{cat.Categorie_Nom}</p>
                            <div className="overlay">
                                <p className='main-text'>{cat.Categorie_Nom}</p>
                                <Link to={`/card/${cat.ID_Categorie}`}><p className='second-text'>découvrir</p></Link>
                            </div>
                    </div>
        )
            )}
    </div>
    
    </> );
}
 
export default Figurines;