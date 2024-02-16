import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

import imgCoeur from '../../Image/icon/coeur-rempli.png'
import imgPalette from '../../Image/icon/palette.png'
import imgCalendrier from '../../Image/icon/calendrier.png'
import imgVolant from '../../Image/icon/volant.png'
import imgPanier from '../../Image/icon/paniers (2).png'
import imgCasque from '../../Image/icon/helmet.png'
import imgPoids from '../../Image/icon/weight.png'
import imgSculpture from '../../Image/icon/sculpture.png'
import imgPiece from '../../Image/icon/coin.png'
import imgEuro from '../../Image/icon/euro.png'


const TousLesProduitsComponent = ({produits}) => {

    const [searchValue, setSearchValue] = useState("");
    const [produitFiltered, setProduitFiltered] = useState([]);
    const navigate = useNavigate();

    

    useEffect(() => {
        if (searchValue != null && produits.length > 0) {
          let res = produits.filter(prod => prod.Produit_nom.toLowerCase().startsWith(searchValue.toLowerCase()));
          console.log(res);
          setProduitFiltered(res);
        }
    }, [searchValue]);

    useEffect(() => {
        setProduitFiltered(produits)
      },[produits])

    const handleChange = (e) => {
        setSearchValue(e.currentTarget.value)
    }
    return ( <>
    
    <div className="conteneur-card2">
          <div className='input-search'>
            <label htmlFor="search">recherche</label>
            <input type="text" id='search' value={searchValue} onChange={handleChange}/> 
          </div>
        
            {produitFiltered.map((prod) => (
                 <div className="conteneur-block" key={prod.ID_Produit} onClick={() => navigate(`/detailsProduit/${prod.ID_Produit}`)}>
                    <img className='coeur' src={imgCoeur} alt="" />
                    <img  className={prod.FK_Categorie  < 8 ? 'voiture' :prod.FK_Categorie < 11 ? 'figurine':
                      'piece'} src={process.env.PUBLIC_URL + `/Asset/produit/${prod.Dossier_nom}/${prod.Produit_Image_PNG.replace(/^.*[\\\/]/, '')}`} alt='' />

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
                      navigate(`/detailsProduit/${prod.ID_Produit}`)
                    }}>
                        <img src={imgPanier} alt="Logo pour ajouter au panier"/>
                        <p>12.90€</p>
                    </div>
             </div>
            ))}
        </div>
   
    
    </> );
    
}
 
export default TousLesProduitsComponent;