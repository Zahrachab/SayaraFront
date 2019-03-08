import {Component, OnInit} from '@angular/core';
import {VersionDataSource} from '../../../dataSources/VersionDataSource';
import {ModeleService} from '../../../services/modele.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {VersionService} from '../../../services/version.service';

@Component({
  selector: 'app-gestion-version',
  templateUrl: './gestion-version.component.html',
  styleUrls: ['./gestion-version.component.scss']
})
export class GestionVersionComponent implements OnInit {
  private versionDataSource: VersionDataSource;
  private modeles: ModeleDetail[];
  displayedColumns = ['CodeVersion', 'NomVersion', 'modele', 'options', 'gestion'];

  constructor(private versionService: VersionService, private modeleService: ModeleService) {
  }

  ngOnInit() {
      this.modeleService.getModeles().subscribe(modeles => {
      this.modeles = modeles as ModeleDetail[];
    });
  }


  changerOptions($event) {
    this.versionDataSource = new VersionDataSource(this.versionService, $event.value);
  }
}
