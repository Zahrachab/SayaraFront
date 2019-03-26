import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {OptionService} from '../../../../services/option.service';

@Component({
  selector: 'app-supprimer-options',
  templateUrl: './supprimer-options.component.html',
  styleUrls: ['./supprimer-options.component.scss']
})
export class SupprimerOptionsComponent implements OnInit {

  constructor(private dialogReference: MatDialogRef<SupprimerOptionsComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any, private optionService: OptionService) { }

  ngOnInit() {
  }

  fermer() {
    this.dialogReference.close();
  }

  supprimerOption() {
    this.optionService.supprimerDuModele(this.data.option.CodeOption, this.data.modele).subscribe(() => {
      this.fermer();
    });
  }
}
