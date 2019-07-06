import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CommandesComponent} from './commandes/commandes.component';
import {AllCommandesComponent} from './all-commandes/all-commandes.component';

const routes: Routes = [
  {
    path: 'commandes',
    component: CommandesComponent,
    children: [
      {
        path: 'tous',
        component: AllCommandesComponent,
      },
      {
        path: 'prépayées',
        component: AllCommandesComponent,
      },
      {
        path: 'annulées',
        component: AllCommandesComponent,
      },
      {
        path: 'nouvelles',
        component: AllCommandesComponent,
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandesRoutingModule { }
