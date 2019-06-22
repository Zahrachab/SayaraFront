import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UtilisateurGuard} from '../../guards/utilisateur.guard';
import {TarifsVersionsComponent} from './tarifs-versions/tarifs-versions.component';
import {TarifsComponent} from './tarifs/tarifs.component';
import {TarifsOptionsComponent} from './tarifs-options/tarifs-options.component';
import {UploadFichierTarifComponent} from './upload-fichier-tarif/upload-fichier-tarif.component';

const routes: Routes = [
  {
    path: 'tarifs',
    component: TarifsComponent,
  //  canActivate: [UtilisateurGuard],
    children: [
      {
        path: 'versions',
        component: TarifsVersionsComponent
      },
      {
        path: 'options',
        component: TarifsOptionsComponent
      },
      {
        path: 'upload',
        component: UploadFichierTarifComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TarifsRoutingModule { }
