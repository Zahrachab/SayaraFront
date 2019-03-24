import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {Couleur} from '../services/entites/couleur.model';
import {CouleurService} from '../services/couleur.service';

export class CouleurDataSource extends DataSource<any> {
  constructor(private couleurService: CouleurService, private codeModele: string) {
    super();
  }

  connect(): Observable<Couleur[]> {
    return this.couleurService.getCouleurs(this.codeModele);
  }
  disconnect() {}


}
