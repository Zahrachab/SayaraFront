import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UtilisateurGuard} from '../../guards/utilisateur.guard';
import {SimulationComponent} from './simulation/simulation.component';

const routes: Routes = [
  {
    path: 'simulation',
    component: SimulationComponent,
    canActivate: [UtilisateurGuard]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})




export class SimulationRoutingModule { }
