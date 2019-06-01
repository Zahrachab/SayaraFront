export interface Vehicule {
  NumChassis: string;
  Couleur: string;
  PrixMin: string;
  Options: {
    NomOption: string;
  } [];
}
