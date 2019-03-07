import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionComponent} from './gestion/gestion.component';
import {GestionModeleComponent} from './gestion-modele/gestion-modele.component';
import {GestionVersionComponent} from './gestion-version/gestion-version.component';

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
        path: 'versions',
        component: GestionVersionComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
