import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StockComponent} from './stock/stock.component';
import {StockVehiculesComponent} from './stock-vehicules/stock-vehicules.component';
import {StockUploadComponent} from './stock-upload/stock-upload.component';

const routes: Routes = [
  {
    path: 'stock',
    component: StockComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vehicules'
      },
      {
        path: 'vehicules',
        component: StockVehiculesComponent,
      },
      {
        path: 'importer',
        component: StockUploadComponent,
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockRoutingModule { }
