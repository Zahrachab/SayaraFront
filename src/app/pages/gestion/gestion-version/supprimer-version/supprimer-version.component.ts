import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {VersionService} from '../../../../services/version.service';

@Component({
  selector: 'app-supprimer-version',
  templateUrl: './supprimer-version.component.html',
  styleUrls: ['./supprimer-version.component.scss']
})
export class SupprimerVersionComponent implements OnInit {

  constructor(private dialogReference: MatDialogRef<SupprimerVersionComponent>,
              @Inject(MAT_DIALOG_DATA) private data: any, private versionService: VersionService) { }

  ngOnInit() {
  }

  supprimerVersion() {
    //  alert(JSON.stringify(this.data));
    this.versionService.supprimerVersion(this.data.version.CodeVersion).subscribe(() => {
       this.fermer();
    });
  }



  fermer() {
    this.dialogReference.close();
  }
}
