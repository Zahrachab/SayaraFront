import {Component, OnInit} from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import {StockService} from '../../../services/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock-upload.component.html',
  styleUrls: ['./stock-upload.component.scss']
})
export class StockUploadComponent implements OnInit {
  // File uploader
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  private el: HTMLElement;
  private file: string;
  private files: Array<File> = [];

  constructor( public stockService: StockService) {
  }

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
    this.stockService.uploadCsv(this.uploader.queue[0]._file)
  }

}
