import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Inscription from './views/Inscription';
import Connexion from './views/Connexion';
import Accueil from './views/Accueill';
import Apropos from './views/Apropos';
import Contact from './views/Contact';
import Categorie from './views/Categorie';
import Admin from './views/Admin';
import AjoutAdmin from './views/AjoutAdmin';
import ModifAdmin from './views/ModifAdmin';
import Card from './views/Card';
import MonCompte from './views/MonCompte';
import { useState, useEffect } from 'react';
import GlobalContext from './context/GlobalContext'
import Vehicules from './views/Vehicule';
import Figurines from './views/Figurines';
import Pieces from './views/Piece';
import DetailsProduitsView from './views/DetailsProduitsView';
import Panier from './views/Panier';
import Voiture from './views/Voitures';
import Motos from './views/Motos';
import Tracteurs from './views/Tracteurs';
import StripeContainer from './stripe/StripeContainer'
import TousLesProduits from './views/TousLesProduits';



function App() {
  // Initialisez l'état userId en récupérant la valeur depuis le localStorage
  const [userId, setUserId] = useState(window.localStorage.getItem('userId'));  //  la valeur initiale de userId est définie en utilisant window.localStorage.getItem('userId'). 
                                                                                // Cela signifie que la valeur initiale de userId sera récupérée à partir du localStorage. 
                                                                                //Si aucune valeur n'est trouvée dans le localStorage pour la clé 'userId', userId sera initialisé avec null

  const [user, setUser] = useState(JSON.parse(window.localStorage.getItem('user')));
  const [userPanier, setUserPanier] = useState([]);

  // Effet pour mettre à jour le localStorage lorsque userId change
  useEffect(() => {
    if (userId !== null) {
      // Charger le panier depuis le localStorage lors de la connexion
      const panierLocalStorage = localStorage.getItem(`panier_${userId}`);
      const panier = panierLocalStorage && panierLocalStorage !== 'undefined' ? JSON.parse(panierLocalStorage) : [];
      setUserPanier(panier);
    } else {
      // Si l'utilisateur est déconnecté, réinitialiser l'état local du panier
      setUserPanier([]);
    }
  }, [userId]);
 console.log("clg de userId dans app   :  " + userId);
  
    useEffect(() => {
      if(userId !== null ){
        localStorage.setItem('userId', userId !== undefined ? userId.toString() : "");// setItem permet de stocker des données dans le localStorage du navigateur. Elle prend deux arguments :
                                                              // - la clé userId
                                                              // - la valeur a stocker (associée à la clé userId). Ici userEmail.toString est utilisé pour obtenir la représentation d'une chaine de caractère de la valeur userId                                                      
    } else {
      // Si l'utilisateur se déconnecte, effacer le panier associé et réinitialiser l'état local du panier
      localStorage.removeItem(`panier_${userId}`);
      setUserPanier([]);
      localStorage.removeItem('userId');
    }
  },[userId]);


  useEffect(() => {
    if (user !== null) {
      const panierLocalStorage = localStorage.getItem(`panier_${user.User_ID}`);
      const panier = panierLocalStorage && panierLocalStorage !== 'undefined' ? JSON.parse(panierLocalStorage) : [];
      setUserPanier(panier);
    } else {
      setUserPanier([]);
    }
},[user]);
  return (<>

    <GlobalContext.Provider value={{userId, setUserId, user, setUser,userPanier, setUserPanier }}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Accueil/>}/>
        <Route path='/*' element={<Accueil/>}/>
        <Route path='/inscription' element={<Inscription/>}/>
        <Route path='/connexion'  element={<Connexion/>}/>
        <Route path='/aPropos' element={<Apropos/>}/>
        <Route path='/contact'  element={<Contact/>}/>
        <Route path='/produits' element={<TousLesProduits/>}/>
        <Route path='/categorie' element={<Categorie/>}/>
        <Route path='/categorieAccueil/voiture' element={<Voiture/>}/>
        <Route path='/categorieAccueil/moto' element={<Motos/>}/>
        <Route path='/categorieAccueil/tracteur' element={<Tracteurs/>}/>
        {user && user.User_ID && (
        <>
          <Route path='/monCompte'  element={<MonCompte/>}/>
        </>
        )}
        {user && user.User_admin && (
          <>
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/ajoutAdmin' element={<AjoutAdmin/>}/>
          <Route path='/modifAdmin/:id' element={<ModifAdmin/>}/>
          </>
        ) }
        <Route path='/card/:id'  element={<Card/>}/>
        <Route path='/categorie/Vehicule' element={<Vehicules/>}/>
        <Route path='/categorie/Figurine' element={<Figurines/>}/>
        <Route path='/categorie/Piece' element={<Pieces/>}/>
        <Route path='/detailsProduit/:id' element={<DetailsProduitsView/>}/>
        <Route path='/panier' element={<Panier/>}/>
       <Route path='/stripe' element={<StripeContainer/>}/>
      </Routes>
    </BrowserRouter>
    </GlobalContext.Provider>

    <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
    />

    </>);
}

export default App;
