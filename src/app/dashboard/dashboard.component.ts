import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Kid } from '../kid';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  kids: Kid;
  ages: number[] = [];

  constructor(private readonly httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService
      .getKids()
      .subscribe((kids) => {
        this.kids = kids;
      });
  }

  capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
