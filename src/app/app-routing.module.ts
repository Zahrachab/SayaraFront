import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PremierePageComponent } from './pages/premiere-page/premiere-page.component';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {path: '',  component : PremierePageComponent },
  {path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
