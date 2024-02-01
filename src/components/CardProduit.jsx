import React, { useContext, useEffect, useState } from 'react';
import '../styles/card.css'
import { useNavigate} from 'react-router-dom';


import imgCoeur from '../Image/icon/coeur-rempli.png'
import imgPalette from '../Image/icon/palette.png'
import imgCalendrier from '../Image/icon/calendrier.png'
import imgVolant from '../Image/icon/volant.png'
import imgPanier from '../Image/icon/paniers (2).png'
import imgCasque from '../Image/icon/helmet.png'
import imgPoids from '../Image/icon/weight.png'
import imgSculpture from '../Image/icon/sculpture.png'
import imgPiece from '../Image/icon/coin.png'
import imgEuro from '../Image/icon/euro.png'
import GlobalContext from '../context/GlobalContext';
import produitsServices from '../Services/produitsServices';



const CardProduit = ({produitByCategorie, id}) => {

 

    const [produitById, setProduitById] = useState([]);
    const {setUserPanier, user} = useContext(GlobalContext)
    const [produitFiltered, setProduitFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState("");
    const navigate = useNavigate();
  

      const handleChange = (e) => {
        setSearchValue(e.currentTarget.value)
    }



      

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
    
    
    const ajouterAuPanier = (prod) => {
        // ON VA CHERCHER LE PANIER ACTUELLE DU LOCALESTORAGE
        const panierLocalStorage = localStorage.getItem(`panier_${user.User_ID}`);
        //On vérifie si la clé panier existe ou n'est pas undefined ET/OU on l'initialise a un tableau vide
        const panier = panierLocalStorage && panierLocalStorage !== 'undefined' ? JSON.parse(panierLocalStorage) : [];
        // On ajoute le produit au panier
        panier.push(prod)
        // on met a jour le panier dans le LocaleStorage en le transformant en chaine de caractère
        localStorage.setItem(`panier_${user.User_ID}`, JSON.stringify(panier));
        // on met a jour le panier dans l'état global
        setUserPanier(panier)
        
    
        console.log(`Produit "${prod.Produit_nom}" ajouté au panier`);
      };

     

    return ( <>

      
   
        
        <div className="conteneur-card">
          <div className='input-search'>
            <label htmlFor="search">recherche</label>
            <input type="text" id='search' value={searchValue} onChange={handleChange}/> 
          </div>
        
            {produitFiltered.map((prod) => (
                 <div className="conteneur-block" key={prod.ID_Produit} onClick={() => navigate(`/detailsProduit/${prod.ID_Produit}`)}>
                    <img className='coeur' src={imgCoeur} alt="" />
                    <img  className={prod.FK_Categorie  < 8 ? 'voiture' :prod.FK_Categorie < 11 ? 'figurine':
                      'piece'} src={process.env.PUBLIC_URL + `/Asset/produit/${prod.Produit_Image_PNG.replace(/^.*[\\\/]/, '')}`} alt='' />

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
                    
                    <div className="panier">
                        <img src={imgPanier} alt="Logo pour ajouter au panier" onClick={() => {ajouterAuPanier(prod)}}/>
                        <p>12.90€</p>
                    </div>
             </div>
            ))}
        </div>
   
    
    </> );
}
 
export default CardProduit;