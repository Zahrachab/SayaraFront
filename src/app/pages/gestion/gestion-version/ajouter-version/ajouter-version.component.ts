import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {VersionService} from '../../../../services/version.service';
import {Option} from '../../../../services/entites/option.model';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ImageService} from '../../../../services/image.service';
import {FileUploader} from 'ng2-file-upload';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {Couleur} from '../../../../services/entites/couleur.model';
import {CouleurService} from '../../../../services/couleur.service';
import {ToastrManager} from 'ng6-toastr-notifications';


@Component({
  selector: 'app-ajouter-version',
  templateUrl: './ajouter-version.component.html',
  styleUrls: ['./ajouter-version.component.scss']
})
/**
 *  Classe d'ajout des version
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class AjouterVersionComponent implements OnInit {
  // Les options associées au modèle auquel appartient la version
  private options: Option[];

  // Les couleurs associées au modèle auquel appartient la version
  private couleurs: Couleur[];
  // Réference vers le formulaire html
  private formulaire: FormGroup;

  // Le code du modele auquel on rajoute une version
  public codeModele: string;

  // Les otpions cochées
  public optionsChoisies: Array<Option> = [];

  // Les couleurs cochées
  public clrsChoisies: Array<Couleur> = [];
  // Les images sélectionnées
  selectedFile: Array<ImageSnippet> = [];
  images: Array<File> = [];

  // File uploader
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });


  /**
   * Constructeur de la classe, déclare seulement les attributs privés de la classe
   * @param constructeurFormulaire
   * De type FormBuilder, Permet de construire des formulaire et de faire le binding avec html
   * @param modeleservice
   * Pour envoyer la requete d'insertion du modele
   * @param optionservice
   * Pour envoyer la requete d'insertion des options compatibles avec le modele
   * @param versionservice
   * Pour inserer les versions
   * @param dialogRef
   * Réference sur la boite de dialogue
   * @param imageService
   * Pour pouvoir gerer les images
   */
  constructor(private constructeurFormulaire: FormBuilder,
              private modeleservice: ModeleService,
              private optionservice: OptionService,
              private versionservice: VersionService,
              private dialogRef: MatDialogRef<AjouterVersionComponent>,
              private imageService: ImageService,
              private couleurService: CouleurService,
              private dialogValidation: MatDialog,
              private toastr: ToastrManager
  ) {
  }

  // Uploader des images depuis l'ordinateur
  processFile(imageInput: any, index: number) {
    const reader = new FileReader();
    const img = this.uploader.queue[0]._file;
    reader.addEventListener('load', (event: any) => {
      this.selectedFile[index] = new ImageSnippet(event.target.result, img);
    });

    reader.readAsDataURL(img);
    this.images.push(this.uploader.queue[0]._file);
    this.uploader.clearQueue();

  }


  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // récuoérer la liste des options
    this.optionservice.getOptions(this.codeModele).subscribe(opts => {
      this.options = opts as Option[];
    }, error => {
      alert(error);
    });

    // récupérer la liste des couleurs
    this.couleurService.getCouleurs(this.codeModele).subscribe(clrs => {
      this.selectedFile = new Array<ImageSnippet>(clrs.length);
      this.couleurs = clrs as Couleur[];
    }, error => {
      alert(error);
    });

    // Construction du formulaire
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      nom: '',
    });
    // La liaison avec le formulaire
    this.formulaire.valueChanges.subscribe();
  }

  /* Sélectionner ou déselectionner une option */
  gererOptions(event, option) {
    option.Checked = !option.Checked;
    if (option.Checked === true) {
      this.optionsChoisies.push(option);
    } else {
      this.optionsChoisies.splice(option);
    }
  }

  /* Sélectionner ou déselectionner une option */
  gererCouleurs(event, clr) {
    clr.Checked = !clr.Checked;
    if (clr.Checked === true) {
      this.clrsChoisies.push(clr);
    } else {
      this.clrsChoisies.splice(clr);
    }
  }

  // Ajout d'une version
  onSubmit() {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialogValidation.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous vraiment ajouter cette version?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let i = 0;

        for (let j = 0; j < this.selectedFile.length; j++) {
          if (this.selectedFile[j] != null) {
            this.selectedFile[j].pending = true;
          }
        }
        const codeVersion = this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant;
        this.versionservice.ajouter(codeVersion,
          this.formulaire.value.nom, this.codeModele).subscribe(
          () => {


            /* ajouter des couleurs */
            for (let i = 0 ; i < this.clrsChoisies.length; i++) {
              this.couleurService.ajouterCouleurVersion(String(this.clrsChoisies[i].CodeCouleur),
                codeVersion).subscribe((res) => {
              } , error => {
                  // Erreur Insertion de la relation entre couleur et version
                  this.toastr.errorToastr(error);
              });
            }


            /*ajouter des photos associées à des couleur à la version */
            for (let j = 0; j < this.selectedFile.length; j++) {
              if (this.selectedFile[j] != null) {
                this.imageService.uploadImage(this.images[j], codeVersion, this.couleurs[j].CodeCouleur).subscribe(res => {
                  this.selectedFile[j].pending = false;
                });
              }
            }


            // ajout des options
            for (i = 0; i < this.optionsChoisies.length; i++) {
              this.optionservice.ajouter(String(this.optionsChoisies[i].CodeOption), String(this.optionsChoisies[i].NomOption), codeVersion
              ).subscribe((res) => {
              } , error => {
                // Erreur Insertion de la relation entre option et version
                this.toastr.errorToastr(error);
              });
            }

            this.dialogRef.close();
            this.toastr.successToastr("Ajout d'une version avec succès");
          }, error =>   {
            // Erreur dans l'insertion de la version
            this.toastr.errorToastr(error);
          });
      }
    });
  }

  // Supprimer des images
  supprimerImage(selected: ImageSnippet) {
    this.selectedFile.splice(this.selectedFile.indexOf(selected), 1);
    this.images.splice(this.selectedFile.indexOf(selected), 1);
  }
}



// Classe pour représenter une image
class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}
