import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from './auth-data.model';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
  ) {
  }

  registerUser(authData: AuthData) {
    this.auth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(result => {
      console.log(result, 'successful');
      this.successfullyAuthorized();
    }).catch(error => {
      console.log(error, 'error');
    });
  }

  login(authData: AuthData) {
    this.auth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(result => {
      console.log(result, 'successful');
      this.successfullyAuthorized();
    }).catch(error => {
      console.log(error, 'error');
    });
  }

  logout() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);

  }

  isAuth() {
    return this.isAuthenticated;
  }

  private successfullyAuthorized() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

}

