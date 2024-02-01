import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/monCompte.css'
import achatService from '../Services/achatService';
import { format } from 'date-fns';
import GlobalContext from '../context/GlobalContext';
import userService from '../Services/userService';
import { toast } from 'react-toastify';

import imgDeco from '../Image/icon/se-deconnecter32px1.png'
import ChangePasswordModal from '../modal/ChangePasswordModal';
import { useNavigate } from 'react-router-dom';

const MonCompte = () => {

    const {user, setUser, userId, setUserId} = useContext(GlobalContext)
    const [commandes, setCommandes] = useState([]);
    const [champsActifs, setChampsActifs] = useState(false);
    const [boutonModifier, setBoutonModifier] = useState(false);
    const [btnModifMdp, setBtnModifMdp] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
  
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


    const getAchat = async () => {
        try {
            const response = await achatService.getAchat(userId);
            setCommandes(response.data)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getAchat();
    },[])

    const groupCommandes = () => {
        const groupedCommandes = [];

        commandes.forEach((com, index) => {
            const currentDate = com.acheter_date ? format(new Date(com.acheter_date), 'dd-MM-yyyy') : '';
            const isFirstCommande = index === 0;
            const isNewCommande = !isFirstCommande && com.numero_commande !== commandes[index - 1].numero_commande;

            if (isFirstCommande || isNewCommande) {
                groupedCommandes.push([{...com, currentDate}]);
            } else {
                groupedCommandes[groupedCommandes.length - 1].push(com);
            }
        });
        // console.table(groupedCommandes);

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

    <Header/>

    <div className="nom-monCompte">
        <h3>Bienvenue</h3>
        <p>{user?.User_nom} {user?.User_prenom}</p>
        <img src={imgDeco} alt="bouton de déconnection" onClick={deconnexion}/>
    </div>
    
    <div className="conteneur-monCompte">

        <div className={!champsActifs ? 'left' : 'leftActif'}>

            <input type="hidden" name='User_ID' value={user?.User_ID} />

            <label htmlFor="nom">NOM</label>
            <input type="text" name='User_nom' id='nom' value={user?.User_nom} disabled={!champsActifs} onChange={handleChange}/>

            <label htmlFor="email">Adresse eMail</label>
            <input type="email" name='User_email' id='email' value={user?.User_email} disabled={!champsActifs} onChange={handleChange}/>

            <label htmlFor="adresse">Adresse Postale</label>
            <input type="text" name='User_adress' id='adresse' value={user?.User_adresse} disabled={!champsActifs} onChange={handleChange}/>

            {btnModifMdp && (
            <button onClick={handleOpenModal}>Modifier le mot de passe</button>
           )}

        </div>

        <div className={!champsActifs ? 'right' : "rightActif"}>

            <label htmlFor="prenom">Prénom</label>
            <input type="text" name='User_prenom' id='prenom' value={user?.User_prenom} disabled={!champsActifs} onChange={handleChange}/>

            <label htmlFor="genre">Genre</label>
            <select name="User_genre" id="genre" value={user?.User_genre} disabled={!champsActifs} onChange={handleChange}>
                <option value="Mr">Mr</option>
                <option value="Mme">Mme</option>
                <option value="autre">autre</option>
            </select>

            <label htmlFor="tel">Téléphone</label>
            <input type="tel" name='User_tel' id='tel' value={user?.User_telephone} disabled={!champsActifs} onChange={handleChange}/>

            {!boutonModifier ? <button className='btn-monCompte' onClick={changeChampsEtBouton}>MODIFIER</button> : 
                              <button className='btn-monCompte' onClick={() => {updateUser(); changeChampsEtBouton()}}>ENVOYER</button>}
        </div>
    </div>

    <h3 className="mesCommande">MES COMMANDES</h3>
    <div className='contneur-principale-commandes'>  
    {groupCommandes().map((group, groupIndex) => (
        <div className="conteneur-mesCommande" key={groupIndex}>
            {group.map((com, index) => (
                <div className={`commande${index === 0 ? '' : ' continuation'}`} key={com.FK_Produit}>
                    {index === 0 && (
                        <div className="enTete-commande">
                            <p>date : {com.currentDate}</p>
                            <p>prix 110€</p>
                        </div>
                    )}
                    <div className='detail-commande'>
                        <img src={process.env.PUBLIC_URL +`/Asset/produit/${com.Produit_Image_Principale}`} width={100} alt="" />
                        <p>{com.Produit_nom}</p>
                        <p>{com.Produit_prix}€</p>
                    </div>
                </div>
            ))}
        </div>
    ))}
    </div>  

    
    <ChangePasswordModal isOpen={isModalOpen} onClose={handleCloseModal}/>
    
    </> );
}
 
export default MonCompte;