import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Kid } from '../kid';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';


interface TableData {
  pic: string
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  value = '';
  kid: Kid;
  isLoading = true;
  school: string;
  users$: Observable<any>
  pics$: Observable<any>

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ELEMENT_DATA: Kid[] = [];

  displayedColumns: string[] = ['Position', 'Pic', 'first name', 'Middle name', 'Level', 'Nok', 'Contact', 'Actions'];
  dataSource = new MatTableDataSource<Kid>(this.ELEMENT_DATA);


  constructor(private readonly httpService: HttpService, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllData();
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
  }

  getAllData(): void{
    this.httpService.getKids().subscribe(kids => {
      this.isLoading = false
      this.dataSource = kids
      console.log(kids)
    });
    
  }

  filterByName(filterText: string): void{
    this.dataSource.filter = filterText.trim().toLowerCase()
  }

  // open dialog to display kid info
  getKidInfo(row: string){
    this.dialog.open(DialogContentDialog, {
      data: row
    })
  }

  delete(id){
    console.log(id)
  }
}


@Component({
  selector: 'dialog-content-dialog',
  templateUrl: 'dialog-content-dialog.html',
  styleUrls: ['dialog-content-dialog.css'],
})
export class DialogContentDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}