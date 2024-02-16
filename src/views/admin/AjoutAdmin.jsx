import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import Header2 from '../../components/Header2';
import { toast } from 'react-toastify';
import '../../styles/formulaireAdmin.css'
import imgRetour from '../../Image/icon/courbe-de-la-fleche-de-retour-pointant-vers-la-gauche.png'
import categorieService from '../../Services/categorieService';
import collectionServices from '../../Services/collectionServices';
import dossierService from '../../Services/dossierService';
import adminService from '../../Services/adminService';
import FormulaireAdmin from '../../components/admin/FormulaireAdmin';


const AjoutAdmin = () => {

    const [categories, setCategories] = useState([]);
    const [dossiers, setDossiers] = useState([]);
    const [collection, setCollection] = useState([]);
    const [ajoutProduits, setAjoutProduits] = useState({
        Produit_nom :"",
        Produit_quantite : "",
        Produit_prix : "",
        Produit_description : "",
        Produit_annee : "",
        Produit_couleur : null,
        Produit_matiere : null,
        Produit_metal : null,
        Produit_valeur : null,
        Produit_Image_PNG :  "",
        Produit_Image_Principale : "",
        Produit_Image_1 : null,
        Produit_Image_2 : null,
        Produit_Image_3: null,
        FK_Collection : "",
        FK_Categorie : "",
        FK_Dossier : "",
    });

    const handleChange = (e) => {
        const { name, value } = e.currentTarget;
        
        if (name === 'prix' || name === 'quantite' || name === 'valeur' || name === 'collection' || name === 'categorie') {
            // Utilisez parseInt pour convertir value en nombre 
            const numericValue = parseInt(value, 10);
    
            // Vérifiez si la conversion a réussi
            if (!isNaN(numericValue)) {
                // Utilisez numericValue au lieu de value dans la mise à jour de l'état
                setAjoutProduits({ ...ajoutProduits, [name]: numericValue });
            } else {
                // Vous pouvez traiter le cas où la conversion a échoué, par exemple, en définissant une valeur par défaut
                setAjoutProduits({ ...ajoutProduits, [name]: 0 });
            }
        } else {
            // Si le nom de l'élément ne correspond à aucun des cas ci-dessus,
            // met simplement à jour l'état avec la nouvelle valeur
            setAjoutProduits({ ...ajoutProduits, [name]: value });
        }
    
        console.log(ajoutProduits);
    };
    
    
    const ajoutProduit = async (e) => {
        e.preventDefault();
        try {
            const response = await adminService.AddProduit(ajoutProduits);
            console.log(response);
            toast.success("votre ajout c'est bien passé");
        } catch (e) {
            console.log(e);
            toast.error("votre ajout ne c'est pas bien passé");
        }
    }

    const getCategorie = async () => {
        try {
            const response = await categorieService.getCategories()
            setCategories(response.data)
        } catch (e) {
           console.log(e); 
        }
    }

    const getDossier = async () => {
        try {
            const response = await dossierService.getDossier();
            setDossiers(response.data)
        } catch (e) {
           console.log(e); 
        }
    }

    const getCollection = async () => {
        try {
            const response = await collectionServices.getCollections();
            setCollection(response.data);
        } catch (e) {
          console.log(e);  
        }
    }

    useEffect(() => {
        getCategorie();
        getCollection();
        getDossier();
    },[]);

    console.log(collection);


    return ( <>
    
    <Header2/>
    <div className='nom-admin'>
        <h3>BIENVENUE</h3>
        <p>Julien Coquerie</p>
        <Link to={'/admin'}><img src={imgRetour} alt="icon de retour en arrière" /></Link>
    </div>
   <FormulaireAdmin UpdateProduit={ajoutProduit} updateProduit={ajoutProduits} categories={categories}
   collection={collection} dossiers={dossiers} handleChange={handleChange}/>
    
    </> );
}
 
export default AjoutAdmin;