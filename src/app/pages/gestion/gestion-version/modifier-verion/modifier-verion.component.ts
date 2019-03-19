import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
  private optionsAjoutes: Array<Option> = [];
  private optionsSupp: Array<Option> = [];
  selectedFile: Array<ImageSnippet> = [];
  images: Array<File> = [];
  imagesSupp: Array<any> = [];

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private constructeurFormulaire: FormBuilder,
              private modeleService: ModeleService,
              private optionService: OptionService,
              private versionService: VersionService,
              private dialogRef: MatDialogRef<ModifierVerionComponent>,
              private imageService: ImageService,
              private dialogValidation: MatDialog
  ) {

  }

  ngOnInit() {

    this.formulaire = this.constructeurFormulaire.group({
      code: this.version.CodeVersion,
      nom: this.version.NomVersion,
      type:  [null, Validators.compose([Validators.required])]
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
    for (let j = 0; j < this.version.images.length; j++) {
      this.selectedFile[j] = new ImageSnippet(null , null);
      this.selectedFile[j].status = 'ok';
      this.selectedFile[j].new = false;
      this.selectedFile[j].src = String(this.version.images[j].CheminImage);
    }
  }


  processFile(imageInput: any) {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      const reader = new FileReader ();
      const fileItem = this.uploader.queue[j]._file;
      reader.addEventListener('load', (event: any) => {
        this.selectedFile[this.selectedFile.length] = new ImageSnippet(event.target.result, fileItem);
      });

      reader.readAsDataURL(fileItem);
      this.images.push(this.uploader.queue[j]._file);
    }
    this.uploader.clearQueue();
  }


  gererOptions(event, option) {
    option.Checked = !option.Checked;
    console.log(option.Checked);
    if (option.Checked === true) {
      if ( this.optionsSupp.indexOf(option) === -1) {
        this.optionsAjoutes.push(option);
      } else {
        this.optionsSupp.splice(this.optionsSupp.indexOf(option) , 1);
      }
    } else {
      if ( this.optionsAjoutes.indexOf(option) === -1) {
        this.optionsSupp.push(option);
        console.log(this.optionsSupp );
      } else {
        this.optionsAjoutes.splice(this.optionsAjoutes.indexOf(option) , 1);
      }
    }

  }

  onSubmit() {
    const dialogRef: MatDialogRef<ConfirmationDialogComponent> = this.dialogValidation.open(ConfirmationDialogComponent, {
        width: '350px',
        data: 'Voulez vous confirmer les changements que vous allez effectuer sur le version?'
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        /* modifier le nom de la version */
        this.versionService.modifierVersion(this.formulaire.value.code,
          this.formulaire.value.nom, this.formulaire.value.code).subscribe((res) => {
          }
        );
        /* ajouter des options */
        for (let i = 0 ; i < this.optionsAjoutes.length; i++) {
          this.optionService.ajouter(String(this.optionsAjoutes[i].CodeOption), String(this.optionsAjoutes[i].NomOption),
            this.formulaire.value.code).subscribe((res) => {
          } , (error) => {});
        }
        /* supprimer des options */
        for (let i = 0 ; i < this.optionsSupp.length; i++) {
          this.optionService.supprimer(String(this.optionsSupp[i].CodeOption),
            this.formulaire.value.code).subscribe(() => {
          });
        }

        /*ajouter une photo à une version */
        for (let j = 0; j < this.images.length; j++) {
          this.imageService.uploadImage(this.images[j], String(this.version.CodeVersion) ).subscribe(res => {
          });
        }

        for (let j = 0; j < this.imagesSupp.length; j++) {
          // en attendant le route
        }
      }
    });
    this.dialogRef.close();

    }



  supprimerImage(selected: ImageSnippet) {
    // si l'image appartient déjà à la version (elle est sur le cloud)
    if (selected.new === false) {
        this.imagesSupp.push(selected.id); // pour envoyer un delete lors de la validation
    } else {
      this.images.splice(this.images.indexOf(selected.file), 1); // supprimer de la liste destinée au POST
    }
    this.selectedFile.splice(this.selectedFile.indexOf(selected), 1);
  }
}



class ImageSnippet {
  pending = false;
  status = 'init';
  new = true;
  id;
  constructor(public src: string, public file: File) {
  }
}
