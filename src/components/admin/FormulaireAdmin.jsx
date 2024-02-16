import React from 'react';

const FormulaireAdmin = ({updateProduit, categories, handleChange, collection, dossiers, UpdateProduit}) => {
    console.log(updateProduit);
    return ( <>

<form>
        <div className="conteneur-form-admin ">
            <div className="form-gauche">
                <input type="hidden"  name='ID_Produit' value={updateProduit && updateProduit.ID_Produit}/>
                <label htmlFor="nom">Nom du produit</label>
                <input type="text" name="Produit_nom" id="nom" value={updateProduit && updateProduit.Produit_nom} placeholder='  nom du produit' onChange={handleChange}/>
                <label htmlFor="categorie">Catégorie du produit</label>

                <select name="FK_Categorie" id="categorie" value={updateProduit && updateProduit.FK_Categorie} onChange={handleChange}>
                    {categories.map((cat) =>(
                        <option key={cat.ID_Categorie} value={cat.ID_Categorie}>{cat.Categorie_Nom}</option>
                    ))}
                </select>

                <label htmlFor="couleur">Couleur Principale</label>
                <input type="text" name='Produit_Couleur' id='couleur'  value={updateProduit && updateProduit.Produit_Couleur}  onChange={handleChange}/>

                <label htmlFor="matiere">Matière</label>
                <input type="text" name='Produit_matiere' id='matiere' value={updateProduit && updateProduit.Produit_matiere}  onChange={handleChange}/>

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
                <input type="number" name='Produit_prix' id='prix' value={updateProduit && updateProduit.Produit_prix} onChange={handleChange}/>

                <label htmlFor="collection">Collection du produit</label>
                <select name="FK_Collection" id="collection" value={updateProduit && updateProduit.FK_Collection} onChange={handleChange}>
                    {collection.map((col) => (
                        <option key={col.ID_Collection} value={col.ID_Collection}>{col.Collection_Nom}</option>
                    ))}
                </select>

                <label htmlFor="annee">Année du produit</label>
                <input type="text" id='annee' value={updateProduit && updateProduit.Produit_annee} name='Produit_annee' onChange={handleChange}/>
                <label htmlFor="quantite">Quantitée du produit</label>
                <input type="number" id='quantite' value={updateProduit && updateProduit.Produit_quantite} name='Produit_quantite' onChange={handleChange}/>
                <label htmlFor="valeur">Valeur Faciale</label>
                <input type="text" name='Produit_valeur' id='valeur' value={updateProduit && updateProduit.Produit_valeur} onChange={handleChange}/>
                <label htmlFor="metal">Métal</label>
                <input type="text" id='metal' name='Produit_metal' value={updateProduit && updateProduit.Produit_metal} onChange={handleChange}/>

                <label htmlFor="dossier">Nom du dossier pour les images</label>
                <select id="dossier" name="FK_Dossier" value={updateProduit && updateProduit.FK_Dossier} onChange={handleChange}>
                <option disabled value={""}>Dossier Image</option>
                {dossiers.map((doss) => (
                        <option key={doss.ID_Dossier}  value={doss.ID_Dossier}>{doss.Dossier_nom}</option>
                    ))}
                
                </select>

                <label htmlFor="description">Description du produit</label>
                <textarea id='description' name='Produit_description' value={updateProduit && updateProduit.Produit_description}  onChange={handleChange}/>

                <button onClick={UpdateProduit}>MODIFIER</button>

            </div>
        </div>
    </form>
    
    
    </> );
}
 
export default FormulaireAdmin;