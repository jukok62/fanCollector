import React, { useEffect, useState } from 'react';
import Header2 from '../../components/Header2';
import produitsServices from '../../Services/produitsServices';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import imgRetour from '../../Image/icon/courbe-de-la-fleche-de-retour-pointant-vers-la-gauche.png'
import categorieService from '../../Services/categorieService';
import collectionServices from '../../Services/collectionServices';
import dossierService from '../../Services/dossierService';
import adminService from '../../Services/adminService';
import FormulaireAdmin from '../../components/admin/FormulaireAdmin';

const ModifAdmin = () => {

    // const [produit, setProduit] = useState({});
    const [categories, setCategories] = useState([]);
    const [collection, setCollection] = useState([]);
    const [dossiers, setDossiers] = useState([]);
    const [updateProduit, setUpdateProduit] = useState({});
    // AFFICHAGE DU PRODUIT VIA SON ID
    const {id} = useParams();

    const getProduitById = async () => {
        try {
            const response = await produitsServices.getProduitById(id)
            setUpdateProduit(response.data[0])
        } catch (e) {
            console.log(e);
             
        }
    }

    console.log(updateProduit);
    // AFFICHAGE DES CATEGORIES
    const getCategorie = async () => {
        try {
            const response = await categorieService.getCategories()
            setCategories(response.data)
        } catch (e) {
           console.log(e); 
        }
    }
    // AFFICHAGE DES COLLECTIONS
    const getCollection = async () => {
        try {
            const response = await collectionServices.getCollections()
            setCollection(response.data);
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

    const handleChange = (e) => {
        const {name, value} = e.currentTarget;
        setUpdateProduit({...updateProduit, [name] : value});
        console.log(updateProduit);
    }

    const UpdateProduit = async (e) => {
        e.preventDefault()
        try {
          console.log(updateProduit);
           const response = await adminService.updateProduit(updateProduit)
           toast.success("La modification du produit "+ updateProduit.Produit_nom + " à bien été crée");
        console.log(response);
        } catch (e) {
         console.log(e)   
         toast.error("La modification du produit "+ updateProduit.Produit_nom + "c'est mal passé");
        }
        // console.log(update)
    }
    

    useEffect(() => {
        getProduitById();
        getCategorie();
        getCollection();
        getDossier();
    },[])

    return  <>
    <Header2/>
    <div className='nom-admin'>
        <h3>BIENVENUE</h3>
        <p>Julien Coquerie</p>
        <Link to={'/admin'}><img src={imgRetour} alt="icon de retour en arrière" /></Link>
    </div>
    
    <FormulaireAdmin updateProduit={updateProduit} UpdateProduit={UpdateProduit} categories={categories}
    collection={collection} dossiers={dossiers} handleChange={handleChange}/>
    
    </> ;
}
 
export default ModifAdmin;