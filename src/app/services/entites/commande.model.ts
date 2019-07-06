export interface Commande {
  Date: string;
  Client: {
    NomClient: string;
    WilayaClient: string;
    NumClient: string;
  };
  NomModele: string;
  NomVersion: string;
  Prix: number;
  Reserve: boolean;
  PrixPaye: number;
  Accepte: boolean;
  Refuse: boolean;
  annule: boolean;
}
