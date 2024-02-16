import React from 'react';


const FormulaireMonCompte = ({champsActifs, user, handleChange, btnModifMdp, handleOpenModal, boutonModifier, changeChampsEtBouton,updateUser}) => {
    
    return ( <>
    
    <div className="conteneur-monCompte">

        <div className={!champsActifs ? 'left' : 'leftActif'}>

            <input type="hidden" name='User_ID' value={user?.User_ID} />

            <label htmlFor="nom">NOM</label>
            <input type="text" name='User_nom' id='nom' value={user?.User_nom} disabled={!champsActifs} onChange={handleChange}/>

            <label htmlFor="email">Adresse eMail</label>
            <input type="email" name='User_email' id='email' value={user?.User_email} disabled={!champsActifs} onChange={handleChange}/>

            <label htmlFor="adresse">Adresse Postale</label>
            <input type="text" name='User_adresse' id='adresse' value={user?.User_adresse} disabled={!champsActifs} onChange={handleChange}/>

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
            <input type="tel" name='User_telephone' id='tel' value={user?.User_telephone} disabled={!champsActifs} onChange={handleChange}/>

            {!boutonModifier ? <button className='btn-monCompte' onClick={changeChampsEtBouton}>MODIFIER</button> : 
                              <button className='btn-monCompte' onClick={() => {updateUser(); changeChampsEtBouton()}}>ENVOYER</button>}
        </div>
    </div>

    
    
    </> );
}
 
export default FormulaireMonCompte;