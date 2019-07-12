export interface Commande {
  idCommande: string
  Date: string;
  automobiliste : {
    idAutomobiliste: string;
    Nom: string;
    NumTel: string;
    Prenom: string;
  };
  vehicule: {
    NomMarque: string;
    NumChassis: string
    NomModele: string;
    NomVersion: string;
  }

  Montant: number;
  Reservation: number;
  Etat: number;
}

