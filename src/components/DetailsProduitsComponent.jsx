import React, {useContext, useState} from 'react';
import '../styles/detailsProduit.css'
import { toast } from 'react-toastify';

import iconCoeur from '../Image/icon/heart-regular-24.png'
import iconCoeurPlein from '../Image/icon/heart-solid-24.png'
import iconCroix from '../Image/icon/suppr.png'
import GlobalContext from '../context/GlobalContext';
import { ajouterAuPanier } from './AjoutPanierUtilisateur';

const DetailsProduitComponent = ({produit}) => {

    const {setUserPanier, userId} = useContext(GlobalContext)

    const [favori, setFavori] = useState(false);
    const [afficherImageAgrandie, setAfficherImageAgrandie] = useState(false);
    const [imageAgrandieSrc, setImageAgrandieSrc] = useState('');

    // CONST POUR LIKER LE PRODUIT
    const likeHeart = () => {
        setFavori(!favori)
    }

    // CONST POUR AGRANDIR LES IMAGES EN FONCTION DU SRC
    const ImageAgrandie = (src) => {
        setAfficherImageAgrandie(!afficherImageAgrandie);
        setImageAgrandieSrc(src);
      };

      // // Fonction pour ajouter au panier et créer une nouvelle ligne quantiteCommander
      // const ajouterAuPanier = () => {
      //   // ON VA CHERCHER LE PANIER ACTUELLE DU LOCALESTORAGE
      //   const panierLocalStorage = localStorage.getItem(`panier_${userId}`);
      //   //On vérifie si la clé panier existe ou n'est pas undefined ET/OU on l'initialise a un tableau vide
      //   const panier = panierLocalStorage && panierLocalStorage !== 'undefined' ? JSON.parse(panierLocalStorage) : [];

      //   let produitExiste = false;

      //   // Parcourir le panier pour voir si le produit existe déjà
      //   const nouveauPanier = panier.map((pr) => {
      //     if (pr.ID_Produit === produit.ID_Produit) {
      //       pr.quantiteCommander += 1;
      //       pr.prixTotal = pr.Produit_prix * pr.quantiteCommander
      //       produitExiste = true;
      //     }
      //     return pr;
      //   });

      //   // Si le produit n'existe pas, l'ajouter au panier
      //   if (!produitExiste) {
      //     produit.quantiteCommander = 1;
      //     produit.prixTotal = produit.Produit_prix * produit.quantiteCommander
      //     nouveauPanier.push(produit);
      //   }

      //   console.log(nouveauPanier);
      //   // On met à jour le panier dans le LocalStorage en le transformant en chaîne de caractères
      //   localStorage.setItem(`panier_${userId}`, JSON.stringify(nouveauPanier));
      //   // On met à jour le panier dans l'état global
      //   setUserPanier(nouveauPanier);
      //   toast.success("bien ajouté au panier")
        
      // };


    return ( <>

    

   
    <div className="conteneur-detail-produit">

        <div className="image-prix">

            <div className="photo-secondaire">
                <img src={`/Asset/produit/${produit.Produit_Image_1}`}  width={150} alt="" onClick={() => ImageAgrandie(`/Asset/produit/${produit.Produit_Image_1}`)}/>
                <img src={`/Asset/produit/${produit.Produit_Image_2}`} width={150} alt="" onClick={() => ImageAgrandie(`/Asset/produit/${produit.Produit_Image_2}`)}/>
                <img src={`/Asset/produit/${produit.Produit_Image_3}`} width={150} alt="" onClick={() => ImageAgrandie(`/Asset/produit/${produit.Produit_Image_3}`)}/>
            </div>

            <div className='photo-principale' >
                <img src={`/Asset/produit/${produit.Produit_Image_Principale}`} width={600} height={440} alt="" onClick={() => ImageAgrandie(`/Asset/produit/${produit.Produit_Image_Principale}`)}/>
            </div>

            <div className="prix-panier">
                <p>{produit.Produit_nom}</p>
                <p>{produit.Produit_prix}€</p>
                
                <div className="favoris" onClick={likeHeart}>
                    <p>FAVORIS</p>
                    <img src={favori ? iconCoeurPlein : iconCoeur} alt="icon d'un coeur pour ajouter aux favoris"  />
                </div>
                <button onClick={ajouterAuPanier}>Ajouter au Panier</button>
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