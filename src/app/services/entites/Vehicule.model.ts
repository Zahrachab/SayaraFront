export interface Vehicule {
  NumChassis: string;
  Montant : string;
  Options: {
    CodeOption: string;
    NomOption: string;
    rel_vehic_opt	: {}
  } [];
}
