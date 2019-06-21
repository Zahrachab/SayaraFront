import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';
import { TarifsRoutingModule } from './tarifs-routing.module';
import { TarifsComponent } from './tarifs/tarifs.component';
import { TarifsVersionsComponent } from './tarifs-versions/tarifs-versions.component';
import {GestionModule} from '../gestion/gestion.module';
import { TarifsOptionsComponent } from './tarifs-options/tarifs-options.component';

@NgModule({
  declarations: [TarifsVersionsComponent, TarifsComponent, TarifsOptionsComponent],
  imports: [
    GestionModule,
    CommonModule,
    TarifsRoutingModule,
    FormsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSelectModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class TarifsModule { }
