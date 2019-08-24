import {Component, OnInit} from '@angular/core';
import {VersionDetail} from '../../../../services/entites/versionDetail.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Option} from '../../../../services/entites/option.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {VersionService} from '../../../../services/version.service';
import {ImageService} from '../../../../services/image.service';
import {FileUploader} from 'ng2-file-upload';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {Couleur} from '../../../../services/entites/couleur.model';
import {CouleurService} from '../../../../services/couleur.service';
import {ToastrManager} from 'ng6-toastr-notifications';


@Component({
  selector: 'app-modifier-verion',
  templateUrl: './modifier-verion.component.html',
  styleUrls: ['../ajouter-version/ajouter-version.component.scss']
})
/**
 *  Classe de modification des versions
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class ModifierVerionComponent implements OnInit {
  // Les options associées au modèle auquel appartient la version
  private options: Option[];

  // Les couleurs associées au modèle auquel appartient la version
  private couleurs: Couleur[];

  // Les couleur de la version
  private clrsVersion: Couleur[];

  // Les couleurs ajoutées
  private clrsAjoutes: Array<Couleur> = [];

  // Les couleurs supprimées
  private clrsSupp: Array<Couleur> = [];

  // Réference vers le formulaire html
  private formulaire: FormGroup;

  // La version a modifier
  public version: VersionDetail;

  // Les options de la version
  private optionsVersion: Option[];

  // Les options ajoutées
  private optionsAjoutes: Array<Option> = [];

  // Les options supprimées
  private optionsSupp: Array<Option> = [];

  // Les images sélectionnées
  selectedFile: Array<ImageSnippet> ;
  imagesSupp: Array<ImageSupp> = [];

  // File uploader
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  /**
   * Constructeur de la classe, déclare les attributs de la classe
   * @param dialogRef
   * Réference vers la boite de dialogue
   * @param modeleService
   * Service qui va permettre d'envoyer la requete de modification de modele
   * @param optionService
   * Service qui va permettre d'envoyer les requetes d'insertions et de suppressions des modeles
   * @param constructeurFormulaire
   * De type FormBuilder pour construire le formulaire
   * @param dialogValidation
   * Validation du formulaire
   * @param imageService
   * Pour la gestion des images
   * @param versionService
   * Pour la gestion des services
   */
  constructor(private constructeurFormulaire: FormBuilder,
              private modeleService: ModeleService,
              private couleurService: CouleurService,
              private optionService: OptionService,
              private versionService: VersionService,
              private dialogRef: MatDialogRef<ModifierVerionComponent>,
              private imageService: ImageService,
              private toastr: ToastrManager,
              private dialogValidation: MatDialog
  ) {

  }

  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // Construction du formuaire
    this.formulaire = this.constructeurFormulaire.group({
      code: this.version.CodeVersion,
      nom: this.version.NomVersion,
      type:  [null, Validators.compose([Validators.required])],
      couleurs: this.constructeurFormulaire.array([]),
      options: this.constructeurFormulaire.array([]),
    });

    /*Liaison avec l'html*/
    this.formulaire.valueChanges.subscribe();
    /* Charger les options */
    this.getOptions();

    /*charger les couleurs*/
   this.getCouleurs();
  }

  /**
   * Récupérer la liste des options compatibles avec la version  +
   * les autres options associées au modèle de la version et non compatible avec cette dernière
   */
  getOptions() {
    /*subscribe pour régler le problème de synchronisation*/
    this.optionService.getOptions(this.version.CodeModele).subscribe(opts => {
      this.options = opts as Option[];
      this.optionsVersion = (this.version as VersionDetail).options as Option[];
      this.optionsVersion.forEach((element) => {
        this.options.forEach((opt) => {
          if (String(element.CodeOption) === String(opt.CodeOption)) {
            /* séléctionner les options compatibles avec la version parmi ceux associées au modèle */
            opt.Checked = true;
          }
        });
      });
    }, error => {
      this.toastr.errorToastr(error);
    });
  }

  /**
   * Récupérer la liste des couleurs compatibles avec la version avec leurs photos si elles exitent +
   * les autres couleurs associées au modèle de la version et non compatible avec cette dernière
   */
  getCouleurs() {
    /*subscribe pour régler le problème de synchronisation*/
    this.couleurService.getCouleurs(this.version.CodeModele).subscribe(clrs => {
      this.selectedFile = new Array<ImageSnippet>(clrs.length);
      this.couleurs = clrs as Couleur[];
      this.clrsVersion = (this.version as VersionDetail).couleurs as Couleur[];
      this.clrsVersion.forEach((element) => {
        this.couleurs.forEach((clr) => {
          if (String(element.CodeCouleur) === String(clr.CodeCouleur)) {
            /* séléctionner les options compatibles avec la version parmi ceux associées au modèle */
            clr.Checked = true;
            if(element.CheminImage!= null) {
              const j = this.couleurs.indexOf(clr);
              this.selectedFile[j] = new ImageSnippet(null, null);
              this.selectedFile[j].status = 'ok';
              this.selectedFile[j].new = false;
              this.selectedFile[j].src = String(element.CheminImage);
            }
          }
        });
      });
    }, error => {
      this.toastr.errorToastr(error);
    });
  }



  /**
   * Uploader photo
   */
  processFile(imageInput: any, index: number) {
    const reader = new FileReader();
    const img = this.uploader.queue[0]._file;
    reader.addEventListener('load', (event: any) => {
      this.selectedFile[index] = new ImageSnippet(event.target.result, img);
      this.selectedFile[index].new= true;
    });

    reader.readAsDataURL(img);
    this.uploader.clearQueue();

  }

  /**
   * Gestion des options d'une version (séléctionner ou déelctionner une couleur)
   */
  gererOptions(event, option) {
    option.Checked = !option.Checked;
    if (option.Checked === true) {
      if ( this.optionsSupp.indexOf(option) === -1) {
        this.optionsAjoutes.push(option);
      } else {
        this.optionsSupp.splice(this.optionsSupp.indexOf(option) , 1);
      }
    } else {
      if ( this.optionsAjoutes.indexOf(option) === -1) {
        this.optionsSupp.push(option);
      } else {
        this.optionsAjoutes.splice(this.optionsAjoutes.indexOf(option) , 1);
      }
    }

  }


  /**
   * Gestion des couleurs d'une version (séléctionner ou déelctionner une couleur)
   */
  gererCouleurs(event, clr) {
    clr.Checked = !clr.Checked;
    if (clr.Checked === true) {
      if ( this.clrsSupp.indexOf(clr) === -1) {
        this.clrsAjoutes.push(clr);
      } else {
        this.clrsSupp.splice(this.clrsSupp.indexOf(clr) , 1);
      }
    } else {
      if ( this.clrsAjoutes.indexOf(clr) === -1) {
        this.clrsSupp.push(clr);
      } else {
        this.clrsAjoutes.splice(this.clrsAjoutes.indexOf(clr) , 1);
      }
    }

  }

  /**
   * Modification de la version (liste des options compatibles, liste des couleurs ainsi que les photos associées
   */
  onSubmit() {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialogValidation.open(ConfirmationDialogComponent, {
        width: '350px',
        data: 'Voulez vous confirmer les changements que vous allez effectuer sur le version?'
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        for (let j = 0; j < this.selectedFile.length; j++) {
          if((this.selectedFile[j] != null) && (this.selectedFile[j].new == true)) {
            this.selectedFile[j].pending = true;
          }
        }

        /* modifier le nom de la version */
        this.versionService.modifierVersion(this.formulaire.value.code,
          this.formulaire.value.nom).subscribe((res) => {
          }, error => {
            // Erreur Modification Version
          this.toastr.errorToastr(error);
          }
        );
        /* ajouter des options */
        for (let i = 0 ; i < this.optionsAjoutes.length; i++) {
          this.optionService.ajouter(String(this.optionsAjoutes[i].CodeOption), String(this.optionsAjoutes[i].NomOption),
            this.formulaire.value.code).subscribe((res) => {
          } , (error) => {
            this.toastr.errorToastr(error);
          });
        }
        /* supprimer des options */
        for (let i = 0 ; i < this.optionsSupp.length; i++) {
          this.optionService.supprimer(String(this.optionsSupp[i].CodeOption),
            this.formulaire.value.code).subscribe(() => {
          });
        }

        /* ajouter des couleurs */
        for (let i = 0 ; i < this.clrsAjoutes.length; i++) {
          this.couleurService.ajouterCouleurVersion(String(this.clrsAjoutes[i].CodeCouleur),
            this.formulaire.value.code).subscribe((res) => {
          } , (error) => {
            this.toastr.errorToastr(error);
          });
        }

        /* supprimer des couleurs */
        for (let i = 0 ; i < this.clrsSupp.length; i++) {
          this.couleurService.supprimerVersion(String(this.clrsSupp[i].CodeCouleur),
            this.formulaire.value.code).subscribe(() => {
          }, (error) => {
            this.toastr.errorToastr(error);
          });
        }


        /*ajouter des photos associées à des couleur à la version */
        for (let j = 0; j < this.selectedFile.length; j++) {
          if((this.selectedFile[j]!= null) && (this.selectedFile[j].new == true))
          {
            console.log(j);
            this.imageService.uploadImage(this.selectedFile[j].file, String(this.version.CodeVersion), this.couleurs[j].CodeCouleur).subscribe(res => {
              this.selectedFile[j].pending = false;
            },(error) => {
              this.toastr.errorToastr(error);
            });
          }
        }


        /* supprimer des photos  d'une version */
        for (let j = 0; j < this.imagesSupp.length; j++) {
         this.imageService.supprimerImage(this.imagesSupp[j].id, String(this.version.CodeVersion),this.imagesSupp[j].codeCouleur ).subscribe( res => {
           },(error) => {
           this.toastr.errorToastr(error);
         });
        }

        this.dialogRef.close();
      } else
        this.dialogRef.close();
    });
    }


  // Supprimer des images
  supprimerImage(selected: ImageSnippet, clr) {
    console.log("lo");
    // si l'image appartient déjà à la version (elle est sur le cloud)
    if (! selected.new ) {
        this.imagesSupp.push(new ImageSupp(selected.id, clr)); // pour envoyer un delete lors de la validation
    }
    this.selectedFile.splice(this.selectedFile.indexOf(selected), 1);
  }
}

//Class image Supp
class ImageSupp {

  constructor(public id: string, public codeCouleur: string) {
  }
}

// Classe Image
class ImageSnippet {
  pending = false;
  status = 'init';
  new = false;
  id;
  constructor(public src: string, public file: File) {
  }
}
