import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GestionModule} from '../gestion/gestion.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    GestionModule,
    CommonModule,
    ProfileRoutingModule,
    FlexLayoutModule,
    FormsModule
  ]
})
export class ProfileModule { }
