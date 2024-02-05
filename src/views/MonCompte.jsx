import React, { useContext, useEffect, useState } from 'react';
import Header2 from '../components/Header2';
import '../styles/monCompte.css'
import achatService from '../Services/achatService';
import { format } from 'date-fns';
import GlobalContext from '../context/GlobalContext';
import userService from '../Services/userService';
import { toast } from 'react-toastify';

import imgDeco from '../Image/icon/se-deconnecter32px1.png'
import iconAdmin from '../Image/icon/user.png'
import ChangePasswordModal from '../modal/ChangePasswordModal';
import { useNavigate, Link } from 'react-router-dom';
import FormulaireMonCompte from '../components/FormulaireMonCompte';
import DetailsCommandeMonCompte from '../components/DetailsCommandeMonCompte';

const MonCompte = () => {

    const {user, setUser, userId, setUserId} = useContext(GlobalContext)
    const [commandes, setCommandes] = useState([]);
    const [champsActifs, setChampsActifs] = useState(false);
    const [boutonModifier, setBoutonModifier] = useState(false);
    const [btnModifMdp, setBtnModifMdp] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //const pour gérer l'affichage des commandes
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(5);

    
    // const pour affichr plus de commandes avec LIMIT ET OFFSET
    const fetchMoreAchat = async () => {
        try {
            const response = await achatService.fetchAchatByUser(userId, limit, offset);
            console.log(response.data.result);
    
            // Filtrer les nouvelles commandes pour ne pas inclure celles déjà présentes
            const newCommandes = response.data.result.filter(newCom => !commandes.some(existingCom => existingCom.numero_commande === newCom.numero_commande));
            console.log("Nouvelles commandes :", newCommandes);
    
            // Mise à jour de l'état avec les nouvelles données sans supprimer les existantes
            setCommandes(prevCommandes => {
                console.log("Avant la mise à jour :", prevCommandes);
                const updatedCommandes = [...prevCommandes, ...newCommandes];
                console.log("Après la mise à jour (avant suppression des doublons) :", updatedCommandes);
    
                // Supprimer les doublons en utilisant filter
                const uniqueCommandes = updatedCommandes.filter((commande, index, self) =>
                    index === self.findIndex(c => c.numero_commande === commande.numero_commande)
                );
    
                console.log("Après la mise à jour (après suppression des doublons) :", uniqueCommandes);
                return uniqueCommandes;
            });
    
            // Mise à jour du décalage pour la prochaine requête
            setOffset((prevOffset) => prevOffset + limit);
        } catch (error) {
            console.error(error);
        }
    };
    
      



    // Const pour ouvrir ou fermer la modale du mot de passe
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
  
    // const pour gérer l'état des boutons et champs  
    const changeChampsEtBouton = () => {
      setChampsActifs(!champsActifs);
      setBoutonModifier(!boutonModifier);
      setBtnModifMdp(!btnModifMdp)
    };


    // RECUPERATION DES VALUES
    const handleChange = (e) => {
        const {name, value} = e.currentTarget;
        setUser({...user, [name] : value})
    }

    // ENVOIS DES DONNEES MISE A JOUR
    const updateUser = async (e) => {
        try {
          const response = await userService.updateUser(user) 
          toast.success('La modification a bien été enregistré')
        } catch (e) {
            console.log(e);
            toast.error('La modification a échoué')
        }
    }

    useEffect(() => {
        // getAchat();
        fetchMoreAchat();
    },[])

    const groupCommandes = () => {
        const groupedCommandes = [];

        commandes.forEach((com, index) => {
            const currentDate = com.date_achat ? format(new Date(com.date_achat), 'dd-MM-yyyy') : '';
            const isFirstCommande = index === 0;
            const isNewCommande = !isFirstCommande && com.numero_commande !== commandes[index - 1].numero_commande;

            if (isFirstCommande || isNewCommande) {
                groupedCommandes.push([{...com, currentDate}]);
            } else {
                groupedCommandes[groupedCommandes.length - 1].push(com);
            }
        });

        return groupedCommandes;
    };

   // CONST DECONNECTION 
   const deconnexion = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('userId')
    localStorage.removeItem(`panier${userId}`)
    setTimeout(() => {
        window.location.reload();
    }, 500);
}  
    
    return ( <>

    <Header2/>

    <div className="nom-monCompte">
        <h3>Bienvenue</h3>
        <p>{user?.User_nom} {user?.User_prenom}</p>
        <img src={imgDeco} className='img-deco' alt="bouton de déconnection" onClick={deconnexion}/>
        {user && user.User_admin ? <Link to={'/admin'}>
        <img src={iconAdmin} className='img-admin' alt="bouton de déconnection"/>
        </Link> : ""}
        
    </div>
    
    <FormulaireMonCompte boutonModifier={boutonModifier} btnModifMdp={btnModifMdp} champsActifs={champsActifs} changeChampsEtBouton={changeChampsEtBouton}
    handleChange={handleChange} handleOpenModal={handleOpenModal} updateUser={updateUser} user={user}/>
    

    <DetailsCommandeMonCompte fetchMoreAchat={fetchMoreAchat} groupCommandes={groupCommandes}/>

    
    <ChangePasswordModal isOpen={isModalOpen} onClose={handleCloseModal}/>
    
    </> );
}
 
export default MonCompte;