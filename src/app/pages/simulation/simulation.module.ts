import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimulationRoutingModule } from './simulation-routing.module';
import { SimulationComponent } from './simulation/simulation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GestionModule} from '../gestion/gestion.module';
import {MaterialModule} from '../../material.module';
import {MatMenuModule} from '@angular/material';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  declarations: [SimulationComponent],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    FlexLayoutModule,
    GestionModule,
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    MatMenuModule,
    ColorPickerModule,
    SimulationRoutingModule,
  ]
})
export class SimulationModule { }
