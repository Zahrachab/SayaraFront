import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {MatProgressBar} from '@angular/material';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
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

  // Uploader le csv
  processFile(csvInput: any) {
    this.el = document.getElementById('progress-bar');
    const reader = new FileReader();
    const fileItem = this.uploader.queue[0]._file;
    reader.readAsDataURL(fileItem);
    this.file = this.uploader.queue[0]._file.name;
    this.uploader.clearQueue();
    this.el.setAttribute('mode', 'indeterminate');

  }

}
