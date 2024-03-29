import {NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GestionComponent} from './gestion/gestion.component';
import {GestionModeleComponent} from './gestion-modele/gestion-modele.component';
import {GestionOptionsComponent} from './gestion-options/gestion-options.component';
import {GestionVersionComponent} from './gestion-version/gestion-version.component';
import {GestionCouleurComponent} from './gestion-couleur/gestion-couleur.component';
import {UtilisateurGuard} from '../../guards/utilisateur.guard';



const routes: Routes = [
  {
    path: 'gestion',
    component: GestionComponent,
    canActivate: [UtilisateurGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'modeles'
      },
      {
        path: 'modeles',
        component: GestionModeleComponent
      },
      {
        path: 'options/:CodeModele',
        component: GestionOptionsComponent,
      },
      {
        path: 'options',
        component: GestionOptionsComponent,
      },
      {
        path: 'versions',
        component: GestionVersionComponent
      },
      {
        path: 'versions/:CodeModele',
        component: GestionVersionComponent,
        pathMatch: 'full'
      },
      {
        path: 'couleurs/:CodeModele',
        component: GestionCouleurComponent,
      },

      {
        path: 'couleurs',
        component: GestionCouleurComponent,
      }

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRoutingModule { }
