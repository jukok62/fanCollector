import React, {useContext, useState} from 'react';
import Modal from 'react-modal';
import '../styles/modalPassword.css'
import userService from '../Services/userService';
import GlobalContext from '../context/GlobalContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const ChangePasswordModal = ({isOpen, onClose}) => {

    const {user} = useContext(GlobalContext)
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState('');
    const [userNewPassword, setUserNewPassword] = useState({
        currentMdp : "",
        newMdp : "",
        verifMdp : "",
        id: user.User_ID
    });

    const handlePasswordChange = (e) => {
        const {name , value} = e.currentTarget;
        setUserNewPassword({...userNewPassword, [name] : value});
        console.log(userNewPassword);
    }

    const modifyPassword = async (e) => {
        e.preventDefault();
        
        try {
            const response = await userService.updateMdp(userNewPassword);
            console.log(response);
            toast.success('modification du mot de passe réussie')
            navigate('/monCompte')
        } catch (e){
            console.log(e);
            toast.error('modification du mot de passe échoué')
        }
    }
    return ( <>
    
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Modifier le mot de passe"
    >
    <div className="modal-password">
        <input type="hidden" name='id' value={user.User_ID} onChange={handlePasswordChange}/>

        <label htmlFor="currentMdp">Mot de passe actuelle</label>
        <input type="password" id='currentMdp' name='currentMdp' value={userNewPassword.currentMdp}  onChange={handlePasswordChange}/>

        <label htmlFor="newMdp">Nouveau mot de passe</label>
        <input type="password" id='newMdp' name='newMdp' value={userNewPassword.newMdp}  onChange={handlePasswordChange}/>

        <label htmlFor="verifMdp">Saissisez à nouveau votre nouveau mot de passe</label>
        <input type="password" id='verifMdp' name='verifMdp' value={userNewPassword.verifMdp}  onChange={handlePasswordChange}/>

        <button onClick={modifyPassword}>ENVOYER</button>
        <button onClick={onClose}>Annuler</button>
    </div>
    </Modal>
    
    
    </> );
}
 
export default ChangePasswordModal;