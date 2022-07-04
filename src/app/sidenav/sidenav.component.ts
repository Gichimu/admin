import { Component, OnInit } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';
import { AddkidComponent } from '../addkid/addkid.component';
import { User } from '../user';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  open = false;
  displayName: string;
  email: string;
  photoUrl: string;
  navigatedRoute: any; 
  contentMargin = 245;

  constructor(private dialog: MatDialog, private authService: AuthService) { }

  openDialog(){
    this.dialog.open(DashboardComponent);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.displayName = user.displayName
      this.email = user.email
      this.photoUrl = user.photoURL
    });
  }

  getRoute(myRoute: string) {
    if(myRoute == 'dashboard'){
      this.navigatedRoute = DashboardComponent
    }else if(myRoute == 'profile'){
      this.navigatedRoute = ProfileComponent
    }else if(myRoute == 'addKid'){
      this.navigatedRoute = AddkidComponent
    }else if(myRoute == 'search'){
      this.navigatedRoute = SearchComponent
    }
    return this.navigatedRoute
  }

  sidenavToggle() {
    this.open = !this.open;
    this.open ? (this.contentMargin = 190) : (this.contentMargin = 70);
  }
}
