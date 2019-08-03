import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {StockService} from '../../../services/stock.service';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-stock',
  templateUrl: './stock-upload.component.html',
  styleUrls: ['./stock-upload.component.scss']
})
export class StockUploadComponent implements OnInit {

  //fichier csv
  private fichier: File;
  // File uploader
  private uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  private el: HTMLElement;
  private file: string;
  constructor( public stockService: StockService, public toastr: ToastrManager) {
  }

  ngOnInit() {
  }

  // Uploader le csv
  processFile(csvInput: any) {
    this.el = document.getElementById('progress-bar');
    const reader = new FileReader();
    this.fichier = this.uploader.queue[0]._file;
    reader.readAsDataURL(this.fichier);
    this.file = this.uploader.queue[0]._file.name;
    this.uploader.clearQueue();
  }

  uploadCsv() {
    if(this.fichier!= null) {
    this.el.setAttribute('mode', 'indeterminate');
    this.stockService.uploadCsv(this.fichier).subscribe( (res) => {
      if (res) {
        this.toastr.successToastr('Importation du fichier ' + this.file + ' réussite', 'Succès!!');
        this.el.setAttribute('mode', 'buffer');
      }
      }, error => {
      this.toastr.errorToastr('Importation du fichier ' + this.file + ' échouée ', 'Echec!!');
      this.el.setAttribute('mode', 'buffer');
    });
    }
  }



}
