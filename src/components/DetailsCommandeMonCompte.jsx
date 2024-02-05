import React from 'react';

const DetailsCommandeMonCompte = ({groupCommandes, fetchMoreAchat}) => {
    return ( <>

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
                            <p className='numero-commande'>Commande n°   {com.numero_commande}</p>
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
    <div className='div-voirPlus'>
    <button className='voirPlus' onClick={fetchMoreAchat}>Afficher plus</button>
    </div>
    
    
    </> );
}
 
export default DetailsCommandeMonCompte;