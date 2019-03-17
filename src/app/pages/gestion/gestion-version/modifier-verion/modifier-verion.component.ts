import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {VersionDetail} from '../../../../services/entites/versionDetail.model';
import {MatDialogRef} from '@angular/material';
import {Option} from '../../../../services/entites/option.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ModeleService} from '../../../../services/modele.service';
import {OptionService} from '../../../../services/option.service';
import {VersionService} from '../../../../services/version.service';
import {ImageService} from '../../../../services/image.service';


@Component({
  selector: 'app-modifier-verion',
  templateUrl: './modifier-verion.component.html',
  styleUrls: ['../ajouter-version/ajouter-version.component.scss']
})
export class ModifierVerionComponent implements OnInit {
  private options: Option[];
  private formulaire: FormGroup;
  public version: VersionDetail;
  private optionsVersion: Option[];
  private optionsChoisies: Array<Option> = [];
  selectedFile: ImageSnippet;
  pending = false;
  status = 'init';

  constructor(private constructeurFormulaire: FormBuilder,
              private modeleService: ModeleService,
              private optionService: OptionService,
              private versionService: VersionService,
              private dialogRef: MatDialogRef<ModifierVerionComponent>,
              private imageService: ImageService,
              private changeDetectorRef: ChangeDetectorRef
  ) {

  }

  ngOnInit() {

    this.formulaire = this.constructeurFormulaire.group({
      code: this.version.CodeVersion,
      nom: this.version.NomVersion,
    });
    this.loadFile();
    this.formulaire.valueChanges.subscribe();
    /* Charger les options */
    this.getOptions();

  }

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
    });
  }


  loadFile() {
    this.selectedFile = new ImageSnippet(null , null);
    this.selectedFile.status = 'ok';
    this.selectedFile.src = String(this.version.images[0]);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }


  gererOptions(event, option) {

  }

  onSubmit() {
    this.versionService.modifierVersion(this.formulaire.value.code,
      this.formulaire.value.nom, this.formulaire.value.code).subscribe((res) => {

      }
      );

  }
}



class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}
