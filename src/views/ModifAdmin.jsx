import React, { useEffect, useState } from 'react';
import Header2 from '../components/Header2';
import produitsServices from '../Services/produitsServices';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import imgRetour from '../Image/icon/courbe-de-la-fleche-de-retour-pointant-vers-la-gauche.png'
import categorieService from '../Services/categorieService';
import collectionServices from '../Services/collectionServices';

const ModifAdmin = () => {

    // const [produit, setProduit] = useState({});
    const [categories, setCategories] = useState([]);
    const [collection, setCollection] = useState([]);
    const [updateProduit, setUpdateProduit] = useState({
        nom :"",
        quantite : "",
        prix : "",
        description : "",
        annee : "",
        couleur : "",
        matiere : "",
        metal : "",
        valeur : "",
        imagePNG :  "",
        imageP : "",
        image1 : "",
        image2 : "",
        image3: "",
        collection : "",
        categorie : "",
        id : "",
    });
    // AFFICHAGE DU PRODUIT VIA SON ID
    const {id} = useParams();

    const getProduitById = async () => {
        try {
            const response = await produitsServices.getProduitById(id)
            console.log(response);
            setUpdateProduit(response.data[0])
        } catch (e) {
            console.log(e);
        }
    }
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

    const handleChange = (e) => {
        const {name, value} = e.currentTarget;
        setUpdateProduit({...updateProduit, [name] : value});
        console.log(updateProduit);
    }

    const UpdateProduit = async (e) => {
        e.preventDefault()
        try {
          console.log(updateProduit);
           const response = await produitsServices.updateProduit(updateProduit)
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
    },[])

    return  <>
    <Header2/>
    <div className='nom-admin'>
        <h3>BIENVENUE</h3>
        <p>Julien Coquerie</p>
        <Link to={'/admin'}><img src={imgRetour} alt="icon de retour en arrière" /></Link>
    </div>
    <form>
        <div className="conteneur-form-admin ">
            <div className="form-gauche">
                <input type="hidden"  name='ID_Produit' value={updateProduit.ID_Produit}/>
                <label htmlFor="nom">Nom du produit</label>
                <input type="text" name="Produit_nom" id="nom" value={updateProduit.Produit_nom} placeholder='  nom du produit' onChange={handleChange}/>
                <label htmlFor="categorie">Catégorie du produit</label>

                <select name="FK_Categorie" id="categorie" value={updateProduit.FK_Categorie} onChange={handleChange}>
                    {categories.map((cat) =>(
                        <option key={cat.ID_Categorie} value={cat.ID_Categorie}>{cat.Categorie_Nom}</option>
                    ))}
                </select>

                <label htmlFor="couleur">Couleur Principale</label>
                <input type="text" name='Produit_Couleur' id='couleur'  value={updateProduit.Produit_Couleur}  onChange={handleChange}/>

                <label htmlFor="matiere">Matière</label>
                <input type="text" name='Produit_matiere' id='matiere' value={updateProduit.Produit_matiere}  onChange={handleChange}/>

                <label htmlFor="photoPr">Photo Principale</label>
                <input type="file" id='photoPr' value={""} name='Produit_Image_Principale' onChange={handleChange}/>
                <label htmlFor="photo1">Photo n°1</label>
                <input type="file" name="Produit_Image_1" id="photo1" value={""}  onChange={handleChange}/>
                <label htmlFor="photo2">Photo n°2</label>
                <input type="file" name="Produit_Image_2" id="photo2" value={""} onChange={handleChange}/>
                <label htmlFor="photo3">Photo n°3</label>
                <input type="file" name="Produit_Image_3" id="photo3" value={""} onChange={handleChange}/>
                <label htmlFor="photoPNG">Photo de la Card</label>
                <input type="file" name="Produit_Image_PNG" id="photoPNG" value={""} onChange={handleChange}/>

            </div>

            <div className="form-droite">
                <label htmlFor="prix">Prix du produit</label>
                <input type="number" name='Produit_prix' id='prix' value={updateProduit.Produit_prix} onChange={handleChange}/>

                <label htmlFor="collection">Collection du produit</label>
                <select name="FK_Collection" id="collection" value={updateProduit.FK_Collection} onChange={handleChange}>
                    {collection.map((col) => (
                        <option key={col.ID_Collection} value={col.ID_Collection}>{col.Collection_Nom}</option>
                    ))}
                </select>

                <label htmlFor="annee">Année du produit</label>
                <input type="text" id='annee' value={updateProduit.Produit_annee} name='Produit_annee' onChange={handleChange}/>
                <label htmlFor="quantite">Quantitée du produit</label>
                <input type="number" id='quantite' value={updateProduit.Produit_quantite} name='Produit_quantite' onChange={handleChange}/>
                <label htmlFor="valeur">Valeur Faciale</label>
                <input type="text" name='Produit_valeur' id='valeur' value={updateProduit.Produit_valeur} onChange={handleChange}/>
                <label htmlFor="metal">Métal</label>
                <input type="text" id='metal' name='Produit_metal' value={updateProduit.Produit_metal} onChange={handleChange}/>

                <label htmlFor="description">Description du produit</label>
                <textarea id='description' name='Produit_description' value={updateProduit.Produit_description}  onChange={handleChange}/>

                <button onClick={UpdateProduit}>AJOUTER</button>

            </div>
        </div>
    </form>
    
    </> ;
}
 
export default ModifAdmin;