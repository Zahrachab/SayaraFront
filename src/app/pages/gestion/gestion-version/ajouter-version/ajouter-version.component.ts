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
export class AjouterVersionComponent implements OnInit {

  private options: Option[];
  private formulaire: FormGroup;
  public codeModele: string;
  public optionsChoisies: Array<Option> = [];
  selectedFile: ImageSnippet;
  pending = false;
  status = 'init';

  constructor(private constructeurFormulaire: FormBuilder,
              private modeleservice: ModeleService,
              private optionservice: OptionService,
              private versionservice: VersionService,
              private dialogRef: MatDialogRef<AjouterVersionComponent>,
              private imageService: ImageService,
  ) {
  }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
        this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  ngOnInit() {
    this.optionservice.getOptions(this.codeModele).subscribe(opts => this.options = opts as Option[]);
    this.formulaire = this.constructeurFormulaire.group({
      code: '',
      nom: '',
    });
    this.formulaire.valueChanges.subscribe();
  }

  gererOptions(event, option) {
    option.Cheked = !option.Checked;
    this.optionsChoisies.push(option);
  }

  onSubmit() {
    let i = 0;
    this.selectedFile.pending = true;
    this.versionservice.ajouter(this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant,
      this.formulaire.value.nom, this.codeModele).subscribe(
      (res) => {
            for (i = 0 ; i < this.optionsChoisies.length; i++) {
              console.log(this.optionsChoisies[i]);
              this.optionservice.ajouter(String(this.optionsChoisies[i].CodeOption), String(this.optionsChoisies[i].NomOption),
                this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant);
            }
            this.imageService.uploadImage(this.selectedFile.file, this.formulaire.value.code + JSON.parse(localStorage.getItem('utilisateur')).utilfab.Fabricant ).subscribe(
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



class ImageSnippet {
  pending = false;
  status = 'init';

  constructor(public src: string, public file: File) {
  }
}
