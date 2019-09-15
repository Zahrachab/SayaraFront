import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TarifsVersionsComponent} from './tarifs-versions/tarifs-versions.component';
import {TarifsComponent} from './tarifs/tarifs.component';
import {TarifsOptionsComponent} from './tarifs-options/tarifs-options.component';
import {UploadFichierTarifComponent} from './upload-fichier-tarif/upload-fichier-tarif.component';
import {TarifsCouleursComponent} from './tarifs-couleurs/tarifs-couleurs.component';

const routes: Routes = [
  {
    path: 'tarifs',
    component: TarifsComponent,
  //  canActivate: [UtilisateurGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'versions'
      },
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
      },
      {
        path: 'couleurs',
        component: TarifsCouleursComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TarifsRoutingModule { }
