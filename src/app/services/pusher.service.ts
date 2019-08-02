declare const Pusher: any;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PusherService {

  pusher: any;
  commandeChannel: any;
  modeleChannel: any;
  versionChannel: any;
  constructor() {
     this.pusher = new Pusher('5fa15f062e35d1c1dbad', {
      cluster: 'eu',
      forceTLS: true
    });
     this.commandeChannel = this.pusher.subscribe('commande-channel-' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant);
     this.modeleChannel = this.pusher.subscribe('modele-channel-' + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant);
  }
  updateVersionChannel(codeModele) {
    this.versionChannel = this.pusher.subscribe('version-channel' + codeModele);
  }
}
