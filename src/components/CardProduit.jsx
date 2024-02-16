import React, { useContext, useEffect, useState } from 'react';
import '../styles/card.css'
import { useNavigate} from 'react-router-dom';
import { ajouterAuPanier } from './AjoutPanierUtilisateur';
import { ajoutFavoris } from './AjoutFavoris';


import imgCoeur from '../Image/icon/coeur-rempli.png'
import imgPanier from '../Image/icon/paniers (2).png'
import imgCoeurVide from '../Image/icon/coeur-vide.png'
import imgPalette from '../Image/icon/palette.png'
import imgCalendrier from '../Image/icon/calendrier.png'
import imgVolant from '../Image/icon/volant.png'
import imgCasque from '../Image/icon/helmet.png'
import imgPoids from '../Image/icon/weight.png'
import imgSculpture from '../Image/icon/sculpture.png'
import imgPiece from '../Image/icon/coin.png'
import imgEuro from '../Image/icon/euro.png'
import GlobalContext from '../context/GlobalContext';




const CardProduit = ({produitByCategorie}) => {


    const {setUserPanier , userId, setUserFavoris, userFavoris } = useContext(GlobalContext)
    const [produitFiltered, setProduitFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    // const [userFavoris, setUserFavoris] = useState([]);
    const newFavoris = JSON.parse(localStorage.getItem(`favoris_${userId}`))
    const navigate = useNavigate();
    

    // Recupère la valeur de l'input de recherche
      const handleChange = (e) => {
        setSearchValue(e.currentTarget.value)
    }

     // fonction pour vérifier si le produit est dans les favoris
     const isProductInFavoris = (prod) => {
      if (prod && newFavoris) {
          return newFavoris.some((fav) => fav.ID_Produit === prod.ID_Produit);
      }
      return false;
  };


  // Fonction pour supprimer de la page favoris
  const deleteFavoris = (id) => {
    // Filtrer les favoris pour exclure le produit avec l'ID spécifié
    const nouveauFavoris = newFavoris.filter((fav) => fav.ID_Produit !== id);
    // Mettre à jour les favoris dans le LocalStorage
    localStorage.setItem(`favoris_${userId}`, JSON.stringify(nouveauFavoris));
    //mettre a jour les favoris dans le context Global
    setUserFavoris(nouveauFavoris);
}

 // Fonction pour ajouter ou supprimer des favoris
 const toggleFavori = (prod) => {
  const isFavori = isProductInFavoris(prod);
  if (isFavori) {
    // Supprimer le produit des favoris
    deleteFavoris(prod.ID_Produit)
  } else {
    // Ajouter le produit aux favoris
    ajoutFavoris(userId, prod, setUserFavoris);
  }
};

console.log(isProductInFavoris());



    useEffect(() => {
      if (searchValue != null && produitByCategorie.length > 0) {
        let res = produitByCategorie.filter(prod => prod.Produit_nom.toLowerCase().startsWith(searchValue.toLowerCase()));
        console.log(res);
          setProduitFiltered(res);
      }
  }, [searchValue]);

  useEffect(() => {
    setProduitFiltered(produitByCategorie)
  },[produitByCategorie])
    

     

    return ( <>

      
   
        
        <div className="conteneur-card">
          <div className='input-search'>
            <label htmlFor="search">recherche</label>
            <input type="text" id='search' value={searchValue} onChange={handleChange}/> 
          </div>
        
            {produitFiltered.map((prod) => (
                 <div className="conteneur-block" key={prod.ID_Produit} onClick={() => navigate(`/detailsProduit/${prod.ID_Produit}`)}>
                    <img className='coeur' src={isProductInFavoris(prod) ? imgCoeur : imgCoeurVide } alt=""  onClick={(e) => {
                       e.stopPropagation(); toggleFavori(prod)}
                    }/>
                    <img  className={prod.FK_Categorie  < 8 ? 'voiture' :prod.FK_Categorie < 11 ? 'figurine':
                      'piece'} src={process.env.PUBLIC_URL + `/Asset/produit/${prod.Dossier_nom}/${prod.Produit_Image_PNG.replace(/^.*[\\\/]/, '')}`}  alt='' />

                    <div className={prod.FK_Categorie  < 8 ? 'nom' : 'nomBis'}>
                        <p>{prod.Produit_nom}</p>
                        <p>{prod.FK_Categorie < 8 ? "1/43" : ""}</p>
                    </div>

                    <div className="palette">
                        <img src={prod.FK_Categorie  < 8 ? imgPalette :prod.FK_Categorie < 11 ? imgPoids : imgPiece} alt="" />
                        <p>{prod.FK_Categorie < 8 ? prod.Produit_Couleur : prod.FK_Categorie < 11 ? prod.Produit_matiere : prod.Produit_metal}</p>
                    </div>

                    <div className="calendrier">
                        <img src={imgCalendrier} alt="" />
                        <p>{prod.Produit_annee}</p>
                    </div>

                    <div className='volant'>
                        <img src={prod.FK_Categorie  < 6 ? imgVolant : prod.FK_Categorie < 8 ? imgCasque: prod.FK_Categorie < 11 ? imgSculpture : imgEuro
                        } alt="" />
                        <p>{prod.FK_Categorie < 11 ? prod.Collection_Nom : prod.Produit_valeur}</p>
                    </div>
                    
                    <div className="panier" onClick={(e) => {
                      e.stopPropagation(); // Empêche la propagation de l'événement à la div parente
                      navigate(`/detailsProduit/${prod.ID_Produit}`) ;
                      ajouterAuPanier(userId, prod, setUserPanier);
                    }}>
                        <img src={imgPanier} alt="Logo pour ajouter au panier"/>
                        <p>12.90€</p>
                    </div>
             </div>
            ))}
        </div>
   
    
    </> );
}
 
export default CardProduit;