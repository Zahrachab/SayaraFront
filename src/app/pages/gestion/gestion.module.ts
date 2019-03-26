import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GestionRoutingModule} from './gestion-routing.module';
import {GestionComponent} from './gestion/gestion.component';
import {GestionModeleComponent} from './gestion-modele/gestion-modele.component';
import {AjouterModeleComponent} from './gestion-modele/ajouterModele/ajouterModele.component';
import {MaterialModule} from '../../material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from '../../components/navbar/navbar.component';
import {SidenavComponent} from '../../components/sidenav/sidenav.component';
import {FooterComponent} from '../../components/footer/footer.component';
import {GestionVersionComponent } from './gestion-version/gestion-version.component';
import {MatSelectModule} from '@angular/material/select';
import { SupprimerModeleComponent } from './gestion-modele/supprimer-modele/supprimer-modele.component';
import { SupprimerVersionComponent } from './gestion-version/supprimer-version/supprimer-version.component';
import { GestionOptionsComponent } from './gestion-options/gestion-options.component';
import {AjouterVersionComponent} from './gestion-version/ajouter-version/ajouter-version.component';
import { ModifierVerionComponent } from './gestion-version/modifier-verion/modifier-verion.component';
import { ModifierModeleComponent } from './gestion-modele/modifier-modele/modifier-modele.component';
import { SupprimerOptionsComponent } from './gestion-options/supprimer-options/supprimer-options.component';
import { AjouterOptionComponent } from './gestion-options/ajouter-option/ajouter-option.component';
import { ModifierOptionComponent } from './gestion-options/modifier-option/modifier-option.component';
@NgModule({
  declarations: [GestionOptionsComponent, GestionComponent, GestionModeleComponent, AjouterModeleComponent,
                  NavbarComponent, SidenavComponent, FooterComponent, GestionVersionComponent, SupprimerModeleComponent,
                  SupprimerVersionComponent, AjouterVersionComponent, ModifierVerionComponent, GestionOptionsComponent,
                  ModifierModeleComponent,
                  SupprimerOptionsComponent,
                  AjouterOptionComponent,
                  ModifierOptionComponent],

  imports: [
    CommonModule,
    GestionRoutingModule,
    FormsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSelectModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [NavbarComponent, SidenavComponent, FooterComponent],
  entryComponents: [AjouterModeleComponent, AjouterVersionComponent, ModifierVerionComponent,
    SupprimerModeleComponent, SupprimerVersionComponent, ModifierModeleComponent, SupprimerOptionsComponent,
    AjouterOptionComponent, ModifierOptionComponent],
})
export class GestionModule {
}
