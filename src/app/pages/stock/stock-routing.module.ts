import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StockComponent} from './stock/stock.component';
import {StockVehiculesComponent} from './stock/stock-vehicules/stock-vehicules.component';


const routes: Routes = [
  {
    path: 'stock',
    component: StockComponent,
    children: [
      {
        path: 'stock',
        component: StockComponent,
      },
      {
        path: 'stock/vehicules',
        component: StockVehiculesComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})


export class StockRoutingModule { }
