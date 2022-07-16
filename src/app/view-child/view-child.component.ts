import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-view-child',
  templateUrl: './view-child.component.html',
  styleUrls: ['./view-child.component.css']
})
export class ViewChildComponent implements OnInit {
  age;
  birthyear = new Date(this.data.dob).getFullYear();
  birthmonth = new Date(this.data.dob).getMonth();
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){};


  ngOnInit(): void {
    this.age = new Date().getFullYear() - this.birthyear
  }

  capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
