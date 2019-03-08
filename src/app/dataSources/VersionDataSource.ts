import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import {VersionService} from '../services/version.service';
import {VersionDetail} from '../services/entites/versionDetail.model';

export class VersionDataSource extends DataSource<any> {
  constructor(private versionService: VersionService, private idModele: string) {
    super();
  }

  connect(): Observable<VersionDetail[]> {
    return this.versionService.getVersions(this.idModele);
  }

  disconnect() {
  }


}
