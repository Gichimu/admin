import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  value = '';
  users$: Observable<any>
  pics$: Observable<any>
  constructor(private readonly httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getKids().subscribe(kids => {
      // this.users$ = users
      console.log(kids)
    });
    
  }

}
