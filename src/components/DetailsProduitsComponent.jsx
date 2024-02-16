import React, {useContext, useState} from 'react';
import '../styles/detailsProduit.css'
import {ajouterAuPanier} from  './AjoutPanierUtilisateur'
import { ajoutFavoris } from './AjoutFavoris';

import iconCoeur from '../Image/icon/heart-regular-24.png'
import iconCoeurPlein from '../Image/icon/heart-solid-24.png'
import iconCroix from '../Image/icon/suppr.png'
import GlobalContext from '../context/GlobalContext'
import { toast } from 'react-toastify';

const DetailsProduitComponent = ({produit}) => {

  console.log(produit);

    const [favori, setFavori] = useState(false);
    const [afficherImageAgrandie, setAfficherImageAgrandie] = useState(false);
    const [imageAgrandieSrc, setImageAgrandieSrc] = useState('');
    const{userId , setUserPanier, setUserFavoris} = useContext(GlobalContext);
    const newFavoris = JSON.parse(localStorage.getItem(`favoris_${userId}`));

    // CONST POUR LIKER LE PRODUIT
    const likeHeart = () => {
        setFavori(!favori)
    }

    // CONST POUR AGRANDIR LES IMAGES EN FONCTION DU SRC
    const ImageAgrandie = (src) => {
        setAfficherImageAgrandie(!afficherImageAgrandie);
        setImageAgrandieSrc(src);
      };


      // Fonction pour supprimer de la page favoris
      const deleteFavoris = (id) => {
        // Filtrer les favoris pour exclure le produit avec l'ID spécifié
        const nouveauFavoris = newFavoris.filter((fav) => fav.ID_Produit !== id);
        // Mettre à jour les favoris dans le LocalStorage
        localStorage.setItem(`favoris_${userId}`, JSON.stringify(nouveauFavoris));
    }

    // fonction pour vérifier si le produit est dans les favoris
    const isProductInFavoris = () => {
      if (newFavoris) {
          return newFavoris.some((fav) => fav.ID_Produit === produit.ID_Produit);
      }
      return false;
  };



    return ( <>

    

   
    <div className="conteneur-detail-produit">

        <div className="image-prix">

            <div className="photo-secondaire">
                <img src={`/Asset/produit/${produit.Dossier_nom}/${produit.Produit_Image_1}`}  alt="" onClick={() => ImageAgrandie(`/Asset/produit/${produit.Dossier_nom}/${produit.Produit_Image_1}`)}/>
                <img src={`/Asset/produit/${produit.Dossier_nom}/${produit.Produit_Image_2}`}  alt="" onClick={() => ImageAgrandie(`/Asset/produit/${produit.Dossier_nom}/${produit.Produit_Image_2}`)}/>
                <img src={`/Asset/produit/${produit.Dossier_nom}/${produit.Produit_Image_3}`}  alt="" onClick={() => ImageAgrandie(`/Asset/produit/${produit.Dossier_nom}/${produit.Produit_Image_3}`)}/>
            </div>

            <div className='photo-principale' >
                <img src={`/Asset/produit/${produit.Dossier_nom}/${produit.Produit_Image_Principale}`}  alt="" onClick={() => ImageAgrandie(`/Asset/produit/${produit.Dossier_nom}/${produit.Produit_Image_Principale}`)}/>
            </div>

            <div className="prix-panier">
                <p>{produit.Produit_nom}</p>
                <p>{produit.Produit_prix}€</p>
                
                <div className="favoris" onClick={() => { likeHeart(); isProductInFavoris() ? deleteFavoris(produit.ID_Produit) : ajoutFavoris(userId, produit, setUserFavoris); }}>
                    <p>FAVORIS</p>
                    <img src={isProductInFavoris() ? iconCoeurPlein : iconCoeur} alt="icon d'un coeur pour ajouter aux favoris"  />
                </div>
                <button onClick={() => {ajouterAuPanier(userId, produit, setUserPanier)}}>Ajouter au Panier</button>
            </div>
        </div>

        <div className="description-produit">
            <h3>DESCRIPTION</h3>
            <p>{produit.Produit_description}</p>
        </div>

        {afficherImageAgrandie && (
          <div className="modal-image" onClick={() => ImageAgrandie('')}>
            <div className="modal-contenu">
              <img src={iconCroix} className="bouton-fermer" onClick={ImageAgrandie}/>
              
              <div className="image-agrandie-container">
                <img src={imageAgrandieSrc} alt="Image agrandie" />
              </div>
            </div>
          </div>
        )}
         
    </div>
     
    
    
    </> );
}
 
export default DetailsProduitComponent;