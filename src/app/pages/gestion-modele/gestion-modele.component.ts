import { Component, OnInit } from '@angular/core';
import { ModeleService } from '../../services/modele.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';
import {Modele} from '../../services/modele.model';
import {ModeleDetail} from '../../services/modeleDetail.model';
import {forEach} from '@angular/router/src/utils/collection';
import {ModalComponent} from '../../modal/modal.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-gestion-modele',
  templateUrl: './gestion-modele.component.html',
  styleUrls: ['./gestion-modele.component.scss']
})
export class GestionModeleComponent implements OnInit {
  dataSource = new ModeleDataSource(this.modeleService);
  displayedColumns = ['CodeModele', 'NomModele', 'versions', 'options', 'gestion'];

  constructor(private modeleService: ModeleService, private modalService: MatDialog) {}
  ngOnInit() {
  }

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {width: '800px'});
  }

}


export class ModeleDataSource extends DataSource<any> {
  constructor(private modeleService: ModeleService) {
    super();
  }
  public modeles: Modele[];
  public mod = new Array<ModeleDetail>();
  connect(): Observable<ModeleDetail[]> {
    this.modeleService.getModeles().subscribe((modeles: Modele[]) => {
      this.modeles = modeles;
      modeles.forEach(value => {
        this.modeleService.getModele(value.CodeModele).subscribe((modele: ModeleDetail ) => {
          this.mod.push(modele);
        });
      });
    });
    return Observable.of(this.mod);
  }
  disconnect() {}


}
