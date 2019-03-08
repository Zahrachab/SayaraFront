import {DataSource} from '@angular/cdk/table';
import {OptionService} from '../services/option.service';
import {Observable} from 'rxjs';
import {Option} from '../services/entites/option.model';

export class OptionDataSource extends DataSource<any> {
  constructor(private optionService: OptionService, private codeModele: string) {
    super();
  }

  connect(): Observable<Option[]> {
    return this.optionService.getOptions(this.codeModele);
  }
  disconnect() {}


}
