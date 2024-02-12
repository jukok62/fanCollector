import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

import categorieService from '../Services/categorieService'
import '../styles/categorie.css'

const CategorieByType = () => {

    const [categories, setCategories] = useState([]);

    const getCategorie = async () => {

        try {
            const response = await categorieService.getCategories()
            setCategories(response.data);
        } catch (e) {
           console.log(e); 
        }
    }

    useEffect(() => {
        getCategorie();
    },[])

    return ( 
    <>

    <div className='Conteneur-Card-Categorie'>
        
        {categories.map((cat) => (
                
                        <div className='categorie-card' key={cat.ID_Categorie}>
                        <Link to={`/card/${cat.ID_Categorie}`}>
                            <img className={`imgCategorie${cat.ID_Categorie}`}
                                src={process.env.PUBLIC_URL + `/Asset/categorie/${cat.Categorie_img}.jpg`}
                                alt={cat.Categorie_Nom}
                            />
                            <p className={"text-categorie"}>{cat.Categorie_Nom}</p>
                            <div className="overlay">
                                <p className='main-text'>{cat.Categorie_Nom}</p>
                                <p className='second-text'>découvrir</p>
                            </div>
                            </Link>
                    </div>
                
            ))}
    </div>
    

    

    
    </> );
}
 
export default CategorieByType;