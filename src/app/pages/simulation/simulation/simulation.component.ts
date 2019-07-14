import {Component, Input, OnInit} from '@angular/core';
import {Modele} from '../../../services/entites/modele.model';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModeleService} from '../../../services/modele.service';
import {VersionDetail} from '../../../services/entites/versionDetail.model';
import {VersionService} from '../../../services/version.service';
import {Couleur} from '../../../services/entites/couleur.model';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  private listModeles : Array<ModeleDetail> = [];
  private listVersions: Array<VersionDetail> =[];
  private image: string ;
  private etape= 1;
  private img = 'http://res.cloudinary.com/hftzhatr4/image/upload/v1561067247/Versions/2019-06-20T21-47-27.017Z_voiture.jpg.jpg';
  private modeleChoisi: ModeleDetail = null;
  private versionChoisie: VersionDetail = null;
  private couleurChoisie =null;
  private prix : number;

  constructor(public modeleService: ModeleService, public versionService: VersionService ) {
    modeleService.getModeles().subscribe((res) => {
      this.listModeles = res as  ModeleDetail[];
      this.modeleChoisi = this.listModeles[0];
    });
  }

  ngOnInit() {
    this.image = this.img;

  }

  choisirModele(modele: ModeleDetail) {
    this.modeleChoisi = modele;
  }

  choisirVersion (version) {
    this.versionChoisie = version;
  }

  choisirCouleur (couleur) {
    this.couleurChoisie = couleur;
  }

  passerEtape2() {
    if (this.modeleChoisi != null) {
      this.etape = 2;
      this.versionService.getVersions(this.modeleChoisi.CodeModele).subscribe( (res) => {
        this.listVersions = res as VersionDetail[];
        if (this.listVersions!= null) {
          this.versionChoisie = this.listVersions[0];
        }
      });
    } else {
      alert("Aucun modèle choisi");
    }
  }

  passerEtape3() {
    if (this.versionChoisie!= null) {
      this.etape = 3;
      if(this.modeleChoisi.couleurs.length != 0) {
        this.couleurChoisie = this.modeleChoisi.couleurs[0];
      }

    } else {
      alert("Aucun modèle choisi");
    }
  }


  revenirEtape2() {
    this.etape = 2;
  }

  revenirEtape1() {
    this.etape = 1;
  }




}
