import {Component, OnInit} from '@angular/core';
import 'materialize-css';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthentificationService} from '../services/authentification.service';
import {AlertService} from '../services/alert.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private alertService: AlertService;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthentificationService
  ) {
  }

  model: any = {};
  loading = false;


  ngOnInit() {
    /*
          $(document).ojready(function() {
            $('.carousel').carousel();
          });
     */
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(() => {
          this.router.navigate(['/gestion/modeles']);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

