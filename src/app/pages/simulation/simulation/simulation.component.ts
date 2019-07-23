import {Component, Input, OnInit} from '@angular/core';
import {ModeleDetail} from '../../../services/entites/modeleDetail.model';
import {ModeleService} from '../../../services/modele.service';
import {VersionDetail} from '../../../services/entites/versionDetail.model';
import {VersionService} from '../../../services/version.service';
import {Couleur} from '../../../services/entites/couleur.model';
import {CouleurService} from '../../../services/couleur.service';
import {OptionDetail} from '../../../services/entites/optionDetail.model';
import {OptionService} from '../../../services/option.service';
import {forEach} from '@angular/router/src/utils/collection';


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
  private imageModele: string = null;
  private imageVersion:string = null;
  private etape= 1;
  private photosModeles: Array<string> ;
  private photosVersions: Array<string> ;
  // en attendant les photos par couleur
  private modeleChoisi: ModeleDetail = null;
  private versionChoisie: VersionDetail = null;
  private couleurChoisie: Couleur= null;
  private prixTotal : number  = 0;
  private prixOptions: number =0;

  constructor(public modeleService: ModeleService,
              public versionService: VersionService,
              public couleurService: CouleurService,
              public optionService: OptionService) {
  }

  ngOnInit() {
    this.modeleService.getModeles().subscribe((res) => {
      this.listModeles = res as  ModeleDetail[];
      this.modeleChoisi = this.listModeles[0];
      this.getPhotosModeles();
    });

  }

  /**
   * Récupérer une photo par modèle
   */
  getPhotosModeles() {
    this.photosModeles = new Array<string>(this.listModeles.length);
    //parcourir la liste des modèles et récupérer leurs versions
    this.listModeles.forEach((modele) => {
      this.versionService.getVersions(modele.CodeModele).subscribe((res) => {
        const versions = res as VersionDetail [];
        var ok : boolean = false;
        var i =0;

        // itérer sur les versions jusqu'à trouver une couleur qui contient une photo
        while (!ok && i< versions.length) {
          const clr = versions[i++].couleurs.find(c => c.CheminImage != null);
          if (clr != null) {
            this.photosModeles[this.listModeles.indexOf(modele)] = clr.CheminImage;
            if(i==1) this.imageModele = clr.CheminImage;
            ok = true;
          }
        }
        if (!ok) {
          // insérer aucune photo s'il n'ya aucune photo trouvée
          this.photosModeles[this.listModeles.indexOf(modele)] = './assets/images/Pics/aucune.jpg';
        }
      });
    });
  }

  /**
   *choix d'un modèles parmis la liste affichée
   */
  choisirModele(modele: ModeleDetail) {
    this.modeleChoisi = modele;
    this.imageModele = this.photosModeles[this.listModeles.indexOf(modele)];
  }

  /**
   * choix d'une version
   */
  choisirVersion (version) {
    this.versionChoisie = version;
    this.imageVersion = this.photosVersions[this.listVersions.indexOf(version)];
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

          //récupérer les photos des versions du modèle choisi
          this.photosVersions = new Array<string>(this.listVersions.length);
          this.listVersions.forEach((vers) => {
            const clr = vers.couleurs.find(c => c.CheminImage != null);
            if (clr != null) {
              this.photosVersions[this.listVersions.indexOf(vers)] = clr.CheminImage;
            } else {
              this.photosVersions[this.listVersions.indexOf(vers)] = './assets/images/Pics/aucune.jpg';
            }
          });
          this.imageVersion = this.photosVersions[0];
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
      this.couleurService.getCouleursVersion(this.versionChoisie.CodeVersion).subscribe( (res) => {
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
    this.prixTotal = 0;
    this.prixOptions = 0;
    this.optionsVersion = null;
  }

  revenirEtape2() {
    this.etape = 2;
    this.prixTotal = this.versionChoisie.lignetarif.Prix;
    this.listCouleurs = null;
    this.couleurChoisie = null;
  }

  revenirEtape1() {
    this.etape = 1;
    this.prixTotal -= this.versionChoisie.lignetarif.Prix;
    this.listVersions = null;
    this.photosVersions = null;
  }





}
