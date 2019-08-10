import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {ModeleDetail} from '../../../../services/entites/modeleDetail.model';
import {Couleur} from '../../../../services/entites/couleur.model';
import {CouleurService} from '../../../../services/couleur.service';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {Option} from '../../../../services/entites/option.model';

@Component({
  selector: 'app-modifier-modele',
  templateUrl: './modifier-modele.component.html',
  styleUrls: ['./modifier-modele.component.scss']
})
/**
 *  Classe de modification des modeles de véhicules
 *  Implemente OnInit pour l'initialisation du composant
 *  @author CHABANE CHAOUCH Zahra, CHOUAKI Salim
 *
 */
export class ModifierModeleComponent implements OnInit {
  // Réference vers le formulaire html
  private couleursArray: Array<Couleur> = [];
  private couleursChecked: Array<Couleur> = [];
  private couleursSupp: Array<Couleur> = [];
  private optionsArray: Array<Option> = [];
  private optionsChecked: Array<Option> = [];
  private optionsSupp: Array<Option> = [];
  formulaire: FormGroup;

  /**
   * Constructeur de la classe, déclare les attributs de la classe
   * @param dialogReference
   * Réference vers la boite de dialogue
   * @param modeleservice
   * Service qui va permettre d'envoyer la requete de modification de modele
   * @param optionservice
   * Service qui va permettre d'envoyer les requetes d'insertions et de suppressions des modeles
   * @param data
   * Les données récues du composant gestion-modele : le modele a modifier
   * @param constructeurFormulaire
   * De type FormBuilder pour construire le formulaire
   */
  constructor(private dialogReference: MatDialogRef<ModifierModeleComponent>, private modeleService: ModeleService,
              private optionservice: OptionService,
              @Inject(MAT_DIALOG_DATA) private data: any,
              private constructeurFormulaire: FormBuilder,
              private dialogValidation: MatDialog,
              private couleurService: CouleurService) {
  }

  /**
   *  Executé a l'initialisation du composant, Construit le formulaire et fait la lsiasion avec le html
   */
  ngOnInit() {
    // Construction du formulaire
    this.formulaire = this.constructeurFormulaire.group({
      code: this.data.modele.CodeModele,
      description: '',
      nom: this.data.modele.NomModele,
      options: this.constructeurFormulaire.array([]),
      options1: this.constructeurFormulaire.array([]),
      couleurs: this.constructeurFormulaire.array([]),
    });

    this.chargerCouleurs();
    this.chargerOptions();

    // Initialisation des options
    for (const item of this.data.modele.options) {
      const option = this.constructeurFormulaire.group({
        codeOption: [item.CodeOption],
        nomOption: [item.NomOption]
      });
      this.options1Formulaire.push(option);
    }
    // Liaison avec le Html
    this.formulaire.valueChanges.subscribe();
  }

  /**
   * Ajouter une option compatible avec le modele
   */

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

