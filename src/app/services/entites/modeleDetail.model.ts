export interface ModeleDetail {
  CodeModele: { type: string };
  NomModele: { type: string };
  CodeMarque: { type: string };
  versions: [{
    CodeVersion: { type: string };
    CodeModele: { type: string };
    NomVersion: { type: string };
  }];
  options: [{
    CodeOption: { type: string };
    NomOption: { type: string };
    rel_ver_opt: {
      idRelVerOpt: { type: string };
      CodeVersion: { type: string };
      CodeOption: { type: string };
    };
  }];
}
