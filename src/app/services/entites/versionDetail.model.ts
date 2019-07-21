export interface VersionDetail {
  CodeVersion: string;
  CodeModele: string;
  NomVersion: string;
  options: {
    CodeOption: string;
    NomOption: string;
    Checked: boolean;
    rel_ver_opt: {
      idRelVerOpt: string;
      CodeVersion: string;
      CodeOption: string;
    };
  }[];
  couleurs: {
    CodeCouleur: string;
    NomCouleur: string;
    CodeHexa: string;
    CheminImage: string;
    rel_ver_coul: {
      idRelVerCoul: string;
      CodeVersion: string;
      CodeCouleur: string;
    };
  }[];
  images: {
    idImage: string;
    CodeImage: string;
    Type: string;
    CheminImage: string;
  }[];
  lignetarif: {
    idLigneTarif: number,
    Type: number,
    Code: string,
    DateDebut: string,
    DateFin: string,
    Prix: 6550000
  };
}
