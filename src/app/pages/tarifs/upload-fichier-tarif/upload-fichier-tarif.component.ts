import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'app-upload-fichier-tarif',
  templateUrl: './upload-fichier-tarif.component.html',
  styleUrls: ['./upload-fichier-tarif.component.scss']
})

export class UploadFichierTarifComponent implements OnInit {
  // File uploader
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  private el: HTMLElement
  private file: string;
  private files: Array<File> = [];

  constructor() { }

  ngOnInit() {
  }

  // Uploader des images depuis l'ordinateur
  processFile(csvInput: any) {
    this.el = document.getElementById('progress-bar');
    for (let j = 0; j < this.uploader.queue.length; j++) {
      const reader = new FileReader();
      const fileItem = this.uploader.queue[j]._file;
      reader.readAsDataURL(fileItem);
      this.files.push(this.uploader.queue[j]._file);
    }
    this.uploader.clearQueue();
    this.el.setAttribute('mode', 'indeterminate');

  }

}
