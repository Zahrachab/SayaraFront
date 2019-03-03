import {Component, Inject, OnInit} from '@angular/core';
import {ModalComponent} from '../modal/modal.component';
import {MDBModalRef, MDBModalService} from 'angular-bootstrap-md';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {


  constructor(private modalService: MatDialog) {}

  openModal() {
    const modalRef = this.modalService.open(ModalComponent, {width: '800px'});
  }

  ngOnInit(): void {
  }
}
