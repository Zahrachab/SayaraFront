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
import { InfosDispoComponent } from './infos-dispo/infos-dispo.component';

@NgModule({
  declarations: [SimulationComponent, InfosDispoComponent],
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
  ],
  entryComponents: [InfosDispoComponent]
})
export class SimulationModule { }
