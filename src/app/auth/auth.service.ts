import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../app.reducer';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ui: fromApp.State}>,
  ) {
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.auth.auth.createUserWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});
    }).catch(error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch({type: 'START_LOADING'});
    this.auth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password,
    ).then(result => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});
    }).catch(error => {
      this.uiService.showSnackbar(error.message, null, 3000);
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch({type: 'STOP_LOADING'});
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

}

