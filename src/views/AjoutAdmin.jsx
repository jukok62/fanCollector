import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom'
import Header from '../components/Header';
import { toast } from 'react-toastify';
import '../styles/formulaireAdmin.css'
import imgRetour from '../Image/icon/courbe-de-la-fleche-de-retour-pointant-vers-la-gauche.png'
import categorieService from '../Services/categorieService';
import collectionServices from '../Services/collectionServices';
import produitsServices from '../Services/produitsServices';


const AjoutAdmin = () => {

    const [categories, setCategories] = useState([]);
    const [collection, setCollection] = useState([]);
    const [ajoutProduits, setAjoutProduits] = useState({
        nom :"",
        quantite : "",
        prix : "",
        description : "",
        annee : "",
        couleur : null,
        matiere : null,
        metal : null,
        valeur : null,
        imagePNG :  "",
        imageP : "",
        image1 : null,
        image2 : null,
        image3: null,
        collection : "",
        categorie : ""
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
            const response = await produitsServices.AddProduit(ajoutProduits);
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
    },[]);

    console.log(collection);


    return ( <>
    
    <Header/>
    <div className='nom-admin'>
        <h3>BIENVENUE</h3>
        <p>Julien Coquerie</p>
        <Link to={'/admin'}><img src={imgRetour} alt="icon de retour en arrière" /></Link>
    </div>
    <form>
        <div className="conteneur-form-admin">
            <div className="form-gauche">
                <label htmlFor="nom">Nom du produit</label>
                <input type="text" name="nom" id="nom" value={ajoutProduits.nom} placeholder='  nom du produit' onChange={handleChange}/>
                <label htmlFor="categorie">Catégorie du produit</label>

                <select name="categorie" id="categorie" value={ajoutProduits.categorie} onChange={handleChange}>
                    {categories.map((cat) =>(
                        <option key={cat.ID_Categorie} value={cat.ID_Categorie}>{cat.Categorie_Nom}</option>
                    ))}
                </select>

                <label htmlFor="couleur">Couleur Principale</label>
                <input type="text" name='couleur' id='couleur'  value={ajoutProduits.couleur}  onChange={handleChange}/>

                <label htmlFor="matiere">Matière</label>
                <input type="text" name='matiere' id='matiere' value={ajoutProduits.matiere}  onChange={handleChange}/>

                <label htmlFor="photoPr">Photo Principale</label>
                <input type="file" id='photoPr' value={ajoutProduits.imageP} name='imageP' onChange={handleChange}/>
                <label htmlFor="photo1">Photo n°1</label>
                <input type="file" name="image1" id="photo1" value={ajoutProduits.image1}  onChange={handleChange}/>
                <label htmlFor="photo2">Photo n°2</label>
                <input type="file" name="image2" id="photo2" value={ajoutProduits.image2} onChange={handleChange}/>
                <label htmlFor="photo3">Photo n°3</label>
                <input type="file" name="image3" id="photo3" value={ajoutProduits.image3} onChange={handleChange}/>
                <label htmlFor="photoPNG">Photo de la Card</label>
                <input type="file" name="imagePNG" id="photoPNG" value={ajoutProduits.imagePNG} onChange={handleChange}/>

            </div>

            <div className="form-droite">
                <label htmlFor="prix">Prix du produit</label>
                <input type="number" name='prix' id='prix' value={ajoutProduits.prix} onChange={handleChange}/>

                <label htmlFor="collection">Collection du produit</label>
                <select name="collection" id="collection" value={ajoutProduits.collection} onChange={handleChange}>
                    {collection.map((col) => (
                        <option key={col.ID_Collection} value={col.ID_Collection}>{col.Collection_Nom}</option>
                    ))}
                </select>

                <label htmlFor="annee">Année du produit</label>
                <input type="text" id='annee' value={ajoutProduits.annee} name='annee' onChange={handleChange}/>
                <label htmlFor="quantite">Quantitée du produit</label>
                <input type="number" id='quantite' value={ajoutProduits.quantite} name='quantite' onChange={handleChange}/>
                <label htmlFor="valeur">Valeur Faciale</label>
                <input type="text" name='valeur' id='valeur' value={ajoutProduits.valeur} onChange={handleChange}/>
                <label htmlFor="metal">Métal</label>
                <input type="text" id='metal' value={ajoutProduits.metal} onChange={handleChange}/>

                <label htmlFor="description">Description du produit</label>
                <textarea id='description' name='description' value={ajoutProduits.description}  onChange={handleChange}/>

                <button onClick={ajoutProduit}>AJOUTER</button>

            </div>
        </div>
    </form>
    
    </> );
}
 
export default AjoutAdmin;