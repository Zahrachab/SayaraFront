import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {CouleurService} from '../../../../services/couleur.service';
import {Couleur} from '../../../../services/entites/couleur.model';
import {ModeleDetail} from '../../../../services/entites/modeleDetail.model';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Option} from '../../../../services/entites/option.model';

@Component({
  selector: 'app-modal',
  templateUrl: './ajouterModele.component.html',
  styleUrls: ['ajouterModele.component.scss']
})
/**
 *  Classe d'ajout 'des modeles de véhicules
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class AjouterModeleComponent implements OnInit {
  // Réference vers le formulaire html
  formulaire: FormGroup;
  private couleursArray: Array<Couleur> = [];
  private couleursChecked: Array<Couleur> = [];
  private couleursSupp: Array<Couleur> = [];
  private optionsArray: Array<Option> = [];
  private optionsChecked: Array<Option> = [];
  private optionsSupp: Array<Option> = [];


  /**
   * Constructeur de la classe, déclare seulement les attributs privés de la classe
   * @param constructeurFormulaire
   * De type FormBuilder, Permet de construire des formulaire et de faire le binding avec html
   * @param modeleService
   * Pour envoyer la requete d'insertion du modele
   * @param optionService
   * Pour envoyer la requete d'insertion des options compatibles avec le modele
   * @param couleurService
   * Pour avoir et inserer les couleurs compatibles avec le modele
   * @param dialogRef
   * Réference sur la boite de dialogue
   */
  constructor(private constructeurFormulaire: FormBuilder,
              private modeleService: ModeleService,
              private optionService: OptionService,
              private couleurService: CouleurService,
              public dialogRef: MatDialogRef<AjouterModeleComponent>
  ) {
  }

  /**
   * Les options ajoutées dans le formulaire html
   */
  get optionsFormulaire() {
    return this.formulaire.get('options') as FormArray;
  }

  /**
   * Les couleurs ajoutées dans le formulaire html
   */
  get couleursFormulaire() {
    return this.formulaire.get('couleurs') as FormArray;
  }

  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // Construction du formulaire
    this.formulaire = this.constructeurFormulaire.group({
      code: ['', Validators.required],
      description: ['', Validators.required],
      nom: ['', Validators.required],
      options: this.constructeurFormulaire.array([]),
      couleurs: this.constructeurFormulaire.array([]),
    });

    this.chargerCouleurs();
    this.chargerOptions();
    // Liaison avec l'Html
    this.formulaire.valueChanges.subscribe();
    // récupérer les couleurs des autres modèles déjà existants dans la marque
    const couleursMap = new Map();
    let modeles;
    this.modeleService.getModeles().subscribe(res => {
      modeles = res as ModeleDetail[];
      for (const modele of modeles) {
        const couleurs = modele.couleurs as Couleur[];
        for (const couleur of couleurs) {
          if (!(couleursMap.has(couleur.CodeCouleur))) {
            couleursMap.set(couleur.CodeCouleur, couleur);
            this.couleursArray.push(couleur);
          }
        }
      }
    });
  }

  /**
   * Ajouter une option compatible avec le modele
   */
  ajouterOption() {
    const option = this.constructeurFormulaire.group({
      codeOption: ['', Validators.required ],
      nomOption: ['', Validators.required]
    });
    this.optionsFormulaire.push(option);
  }

  /**
   * Supprimer une option du formulaire
   * @param i
   * L'indice de l'iption a supprimer
   */
  supprimerOption(i) {
    this.optionsFormulaire.removeAt(i);
  }

  chargerCouleurs() {
    const couleursMap: Map<string, object> = new Map();
    this.formulaire.valueChanges.subscribe();
    /* récupérer les couleurs des autres modèles déjà existants dans la marque */
    let modeles;
    this.modeleService.getModeles().subscribe(res => {
      modeles = res as ModeleDetail[];
      for (let i = 0; i < modeles.length; i++) {
        const couleurs = modeles[i].couleurs as Couleur[];
        for (let j = 0; j < couleurs.length; j++) {
          if (!(couleursMap.has(String(couleurs[j].CodeCouleur)))) {
            couleursMap.set(String(couleurs[j].CodeCouleur), couleurs[j]);
            this.couleursArray.push(couleurs[j]);
          }
        }
      }
    });
  }

  chargerOptions() {
    const optionsMap: Map<string, object> = new Map();
    this.formulaire.valueChanges.subscribe();
    /* récupérer les options des autres modèles déjà existants dans la marque */
    let modeles;
    this.modeleService.getModeles().subscribe(res => {
      modeles = res as ModeleDetail[];
      for (let i = 0; i < modeles.length; i++) {
        const options = modeles[i].options as Option[];
        for (let j = 0; j < options.length; j++) {
          if (!(optionsMap.has(String(options[j].CodeOption)))) {
            optionsMap.set(String(options[j].CodeOption), options[j]);
            this.optionsArray.push(options[j]);
          }
        }
      }
    });
  }

  /**
   *  Ajouter une couleur pour le modele
   */
  ajouterCouleur() {
    const couleur = this.constructeurFormulaire.group({
       codeCouleur: ['', Validators.required ],
       nomCouleur: ['', Validators.required ],
       codeHexa: ['', Validators.required]
    });
    this.couleursFormulaire.push(couleur);
  }

  // Zahra please
  changerCouleur(i, color) {
    this.formulaire.value.couleurs[i].codeHexa = color;
  }

  /**
   * Supprimer une couleur du formulaire
   * @param i
   * L'indice de la couleur a supprimer
   */
  supprimerCouleur(i) {
    this.couleursFormulaire.removeAt(i);
  }


  gererCouleurs(event, couleur) {
    couleur.Checked = !couleur.Checked;
    if (couleur.Checked) {
        this.couleursChecked.push(couleur);
    } else {
        this.couleursChecked.splice(this.couleursChecked.indexOf(couleur), 1);
      }
    }

  gererOptions(event, opt) {
    opt.Checked = !opt.Checked;
    if (opt.Checked) {
      this.optionsChecked.push(opt);
    } else {
        this.optionsChecked.splice(this.optionsChecked.indexOf(opt), 1);
      }
    }
  /**
   * L'ajout du modele, ajoute le modele, puis les options et les couleurs puis les associations entre eux
   */
  ajouterModele() {
    // L'ajout du modele
    this.modeleService.ajouter(this.formulaire.value.code, this.formulaire.value.nom).subscribe(() => {
      // Ajout des nouvelles options
      for (const option of this.formulaire.value.options) {
        this.optionService.ajouterOptionModele(option.codeOption, option.nomOption,
          this.formulaire.value.code);
      }

      // Ajout des options
      for (const opt of this.optionsChecked) {
        this.optionService.ajouterOptionModele(String(opt.CodeOption), String(opt.NomOption),
          this.formulaire.value.code);
      }
      // Ajout des couleurs
      for (const couleur of this.couleursChecked) {
        this.couleurService.ajouterCouleurModele(String(couleur.CodeCouleur), String(couleur.NomCouleur), String(couleur.CodeHexa),
          this.formulaire.value.code);
      }
      // ajout des nouvelles couleurs
      for (const couleur of this.formulaire.value.couleurs) {
        this.couleurService.ajouterCouleurModele(couleur.codeCouleur, couleur.nomCouleur, couleur.codeHexa,
          this.formulaire.value.code);
      }
    });
    this.dialogRef.close();
  }
}

