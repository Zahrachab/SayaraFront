declare const Pusher: any;
import { Injectable } from '@angular/core';


@Injectable()
export class PusherServiceMock {
  pusher: any;
  commandeChannel: any;
  modeleChannel: any;
  versionChannel: any;
  constructor() {
    this.pusher = new Pusher('5fa15f062e35d1c1dbad', {
      cluster: 'eu',
      forceTLS: true
    });
    this.commandeChannel = this.pusher.subscribe('commande-channel-' + "3");
    this.modeleChannel = this.pusher.subscribe('modele-channel-' + "3");
  }
  updateVersionChannel(codeModele) {
    this.versionChannel = this.pusher.subscribe('version-channel' + codeModele);
  }
}
