export interface VersionDetail {
  CodeVersion: { type: string };
  CodeModele: { type: string };
  NomVersion: { type: string };
  options: [{
    CodeOption: { type: string };
    NomOption: { type: string };
    rel_ver_opt: {
      idRelVerOpt: { type: string };
      CodeVersion: { type: string };
      CodeOption: { type: string };
    };
  }];
  couleurs: [{
    CodeCouleur: {type: string};
    NomCouleur: {type: string};
    rel_ver_coul: {
      idRelVerCoul: { type: string };
      CodeVersion: { type: string };
      CodeCouleur: { type: string };
    };
  }];
  images: [{
    CheminImange: {type: string};
  }];
}
