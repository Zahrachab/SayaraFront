export interface ModeleDetail {
  CodeModele: string ;
  NomModele: string;
  CodeMarque: string;
  versions: {
    CodeVersion: string;
    CodeModele: string;
    NomVersion: string;
  }[];
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
    Checked: boolean;
  }[];
}
