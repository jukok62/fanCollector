import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import '../styles/monCompte.css'
import achatService from '../Services/achatService';
import { format } from 'date-fns';
import GlobalContext from '../context/GlobalContext';

const MonCompte = () => {

    const {user, setUser, userId, setUserId} = useContext(GlobalContext)
    const [commandes, setCommandes] = useState([]);


    const getAchat = async () => {
        try {
            const response = await achatService.getAchat(userId);
            setCommandes(response.data)
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(storedUser){
            //  on récupère l'utilisateur stocké et on le retransforme en objet json.
            const parsedUser = JSON.parse(storedUser)
            // Vérifiez si parsedUser est évalué à true avant d'accéder à ses propriétés.
            if(parsedUser){
                setUserId(parsedUser.User_Id)
                setUser(parsedUser)
            }
        }
        getAchat();
    },[setUser, setUserId])

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
        console.table(groupedCommandes);

        return groupedCommandes;
    };

   
    
    return ( <>

    <Header/>

    <div className="nom-monCompte">
        <h3>Bienvenue</h3>
        <p>{user?.User_nom} {user?.User_prenom}</p>
    </div>
    
    <div className="conteneur-monCompte">

        <div className='left'>

            <label htmlFor="nom">NOM</label>
            <input type="text" name='nom' id='nom' value={user?.User_nom} />

            <label htmlFor="email">Adresse eMail</label>
            <input type="email" name='email' id='email' value={user?.User_email}/>

            <label htmlFor="adresse">Adresse Postale</label>
            <input type="text" name='adresse' id='adresse' value={user?.User_adresse}/>

            <label htmlFor="mdp">Mot de passe</label>
            <input type="password" name='mdp' id='mdp' value={user?.User_mdp} />

        </div>

        <div className="right">

            <label htmlFor="prenom">Prénom</label>
            <input type="text" name='prenom' id='prenom' value={user?.User_prenom}/>

            <label htmlFor="genre">Genre</label>
            <input type="text" name="genre" id="genre" value={user?.User_genre}/>

            <label htmlFor="tel">Téléphone</label>
            <input type="tel" name='tel' id='tel' value={user?.User_telephone}/>

            <button className='btn-monCompte'>MODIFIER</button>
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
  
    
    
    </> );
}
 
export default MonCompte;