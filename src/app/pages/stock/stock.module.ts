import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GestionModule} from '../gestion/gestion.module';
import {MaterialModule} from '../../material.module';
import { ColorPickerModule } from 'ngx-color-picker';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock/stock.component';
import { StockVehiculesComponent } from './stock-vehicules/stock-vehicules.component';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSelectModule} from '@angular/material';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { StockUploadComponent } from './stock-upload/stock-upload.component';
import {ToastrModule} from 'ng6-toastr-notifications';

@NgModule({
  declarations: [StockComponent, StockVehiculesComponent, StockUploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    FlexLayoutModule,
    StockRoutingModule,
    GestionModule,
    MaterialModule,
    ColorPickerModule,
    MatSelectModule,
    ToastrModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ]
})
export class StockModule { }
