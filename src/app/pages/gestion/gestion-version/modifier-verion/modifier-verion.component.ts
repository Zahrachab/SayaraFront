import { Component, OnInit } from '@angular/core';
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
  ) {
  }

  ngOnInit() {

    this.formulaire = this.constructeurFormulaire.group({
      code: this.version.CodeVersion,
      nom: this.version.NomVersion,
    });
    this.getOptions();
    this.formulaire.valueChanges.subscribe();
  }

  getOptions() {
    this.optionService.getOptions(this.version.CodeModele).subscribe(opts => this.options = opts as Option[]);
    this.optionsVersion = (this.version as VersionDetail).options as Option[];
    for (let i = 0; i < this.optionsChoisies.length; i++) {
      for (let j = 0; j < this.options.length; j++) {
        console.log('hh');
         if ( String(this.options[j].CodeOption) === String(this.optionsChoisies[i].CodeOption)) {
           this.options[j].Checked = true;

         }
      }

    }
    console.log(this.options);
  }

  gererOptions(event, option) {

  }

  onSubmit() {

  }
}



class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}
