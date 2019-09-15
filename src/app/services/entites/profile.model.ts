export interface Profile {
  IdUserF: string;
  Mail: string;
  Nom: string;
  Prenom: string;
  Mdp: string;
  NumTel: number;
  Fabricant: number;
  Valide: number;
  Bloque: number;
  marque: {
    NomMarque: string;
  };
  images: [{
    CheminImage: string;
    NumChassis: string
    NomModele: string;
    NomVersion: string;
  }];
}

