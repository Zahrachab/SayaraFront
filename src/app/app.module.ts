import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import { OfferComponent } from './components/offer/offer.component';
import { NosClientsComponent } from './components/nos-clients/nos-clients.component';
import { NoservicesComponent } from './components/noservices/noservices.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { PremierePageComponent } from './pages/premiere-page/premiere-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { GestionModeleComponent } from './pages/gestion-modele/gestion-modele.component';
import { ModeleService } from './services/modele.service';
import {PopupComponent} from './popup/popup.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AcceuilComponent } from './acceuil/acceuil.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { CommuneComponent } from './pages/commune/commune.component';

const urlGlobale = 'http://eb85ef62.ngrok.io';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    OfferComponent,
    NosClientsComponent,
    NoservicesComponent,
    ContactUsComponent,
    FooterComponent,
    PremierePageComponent,
    NavbarComponent,
    SidenavComponent,
    GestionModeleComponent,
    PopupComponent,
    LoginComponent,
    AcceuilComponent,
    ModalComponent,
    CommuneComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MDBBootstrapModule.forRoot()

  ],
  entryComponents: [ModalComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ModeleService, {provide: 'url', useValue: urlGlobale}],
  bootstrap: [AppComponent]
})
export class AppModule { }
