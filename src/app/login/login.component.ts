import { Observable, of, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { catchError, takeUntil, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { FormControl, FormsModule, NgForm, NgModel } from '@angular/forms';
import firebase from 'firebase/app';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  passwordText: string;
  emailText: string;
  usernameText: string;
  selectedIndex: number;
  // user: User;
  googleLogin = true;
  modelEmail: string;
  modelPassword: string;
  destroyed$: Subject<null> = new Subject();
  user$: Observable<firebase.User> = this.authService.user$;
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // this.selectedIndex = 1;
  }

  signIn(): void {
    this.authService
      .signIn(this.emailText, this.passwordText)
      .pipe(
        catchError((error) => of(null)),
        filter((res) => res),
        takeUntil(this.destroyed$)
      )
      .subscribe((authState) => {
        console.log(authState)
        this.router.navigate(['home']);
      });
  }

  login(): void {
    this.authService
      .loginWithGoogle()
      .pipe(
        catchError((error) => of(null)),
        filter((res) => res),
        takeUntil(this.destroyed$)
      )
      .subscribe((authState) => {
    
        // console.log(authState.user)
        const user: User = {
          userId: authState.user.uid,
          email: authState.user.email,
          displayName: authState.user.displayName,
          photoUrl: authState.user.photoURL
        }

        // save the user object in localstorage
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['home']);
      });
  }

  createUser(): void {
    this.authService
      .create(this.modelEmail, this.modelPassword)
      .pipe(
        catchError((error) => of(null)),
        filter((res) => res),
        takeUntil(this.destroyed$)
      )
      .subscribe((authState) => {
        this.user$.subscribe(
          (user) => {
            user.updateProfile({
              displayName: this.usernameText,
              photoURL: null
            }).then(() => {
              console.log('profile updated successfully!')
            }, (error) => {
              console.log('There was a problem.')
            });
          }
        );
        this.snackbar.open(`User ${this.usernameText} created successfully`, 'Ok', {duration: 5000});
        this.router.navigate(['home']);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
