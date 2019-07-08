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
import { GestionOptionsComponent } from './gestion-options/gestion-options.component';
import {AjouterVersionComponent} from './gestion-version/ajouter-version/ajouter-version.component';
import { ModifierVerionComponent } from './gestion-version/modifier-verion/modifier-verion.component';
import {FileSelectDirective} from 'ng2-file-upload';
import { ModifierModeleComponent } from './gestion-modele/modifier-modele/modifier-modele.component';
import { AjouterOptionComponent } from './gestion-options/ajouter-option/ajouter-option.component';
import { ModifierOptionComponent } from './gestion-options/modifier-option/modifier-option.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { GestionCouleurComponent } from './gestion-couleur/gestion-couleur.component';
import { ModifierCouleurComponent } from './gestion-couleur/modifier-couleur/modifier-couleur.component';
import { AjouterCouleurComponent } from './gestion-couleur/ajouter-couleur/ajouter-couleur.component';
import { InfosDialogComponent } from './gestion-version/infos-dialog/infos-dialog.component';
import { StockComponent } from './stock/stock/stock.component';
import { StockVehiculesComponent } from './stock/stock-vehicules/stock-vehicules.component';
import {MatMenuModule} from '@angular/material';
import { FicheModeleComponent } from './gestion-modele/fiche-modele/fiche-modele.component';
import { FicheVersionComponent } from './gestion-version/fiche-version/fiche-version.component';


@NgModule({
  declarations: [GestionOptionsComponent, GestionComponent, GestionModeleComponent, AjouterModeleComponent,
                  NavbarComponent, SidenavComponent, FooterComponent, GestionVersionComponent, SupprimerModeleComponent,
                  AjouterVersionComponent, ModifierVerionComponent,
                  FileSelectDirective,
                  GestionCouleurComponent,
                  ModifierCouleurComponent,
                  AjouterCouleurComponent,
                  GestionOptionsComponent,
                  ModifierModeleComponent,
                  AjouterOptionComponent,
                  ModifierOptionComponent,
                  FileSelectDirective,
                  InfosDialogComponent,
                  StockComponent,
                  StockVehiculesComponent, FileSelectDirective,
                  FicheModeleComponent,
                  FicheVersionComponent],

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
    MatMenuModule,
    ColorPickerModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [NavbarComponent, SidenavComponent, FooterComponent, FileSelectDirective],
  entryComponents: [AjouterModeleComponent, AjouterVersionComponent, ModifierVerionComponent,
    SupprimerModeleComponent, ModifierCouleurComponent, AjouterCouleurComponent,
    AjouterOptionComponent, ModifierOptionComponent, ModifierModeleComponent, FicheVersionComponent, FicheModeleComponent, InfosDialogComponent],
})
export class GestionModule {
}
