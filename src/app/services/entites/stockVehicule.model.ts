export interface StockVehicule {
  vehicules: {
    NumChassis: string;
  }[];
  CodeHexa: string;
  Montant: string;
  quantite: number;
  options: {
    NomOption: string;
  } [];
}
