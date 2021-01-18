import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
  ) {
  }

  registerUser(authData: AuthData) {
    this.auth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(result => {
      console.log(result, 'successful');
    }).catch(error => {
      this.showError(error);
    });
  }

  login(authData: AuthData) {
    this.auth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(result => {
      console.log(result, 'successful');
    }).catch(error => {
      this.showError(error);
    });
  }

  logout() {
    this.auth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  private showError(error: any) {
    this.snackbar.open(error.message, null, {
      duration: 3000
    });
  }

}

