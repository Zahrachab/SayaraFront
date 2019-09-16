export interface CouleurDetail {
    CodeCouleur: string;
    NomCouleur: string;
    NomModele: string;
    CodeHexa: string;
    Checked: boolean;
    CheminImage: string;
  lignetarif: {
    idLigneTarif: number,
    Type: number,
    Code: string,
    DateDebut: string,
    DateFin: string,
    Prix: number
  };
}
