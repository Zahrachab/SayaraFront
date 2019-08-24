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
  tarifBase: {
    DateDebut: string;
    DateFin: string;
    Prix: number;
  }
}
