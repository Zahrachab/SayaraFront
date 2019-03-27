import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {CouleurService} from '../../../../services/couleur.service';
import {Couleur} from '../../../../services/entites/couleur.model';
import {ModeleDetail} from '../../../../services/entites/modeleDetail.model';
import {MatDialogRef} from '@angular/material';

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

  // zahra please
  private couleursMap;

  // zahra please
  private couleursArray: Array<Couleur> = [];

  // zahra please
  private couleursChecked: Array<Couleur> = [];

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
      code: '',
      description: '',
      nom: '',
      options: this.constructeurFormulaire.array([]),
      couleurs: this.constructeurFormulaire.array([]),
    });
    // Liaison avec l'Html
    this.formulaire.valueChanges.subscribe();
    // récupérer les couleurs des autres modèles déjà existants dans la marque
    this.couleursMap = new Map();
    let modeles;
    this.modeleService.getModeles().subscribe(res => {
      modeles = res as ModeleDetail[];
      for (const modele of modeles) {
        const couleurs = modele.couleurs as Couleur[];
        for (const couleur of couleurs) {
          if (!(this.couleursMap.has(couleur.CodeCouleur))) {
            this.couleursMap.set(couleur.CodeCouleur, couleur);
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
      codeOption: [],
      nomOption: []
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

  /**
   *  Ajouter une couleur pour le modele
   */
  ajouterCouleur() {
    const couleur = this.constructeurFormulaire.group({
      codeCouleur: [],
      nomCouleur: [],
    });
    this.couleursFormulaire.push(couleur);
  }

  // Zahra please
  gererCouleurs(event, clr) {
    clr.Checked = !clr.Checked;
    if (clr.Checked) {
      this.couleursChecked.push(clr);
    } else {
      this.couleursChecked.splice(clr);
    }
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

  /**
   * L'ajout du modele, ajoute le modele, puis les options et les couleurs puis les associations entre eux
   */
  ajouterModele() {
  }
}    // L'ajout du modele
this.modeleService.ajouter(this.formulaire.value.code, this.formulaire.value.nom);

// Ajout des options
for (const option of this.formulaire.value.options) {
  this.optionService.ajouterOptionModele(option.codeOption, option.nomOption,
    this.formulaire.value.code);
}
// Ajout des couleurs
for (const couleur of this.couleursChecked) {
  this.couleurService.ajouterCouleurModele(String(couleur.CodeCouleur), String(couleur.NomCouleur), String(couleur.CodeHexa),
    this.formulaire.value.code);
}


for (const couleur of this.formulaire.value.couleurs) {
  this.couleurService.ajouterCouleurModele(couleur.codeCouleur, couleur.nomCouleur, couleur.codeHexa,
    this.formulaire.value.code);
}
this.dialogRef.close();

