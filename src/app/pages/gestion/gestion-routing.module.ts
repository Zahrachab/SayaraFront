import {Input, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionComponent} from './gestion/gestion.component';
import {GestionModeleComponent} from './gestion-modele/gestion-modele.component';
import {GestionOptionsComponent} from './gestion-options/gestion-options.component';
import {GestionVersionComponent} from './gestion-version/gestion-version.component';
import {FileUploaderComponent } from './file-uploader/file-uploader.component';

const routes: Routes = [
  {
    path: 'gestion',
    component: GestionComponent,
    children: [
      {
        path: 'modeles',
        component: GestionModeleComponent
      },
      {
        path: 'options/:CodeModele',
        component: GestionOptionsComponent,
        pathMatch: 'full'
      },
      {
        path: 'options',
        component: GestionOptionsComponent,
        pathMatch: 'full'
      },
      {
        path: 'versions',
        component: GestionVersionComponent
      },
      {
        path: 'upload',
        component: FileUploaderComponent
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
