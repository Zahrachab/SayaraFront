export interface OptionDetail {
  CodeOption: string;
  NomOption: string;
  CodeModele: string;
  NomModele: string;
  rel_mod_opt: {
    CodeModele: string;
  };
  lignetarif: {
    idLigneTarif: number,
    Type: number,
    Code: string,
    DateDebut: string,
    DateFin: string,
    Prix: number
  };
}
