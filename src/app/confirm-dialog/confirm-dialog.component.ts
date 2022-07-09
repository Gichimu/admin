import { AfterViewInit, Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})

export class ConfirmDialogComponent implements OnInit {
  age
  birthyear = new Date(this.data.dob).getFullYear();
  birthmonth = new Date(this.data.dob).getMonth()
  constructor(@Inject(MAT_DIALOG_DATA) public data) {}


  ngOnInit(): void {
    this.age = new Date().getFullYear() - this.birthyear;
    console.log(this.data);
  }



}
