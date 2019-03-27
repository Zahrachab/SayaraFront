import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {VersionService} from '../../../../services/version.service';
import {Option} from '../../../../services/entites/option.model';
import {MatDialogRef} from '@angular/material';
import {ImageService} from '../../../../services/image.service';


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
  // Les options a afficher dans les checkbox
  private options: Option[];

  // Réference vers le formulaire html
  private formulaire: FormGroup;

  // Le code du modele auquel on rajoute une version
  public codeModele: string;

  // Les otpions cochées
  public optionsChoisies: Array<Option> = [];

  // Pour l'ajout des images
  selectedFile: ImageSnippet;

  // Zahra plase
  pending = false;

  // Zahra please
  status = 'init';

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
  ) {
  }

  // Zahra please
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    this.dialogRef.close();
  }

  // Zahra please
  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  // Zahra please
  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // La liaison avec les checkbox
    this.optionservice.getOptions(this.codeModele).subscribe(opts => this.options = opts as Option[]);
    // Construction du formulaire
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      nom: '',
    });
    // La liaison avec le formulaire
    this.formulaire.valueChanges.subscribe();
  }

  // Zahra please
  gererOptions(event, option) {
    option.Cheked = !option.Checked;
    this.optionsChoisies.push(option);
  }

  // Zahra please
  onSubmit() {
    let i = 0;
    this.selectedFile.pending = true;
    this.versionservice.ajouter(this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant,
      this.formulaire.value.nom, this.codeModele).subscribe(
      (res) => {
            for (i = 0 ; i < this.optionsChoisies.length; i++) {
              this.optionservice.ajouter(String(this.optionsChoisies[i].CodeOption), String(this.optionsChoisies[i].NomOption),
                this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant);
            }
            this.imageService.uploadImage(this.selectedFile.file, this.formulaire.value.code +
              JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant ).subscribe(
              (re) => {
                this.onSuccess();
              },
              (err) => {
                this.onError();
              });
            },
      (err) => {
        this.onError();
      });
  }
}



// Zahra please
class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}
