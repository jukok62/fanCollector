import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import Header2 from '../components/Header2';
import '../styles/admin.css'
import produitsServices from '../Services/produitsServices'

import iconBurger from '../Image/icon/bar.png'
import iconSearch from '../Image/icon/search-regular-24.png'
import iconAdd from '../Image/icon/plus.png'
import iconModifiy from '../Image/icon/bouton-modifier.png'
import iconSupp from '../Image/icon/supprimer2.png'
import iconTriangle from '../Image/icon/triangle.png'

const Admin = () => {

    const [listeProduit, setListeProduit] = useState(false);
    const [produits, setProduits] = useState([]);
    const [produitFiltered, setProduitFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    // handleChange pour récupérer la valeur dans l'input de recherche
    const handleChange = (e) => {
        setSearchValue(e.currentTarget.value)
        console.log(searchValue);
    }

    // const pour filtrer les produits via la liste déroulante 
    const handleProductClick = (productname)=> {
        setSearchValue(productname)
        setListeProduit(false)
    }
    // const pour la liste déroulante
    const listeDeroulante = () => {
        setListeProduit((prevState) => !prevState);
      };
      
      
      

    //   recupère tous mes produits
    const getProduit = async () => {
        try {
            const response = await produitsServices.getProduit()
            setProduits(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    // permet de supprimer mes produits
    const deleteProduit = async (id) => {
        try {
            const response = await produitsServices.deleteProduit(id)
            console.log(response);
        } catch (e) {
            console.log(e);
        }
    }

    // EFFET POUR LA RECHERCHE DES PRODUITS
    useEffect(() => {
        if (searchValue != null && produits.length > 0) {
          let res = produits.filter(prod => prod.Produit_nom.toLowerCase().startsWith(searchValue.toLowerCase()));
          console.log(res);
            setProduitFiltered(res);
        }
    }, [searchValue, produits]);

    // effet pour mettre à jour produitFiltered a chaque fois que le produit change
    useEffect(() => {
        setProduitFiltered(produits)
      },[produits])


    useEffect(() => {
        getProduit();
    },[])

    console.log("clg de produit" , produits);
    return ( <>
    
   <Header2/>
   <div className="benvenue-admin">
        <h3>Bienvenue</h3>
        <p>Julien Coquerie</p>
   </div>
   <div className="conteneur-tableau-admin">
    <div className="header-tableau">
        <div className="liste-produit">
            <img src={iconBurger}height={50} alt="icon burger" onClick={listeDeroulante} />
            {listeProduit && (
            <ul className='liste-produit-deroulant'>
                {produits.map((prod) => {
                    return <li key={prod.ID_Produit} onClick={() => handleProductClick(prod.Produit_nom)}>{prod.Produit_nom}</li>
                })}
            </ul>
            )}
            <p>Liste des produits</p>
        </div>
        <div className="search-produit">
            <img src={iconSearch} height={30} alt="icon search"/>
            <input type="text" placeholder='  Nom du produit' name='nom' onChange={handleChange}/>
            <Link to={"/ajoutAdmin"}><img className='btn-ajouter' src={iconAdd} width={35} alt="icon ajouter" /></Link>
        </div>
    </div>
    
    <table>
        <thead>
            <tr>
            <th className='colonne-img'>Image</th>
            <th className='colonne-produit'>Nom du produit <img class="ASC-icon" src={iconTriangle} width={10} alt="" /></th>
            <th  className='colonne-prixQ'>Prix</th>
            <th className='colonne-prixQ'>Quantités</th>
            <th className='modSupp'>Modifier</th>
            <th className='colonne-modSupp'>Supprimer</th>
            </tr>
        </thead>
        <tbody>
        {produitFiltered.map ((prod) => (
            <tr>
            <td><img src={process.env.PUBLIC_URL +`/Asset/produit/${prod.Produit_Image_Principale}`}   height={50} alt="Produit" className='img-produit'/></td>
            <td>{prod.Produit_nom}</td>
            <td>{prod.Produit_prix}€</td>
            <td>{prod.Produit_quantite}</td>
            <td><Link to={`/modifAdmin/${prod.ID_Produit}`}><img src={iconModifiy} width={35} alt="icon modifier" className='icon-modif' /></Link></td>
            <td><img src={iconSupp} width={35} alt="icon supprimer" className='icon-supp' onClick={() => deleteProduit(prod.ID_Produit)}/></td>
            </tr>
        ))}
        </tbody>
    </table>


   </div>
   
   
    
    </> );
}
 
export default Admin;