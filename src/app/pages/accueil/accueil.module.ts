import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {GestionModule} from '../gestion/gestion.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from '../../material.module';

@NgModule({
  declarations: [AccueilComponent],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    MDBBootstrapModule.forRoot(),
    GestionModule,
    FlexLayoutModule,
    MaterialModule,
  ]
})
export class AccueilModule { }