      const couleursModele = this.data.modele.couleurs as Couleur[];
      couleursModele.forEach((element) => {
        this.couleursArray.forEach((clr) => {
          if (String(element.CodeCouleur) === String(clr.CodeCouleur)) {
            /* séléctionner les couleurs associées au modèle parmis ceux exitants dans la marque */
            clr.Checked = true;
          }
        });
      });
    }, error => {
      // Erreur lors de l'obtention des modeles
      alert(error);
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

      const optionsModele = this.data.modele.options as Option[];
      optionsModele.forEach((element) => {
        this.optionsArray.forEach((opt) => {
          if (String(element.CodeOption) === String(opt.CodeOption)) {
            /* séléctionner les options associées au modèle parmis ceux exitants dans la marque */
            opt.Checked = true;
          }
        });
      });
    }, error => {
      // Erreurs lors de l'obtention du modele
      alert(error);
    });
  }

  ajouterOption() {
    const option = this.constructeurFormulaire.group({
      codeOption: [],
      nomOption: []
    });
    this.optionsFormulaire.push(option);
  }

  /**
   * Les options ajoutées dans le formulaire html
   */
  get optionsFormulaire() {
    return this.formulaire.get('options') as FormArray;
  }

  /**
   * Supprimer une option du formulaire
   * @param i
   * L'indice de l'iption a supprimer
   */
  get options1Formulaire() {
    return this.formulaire.get('options1') as FormArray;
  }

  get couleursFormulaire() {
    return this.formulaire.get('couleurs') as FormArray;
  }

  supprimerOption(i) {
    this.optionsFormulaire.removeAt(i);
  }

  /**
   * Modifie un modele, en modifiant le nom et les options et les couelurs
   */
  ajouterCouleur() {
    const couleur = this.constructeurFormulaire.group({
      codeCouleur: [],
      nomCouleur: [],
    });
    this.couleursFormulaire.push(couleur);
  }


  gererCouleurs(event, couleur) {
    couleur.Checked = !couleur.Checked;
    if (couleur.Checked) {
      if (this.couleursSupp.indexOf(couleur) === -1) {
        this.couleursChecked.push(couleur);
      } else {
        this.couleursSupp.splice(this.couleursSupp.indexOf(couleur), 1);
      }
    } else {
      if (this.couleursChecked.indexOf(couleur) === -1) {
        this.couleursSupp.push(couleur);
      } else {
        this.couleursChecked.splice(this.couleursChecked.indexOf(couleur), 1);
      }
    }
  }

  gererOptions(event, opt) {
    opt.Checked = !opt.Checked;
    if (opt.Checked) {
      if (this.optionsSupp.indexOf(opt) === -1) {
        this.optionsChecked.push(opt);
      } else {
        this.optionsSupp.splice(this.optionsSupp.indexOf(opt), 1);
      }
    } else {
      if (this.optionsChecked.indexOf(opt) === -1) {
        this.optionsSupp.push(opt);
      } else {
        this.optionsChecked.splice(this.optionsChecked.indexOf(opt), 1);
      }
    }
  }

  changerCouleur(i, color) {
    this.formulaire.value.couleurs[i].codeHexa = color;
  }


  supprimerCouleur(i) {
    this.couleursFormulaire.removeAt(i);
  }

  modifierModele() {

    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialogValidation.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Voulez vous confirmer les changements que vous allez effectuer sur le modele?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const trouv = false;
        // Modifier un modele
        this.modeleService.modifier(this.data.modele.CodeModele, this.formulaire.value.nom).subscribe((res) => {
          /* ajouter des options */
          for (let i = 0; i < this.optionsChecked.length; i++) {
            this.optionservice.ajouterOptionModele(String(this.optionsChecked[i].CodeOption),
              String(this.optionsChecked[i].NomOption), this.formulaire.value.code).subscribe();
          }
          /* supprimer des options*/
          for (let i = 0; i < this.optionsSupp.length; i++) {
            this.optionservice.supprimerDuModele(String(this.optionsSupp[i].CodeOption),
              this.formulaire.value.code).subscribe(() => {
            });
          }
          /* ajouter les options ajoutés à partir du formulaire */
          for (const option of this.formulaire.value.options) {
            this.optionservice.ajouterOptionModele(option.codeOption, option.NomOption,
              this.formulaire.value.code).subscribe(() => {

              }, error => {
                // Erreur lors de l'ajout de l'option
                  alert(error);
              }
            );
          }


          /* ajouter des couleurs */
          for (let i = 0; i < this.couleursChecked.length; i++) {
            this.couleurService.ajouterCouleurModele(String(this.couleursChecked[i].CodeCouleur), String(this.couleursChecked[i].NomCouleur), String(this.couleursChecked[i].CodeHexa),
              this.formulaire.value.code).subscribe();
          }
          /* supprimer des couleurs */
          for (let i = 0; i < this.couleursSupp.length; i++) {
            this.couleurService.supprimerCouleurModele(String(this.couleursSupp[i].CodeCouleur),
              this.formulaire.value.code).subscribe();
          }

            /* ajouter les couleurs ajoutés à partir du formulaire */
          for (const couleur of this.formulaire.value.couleurs) {
              this.couleurService.ajouterCouleurModele(couleur.codeCouleur, couleur.nomCouleur, couleur.codeHexa,
                this.formulaire.value.code).subscribe(() => {

              }, error => {
                  // Erreur lors de l'ajout de la couleur
                  alert(error);
              });
            }
          this.dialogReference.close();

          });
      }
    }, error => {
      // Erreurs lors de la modification du modele
      alert(error);
    });
  }
}
