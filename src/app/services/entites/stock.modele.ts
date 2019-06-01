export interface Stock {
  Nombre: number;
  Version: string;
  Update: string;
  Vehicules: {
    NumChassis: string;
    Couleur: string;
    PrixMin: string;
    Options: {
      NomOption: string;
    } [];
  } [];
}

