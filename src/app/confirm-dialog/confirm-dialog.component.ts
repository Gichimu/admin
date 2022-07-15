import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css'],
})
export class ConfirmDialogComponent implements OnInit {
  isComplete = true;
  age;
  birthyear = new Date(this.data.dob).getFullYear();
  birthmonth = new Date(this.data.dob).getMonth();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmDialogComponent>
  ) {}

  ngOnInit(): void {
    this.age = new Date().getFullYear() - this.birthyear;
  }

  cancel() {
    this.dialogRef.close()
  }

  confirm() {
    this.dialogRef.close({event: 'save'})
  }
}
