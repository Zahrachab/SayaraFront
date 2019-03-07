import {DataSource} from '@angular/cdk/table';
import {ModeleService} from '../services/modele.service';
import {Observable} from 'rxjs';
import {ModeleDetail} from '../services/entites/modeleDetail.model';

export class ModeleDataSource extends DataSource<any> {
  constructor(private modeleService: ModeleService) {
    super();
  }

  connect(): Observable<ModeleDetail[]> {
    return this.modeleService.getModeles();
  }

  disconnect() {
  }


}
