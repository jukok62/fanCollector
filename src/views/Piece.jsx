import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import categorieService from '../Services/categorieService';
import Header2 from '../components/Header2';


const Pieces = () => {

    const [categoriePiece, setCategoriePiece] = useState([]);

    const getCategorieByPiece = async () => {
        try {
            const response = await categorieService.getCategoriePiece();
            setCategoriePiece(response.data)
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getCategorieByPiece();
    },[])
    return ( <>

    <Header2/>
    
    <div className='Conteneur-Card-Categorie'>
        
        {categoriePiece.map((cat) => (
            
                
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
 
export default Pieces;