import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
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
import { PremierePageComponent } from './pages/premiere-page/premiere-page.component';
import { ModeleService } from './services/modele.service';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { GestionModule } from './pages/gestion/gestion.module';
import {ReactiveFormsModule} from '@angular/forms';
import { ConfirmationDialogComponent } from './pages/shared/confirmation-dialog/confirmation-dialog.component';
import {LoginErrorInterceptor} from './EroorsInterceptors/LoginEroor.interceptor';
import { AlertComponent } from './components/alert/alert.component';
import {TarifsModule} from './pages/tarifs/tarifs.module';
import {StockModule} from './pages/stock/stock.module';


const urlGlobale = 'https://sayaradz.herokuapp.com';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    OfferComponent,
    NosClientsComponent,
    NoservicesComponent,
    ContactUsComponent,
    PremierePageComponent,
    LoginComponent,
    ConfirmationDialogComponent,
    AlertComponent,
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
    GestionModule,
    TarifsModule,
    StockModule,
    MDBBootstrapModule.forRoot()
  ],
  entryComponents: [ConfirmationDialogComponent],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [ModeleService, {provide: 'url', useValue: urlGlobale},
              { provide: HTTP_INTERCEPTORS, useClass: LoginErrorInterceptor, multi: true }, ],
  bootstrap: [AppComponent]
})
export class AppModule { }
