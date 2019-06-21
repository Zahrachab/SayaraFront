import {Component, OnInit} from '@angular/core';
import 'materialize-css';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../../services/authentification.service';
import {AlertService} from '../../services/alert.service';
import {first} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthentificationService,
    private alertService: AlertService
  ) {
        if (AuthentificationService.currentUserValue) {
           this.router.navigate(['/gestion/modeles']);
        }
  }



  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/gestion/modeles';
  }


  onSubmit() {
    this.alertService.error('');
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // Login
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.alertService.error('Nom d\'utilisateur Ou Mot de Passe Incorrects');
          this.loading = false;
          });
  }
  get f() { return this.loginForm.controls; }
}

