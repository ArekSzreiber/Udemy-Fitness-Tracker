import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UIService } from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private snackbar: MatSnackBar,
    private uiService: UIService,
  ) {
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(result => {
      this.uiService.loadingStateChanged.next(false);
    }).catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.showError(error);
    });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(result => {
      this.uiService.loadingStateChanged.next(false);
    }).catch(error => {
      this.showError(error);
      this.uiService.loadingStateChanged.next(false);
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

