import {Component, Input, OnInit} from '@angular/core';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModeleService} from '../../../services/modele.service';
import {VersionDetail} from '../../../services/entites/versionDetail.model';
import {VersionService} from '../../../services/version.service';
import {Couleur} from '../../../services/entites/couleur.model';
import {CouleurService} from '../../../services/couleur.service';
import {OptionDetail} from '../../../services/entites/optionDetail.model';
import {OptionService} from '../../../services/option.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {
  private optionsVersion: Array<OptionDetail> = [];
  private listModeles : Array<ModeleDetail> = [];
  private listVersions: Array<VersionDetail> =[];
  private listCouleurs: Array<Couleur> = [];
  private image: string ;
  private etape= 1;
  // en attendant les photos par couleur
  private img = 'http://res.cloudinary.com/hftzhatr4/image/upload/v1561067247/Versions/2019-06-20T21-47-27.017Z_voiture.jpg.jpg';
  private modeleChoisi: ModeleDetail = null;
  private versionChoisie: VersionDetail = null;
  private couleurChoisie: Couleur=null;
  private prixTotal : number  = 0;
  private prixOptions: number =0;

  constructor(public modeleService: ModeleService,
              public versionService: VersionService,
              public couleurService: CouleurService,
              public optionService: OptionService) {
    modeleService.getModeles().subscribe((res) => {
      this.listModeles = res as  ModeleDetail[];
      this.modeleChoisi = this.listModeles[0];
    });
  }

  ngOnInit() {
    this.image = this.img;
  }

  /**
   *choix d'un modèles parmis la liste affichée
   */
  choisirModele(modele: ModeleDetail) {
    this.modeleChoisi = modele;
  }

  /**
   * choix d'une version
   */
  choisirVersion (version) {
    this.versionChoisie = version;
    this.prixTotal = this.versionChoisie.lignetarif.Prix;
  }

  /**
   * Choix de la couleur
   */
  choisirCouleur (couleur) {
    this.couleurChoisie = couleur;
    this.prixTotal = this.versionChoisie.lignetarif.Prix+ this.couleurChoisie.lignetarif.Prix;
  }

  /**
   * Choix des options
   */

  choisirOptions($event, option) {
    option.Checked = !option.Checked;
    if(option.Checked) {
      this.prixTotal += option.lignetarif.Prix;
      this.prixOptions += option.lignetarif.Prix;
    } else {
      this.prixTotal -= option.lignetarif.Prix;
      this.prixOptions -= option.lignetarif.Prix;
    }
  }

  /**
   * passer au choix de la version
   */

  passerEtape2() {
    if (this.modeleChoisi != null) {
      this.etape = 2;
      this.versionService.getVersions(this.modeleChoisi.CodeModele).subscribe( (res) => {
        this.listVersions = res as VersionDetail[];
        if (this.listVersions!= null) {
          this.versionChoisie = this.listVersions[0];
          this.prixTotal = this.versionChoisie.lignetarif.Prix;
        }
      });
    } else {
      alert("Aucun modèle choisi");
    }
  }

  /**
   * passer au choix de la couleur
   */

  passerEtape3() {
    if (this.versionChoisie!= null) {
      this.etape = 3;
      this.couleurService.getCouleurs(this.modeleChoisi.CodeModele).subscribe( (res) => {
        this.listCouleurs = res as Couleur[];
        if (this.listCouleurs.length!= 0) {
          this.couleurChoisie = this.listCouleurs[0];
          this.prixTotal += this.couleurChoisie.lignetarif.Prix;
        }
      });
    } else {
      alert("Aucune version choisie");
    }
  }

  /**
   * passer au choix des options
   */

  passerEtape4() {
    this.etape = 4;
    this.optionService.getOptionsVersion(this.versionChoisie.CodeVersion).subscribe( (res) => {
      this.optionsVersion = res as OptionDetail[];
    });
  }


  revenirEtape3() {
    this.etape = 3;
    this.prixTotal -= this.prixOptions;
    this.prixOptions = 0;
    this.optionsVersion = null;
  }

  revenirEtape2() {
    this.etape = 2;
    this.prixTotal = this.versionChoisie.lignetarif.Prix;
    this.listCouleurs = null;
  }

  revenirEtape1() {
    this.etape = 1;
    this.prixTotal = 0;
    this.listVersions = null;
  }





}
