import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PremierePageComponent } from './pages/premiere-page/premiere-page.component';
import {GestionModeleComponent} from './pages/gestion-modele/gestion-modele.component';
import {AcceuilComponent} from './acceuil/acceuil.component';
import {LoginComponent} from './login/login.component';
import {UtilisateurGuardGuard} from './guards/utilisateur-guard.guard';
import {PopupComponent} from './popup/popup.component';
import {CommuneComponent} from './pages/commune/commune.component';
import {ModalComponent} from './modal/modal.component';

const routes: Routes = [
  {path: '',  component : PremierePageComponent },
  {path: 'gestion/modeles' , component : CommuneComponent},
  {path: 'login', component: LoginComponent },
  {path: 'popup', component: PopupComponent},
  {path: 'ajoutModele', component: ModalComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
