import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import '../styles/categorie.css'
import categorieService from '../Services/categorieService';
import Header from '../components/Header';

const Motos = () => {
    const [motos, setMotos] = useState([]);

    const getCategorieMoto = async () => {
        try {
            const response = await categorieService.getCategorieMoto()
            setMotos(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=> {
        getCategorieMoto();
    })
    return ( <>

    <Header/>
    
  <div className='Conteneur-Card-Categorie'>
        
        {motos.map((mo) => (
                
                        <div className='categorie-card' key={mo.ID_Categorie}>
                        <img className={`imgCategorie${mo.ID_Categorie}`}
                            src={process.env.PUBLIC_URL + `/Asset/categorie/${mo.Categorie_img}.jpg`}
                            alt={mo.Categorie_Nom}
                        />
                            <p className={"text-categorie"}>{mo.Categorie_Nom}</p>
                            <div className="overlay">
                                <p className='main-text'>{mo.Categorie_Nom}</p>
                                <Link to={`/card/${mo.ID_Categorie}`}><p className='second-text'>découvrir</p></Link>
                            </div>
                    </div>
                
            ))}
    </div>
    
    
    </> );
}
 
export default Motos;