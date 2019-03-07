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

@NgModule({
  declarations: [GestionComponent, GestionModeleComponent, AjouterModeleComponent,
                  NavbarComponent, SidenavComponent, FooterComponent, GestionVersionComponent],
  imports: [
    CommonModule,
    GestionRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [NavbarComponent, SidenavComponent, FooterComponent],
  entryComponents: [AjouterModeleComponent],
})
export class GestionModule {
}
