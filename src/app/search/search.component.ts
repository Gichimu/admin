import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { Kid } from '../kid';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewChildComponent } from '../view-child/view-child.component';


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
  isLoading = true;
  

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ELEMENT_DATA: Kid[] = [];

  displayedColumns: string[] = ['Pic', 'First name', 'Middle name', 'Gender', 'Level', 'Nok', 'Contact', 'Actions'];
  dataSource = new MatTableDataSource<Kid>(this.ELEMENT_DATA);


  constructor(private readonly httpService: HttpService, private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllKids();
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  

  filterByName(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  // open dialog to display kid info
  getKidInfo(row: string){
    this.dialog.open(ViewChildComponent, {
      data: row
    })
  }

  // remove item
  delete(id){
    console.log(id)
  }

  // get all kids
  getAllKids(){
    this.httpService.getKids().subscribe(kids => {
      this.isLoading = false
      this.dataSource.data = kids as Kid[]
      
    });
  }
  
  capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1)
  }
}

