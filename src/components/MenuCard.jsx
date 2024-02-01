import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import '../styles/menuCard.css'
import categorieService from '../Services/categorieService';

import imgBurger from '../Image/icon/bar.png'

const MenuCard = ({id}) => {

    const [categorieById, setCategorieById] = useState([]);
    const [categories, setCategories] = useState([]);
    const [listeBurger, setListeBurger] = useState(false);
    const navigate = useNavigate();
    

    const listeDeroulante = () => {
        setListeBurger(!listeBurger);
      };


    const getProduitByCategorie = async () => {
        try {
            const response = await categorieService.getCategoriesByType(id)
            console.log(response.data);
            setCategorieById(response.data[0])
        } catch (e) {
            console.log(e);
        }
    }

    const getCategorie = async () => {

        try {
            const response = await categorieService.getCategories()
            setCategories(response.data);
        } catch (e) {
           console.log(e); 
        }
    }


    useEffect(() => {
        getProduitByCategorie();
        getCategorie();
    },[])

    const refreshPage = () => {
        window.location.reload();
      };

    return ( <>

        <div className="burger-icon">
            <img src={imgBurger} width={80} alt="icon du menu burger" onClick={listeDeroulante} />
            {listeBurger && ( 
            <ul className='liste-burger-deroulant'>
            {categories.map((cat) => {
                return (
                    <li key={cat.ID_Categorie}  onClick={() => { navigate(`/card/${cat.ID_Categorie}`); refreshPage(); }}>
                      {cat.Categorie_Nom}
                    </li>
                );
            })}
        </ul>
            )}
        </div>
    
    <div className="container-menuCard">

        <div className='background-image'></div>
        <div className="overlay-card">
            <div className="menuCard">
                
                <h2>{categorieById.Categorie_Nom !== undefined && categorieById.Categorie_Nom }</h2>
                
                <div className='categorie-menu'>
                    {categories.map((cat) => (
                         <p onClick={() => { navigate(`/card/${cat.ID_Categorie}`); refreshPage(); }}>{cat.Categorie_Nom}</p>
                    ))}
                
                 </div>
            </div>

        </div>

    </div>
    
    </> );
}
 
export default MenuCard;