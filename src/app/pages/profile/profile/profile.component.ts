import { Component, OnInit } from '@angular/core';
import {ToastrManager} from 'ng6-toastr-notifications';
import {ModeleService} from '../../../services/modele.service';
import {ProfileService} from '../../../services/profile.service';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {Profile} from '../../../services/entites/profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private password1: string;
  private password2: string;
  private password0: string;
  private mail: string;
  private tel: string;
  private user: Profile;
  private disableBtn = false;
  constructor(private profileService: ProfileService, private toastr: ToastrManager) { }

  public passwordEdit() {
    this.disableBtn = this.password1 !== this.password2;
  }

  ngOnInit() {
    this.profileService.getProfile().subscribe(res => {
      this.user = res as Profile;
    }, error => {
      // le probleme de connexion
      this.toastr.errorToastr(error);
    });
  }

  edit() {
    if (this.disableBtn === false) {
      this.profileService.editProfile(this.mail, this.tel).subscribe(() => {
      }, error => {
        this.toastr.errorToastr(error);
      });
    }
  }
}
