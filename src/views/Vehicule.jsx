import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import categorieService from '../Services/categorieService';
import Header from '../components/Header';


const Vehicules = () => {

    const [categorieVehicule, setCategorieVehicule] = useState([]);

    const getCategorieByVhehicule = async () => {
        try {
            const response = await categorieService.getCategorieVehicule()
            setCategorieVehicule(response.data)
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCategorieByVhehicule();
    },[])
    return ( <>

    <Header/>
    
    <div className='Conteneur-Card-Categorie'>
        
        {categorieVehicule.map((cat) => (
            
                
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
 
export default Vehicules;