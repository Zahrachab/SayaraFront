import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from '../../services/authentification.service';
import {Router} from '@angular/router';
import {Commande} from '../../services/entites/commande.model';
import {CommandeService} from '../../services/commande.service';
import {PusherService} from '../../services/pusher.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private notifications: any;
  private number = 0;

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


  constructor(private authenticationService: AuthentificationService, private router: Router,
              private commandeService: CommandeService, private pushService: PusherService) {

    this.pushService.commandeChannel.bind('newCommand', data => {
      console.log(data.toString());
      this.notifications.unshift(data);
      this.number += 1;
    });
  }

  ngOnInit() {
    this.commandeService.getCommandesNouvelles().subscribe(res => {
      this.notifications = res as Commande[];
      this.number = res.length;
    });

  }

}
