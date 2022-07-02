import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  destroyed$: Subject<null> = new Subject();

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authService.logout().subscribe(authState => {
      console.log(authState)
      this.ngOnDestroy();
      this.router.navigate(['login']);
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
