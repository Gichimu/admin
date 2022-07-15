import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-dialog',
  templateUrl: './check-dialog.component.html',
  styleUrls: ['./check-dialog.component.css']
})
export class CheckDialogComponent implements OnInit {
  checked: boolean
  constructor() { }

  ngOnInit(): void {
    this.checked = true;
  }

}
