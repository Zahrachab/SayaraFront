export class User{
    utilfab: {
      IdUserF: number;
      Mail: string;
      Nom: string;
      Prenom: string;
      Mdp: string;
      NumTel: number;
      Fabricant: number;
      Valide: number;
      Bloque: number;
      marque: {
        NomMarque: string;
      };
      images: [{
        CheminImage: string;
      }];
    };
    password: string;
    token: string;

}

