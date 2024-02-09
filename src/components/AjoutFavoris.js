import {toast} from 'react-toastify'

export const ajoutFavoris = (userId, produit, setUserFavoris) => {
  // ON VA CHERCHER LE favoris ACTUEL DU LOCALESTORAGE
  const favorisLocalStorage = localStorage.getItem(`favoris_${userId}`);
  // On vérifie si la clé favoris existe ou n'est pas undefined ET/OU on l'initialise à un tableau vide
  const favoris = favorisLocalStorage && favorisLocalStorage !== 'undefined' ? JSON.parse(favorisLocalStorage) : [];

  let produitExiste = false;

  // Parcourir le favoris pour voir si le produit existe déjà
  const nouveauFavoris = favoris.map((fav) => {
      if (fav && fav.ID_Produit === produit.ID_Produit) {
          produitExiste = true;
      }
      return fav;
  });

  // Si le produit n'existe pas, l'ajouter au favoris
  if (!produitExiste) {
      nouveauFavoris.push(produit);
  }

  // On met à jour le favoris dans le LocalStorage en le transformant en chaîne de caractères
  localStorage.setItem(`favoris_${userId}`, JSON.stringify(nouveauFavoris));
  // On met à jour le favoris dans l'état global
  setUserFavoris(nouveauFavoris);
  toast.success(`${produit.Produit_nom} bien ajouté au favoris`)
};