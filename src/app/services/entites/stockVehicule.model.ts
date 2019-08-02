export interface StockVehicule {
  vehicules: {
    NumChassis: string;
  }[];
  CodeHexa: string;
  Montant: string;
  Quantite: number;
  Options: {
    NomOption: string;
  } [];
}
