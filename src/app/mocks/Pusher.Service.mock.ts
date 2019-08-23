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
    this.commandeChannel = "";
    this.modeleChannel = "";
    this.versionChannel = "";
  }



  updateVersionChannel(codeModele) {
  }
}
