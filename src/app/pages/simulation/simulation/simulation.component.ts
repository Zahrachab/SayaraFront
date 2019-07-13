import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  private listModelesImages : Array<string> = [];
  private image: string ;
  private
  constructor() { }

  ngOnInit() {
    this.listModelesImages.push('http://res.cloudinary.com/hftzhatr4/image/upload/v1561067247/Versions/2019-06-20T21-47-27.017Z_voiture.jpg.jpg');
    this.listModelesImages.push('http://res.cloudinary.com/hftzhatr4/image/upload/v1561067247/Versions/2019-06-20T21-47-27.017Z_voiture.jpg.jpg');
    this.listModelesImages.push('http://res.cloudinary.com/hftzhatr4/image/upload/v1561067247/Versions/2019-06-20T21-47-27.017Z_voiture.jpg.jpg');
    this.listModelesImages.push('http://res.cloudinary.com/hftzhatr4/image/upload/v1561067247/Versions/2019-06-20T21-47-27.017Z_voiture.jpg.jpg');
    this.listModelesImages.push('http://res.cloudinary.com/hftzhatr4/image/upload/v1561067247/Versions/2019-06-20T21-47-27.017Z_voiture.jpg.jpg');
    this.listModelesImages.push('http://res.cloudinary.com/hftzhatr4/image/upload/v1561067247/Versions/2019-06-20T21-47-27.017Z_voiture.jpg.jpg');


  }

  choisirImage(img) {
    this.image = img;

  }




}
