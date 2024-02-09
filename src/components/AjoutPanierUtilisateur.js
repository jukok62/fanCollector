export const ajouterAuPanier = (userId, produit, setUserPanier) => {
  // ON VA CHERCHER LE PANIER ACTUEL DU LOCALESTORAGE
  const panierLocalStorage = localStorage.getItem(`panier_${userId}`);
  // On vérifie si la clé panier existe ou n'est pas undefined ET/OU on l'initialise à un tableau vide
  const panier = panierLocalStorage && panierLocalStorage !== 'undefined' ? JSON.parse(panierLocalStorage) : [];

  let produitExiste = false;

  // Parcourir le panier pour voir si le produit existe déjà
  const nouveauPanier = panier.map((pr) => {
      if (pr.ID_Produit === produit.ID_Produit) {
          pr.quantiteCommander += 1;
          pr.prixTotal = pr.Produit_prix * pr.quantiteCommander;
          produitExiste = true;
      }
      return pr;
  });

  // Si le produit n'existe pas, l'ajouter au panier
  if (!produitExiste) {
      produit.quantiteCommander = 1;
      produit.prixTotal = produit.Produit_prix * produit.quantiteCommander;
      nouveauPanier.push(produit);
  }

  // On met à jour le panier dans le LocalStorage en le transformant en chaîne de caractères
  localStorage.setItem(`panier_${userId}`, JSON.stringify(nouveauPanier));
  // On met à jour le panier dans l'état global
  setUserPanier(nouveauPanier);
};