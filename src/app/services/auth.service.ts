import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<Observable<firebase.User | null>> = new BehaviorSubject<any>(null);
  public user$: Observable<firebase.User | null> = this.user.asObservable().pipe(
    switchMap((authenticatedUser: Observable<firebase.User | null>) => authenticatedUser)
  );
  constructor(private readonly afAuth: AngularFireAuth) { 
    this.user.next(this.afAuth.authState);
  }

  signIn(email: string, password: string): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  loginWithGoogle(){
    return from(this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()));
  }

  create(email: string, password: string): Observable<firebase.auth.UserCredential>{
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  logout(): Observable<void>{
    return from(this.afAuth.signOut());
  }
}
