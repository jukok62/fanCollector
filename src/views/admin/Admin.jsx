import React, { useEffect, useState } from 'react';
import Header2 from '../../components/Header2';
import '../../styles/admin.css'
import AdminComponent from '../../components/AdminComponent';
import adminService from '../../Services/adminService';



const Admin = () => {

    const [listeProduit, setListeProduit] = useState(false);
    const [produits, setProduits] = useState([]);
    const [produitFiltered, setProduitFiltered] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    // handleChange pour récupérer la valeur dans l'input de recherche
    const handleChange = (e) => {
        setSearchValue(e.currentTarget.value)
        console.log(searchValue);
    }

    // const pour filtrer les produits via la liste déroulante 
    const handleProductClick = (productname)=> {
        setSearchValue(productname)
        setListeProduit(false)
    }
    // const pour la liste déroulante
    const listeDeroulante = () => {
        setListeProduit((prevState) => !prevState);
      };
      
      
      

    //   recupère tous mes produits
    const getProduit = async () => {
        try {
            const response = await adminService.getProduit()
            console.log(response);
            setProduits(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    // permet de supprimer mes produits
    const deleteProduit = async (id) => {
        try {
            const response = await adminService.deleteProduit(id)
            console.log(response);

            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (e) {
            console.log(e);
        }
    }

    // EFFET POUR LA RECHERCHE DES PRODUITS
    useEffect(() => {
        if (searchValue != null && produits.length > 0) {
          let res = produits.filter(prod => prod.Produit_nom.toLowerCase().startsWith(searchValue.toLowerCase()));
          console.log(res);
            setProduitFiltered(res);
        }
    }, [searchValue, produits]);

    // effet pour mettre à jour produitFiltered a chaque fois que le produit change
    useEffect(() => {
        setProduitFiltered(produits)
      },[produits])


    useEffect(() => {
        getProduit();
    },[])
    
    return ( <>
    
   <Header2/>
   <AdminComponent deleteProduit={deleteProduit} handleChange={handleChange} handleProductClick={handleProductClick}
   listeDeroulante={listeDeroulante} listeProduit={listeProduit} 
   produitFiltered={produitFiltered} produits={produits}/>
   
   
    
    </> );
}
 
export default Admin;