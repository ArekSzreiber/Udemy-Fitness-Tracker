import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../app.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  // isLoading: boolean = false;
  isLoading$: Observable<boolean>;
  isLoadingSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: fromApp.State }>,
  ) {
  }

  ngOnInit(): void {
    // this.store.subscribe(data => {
    //   console.log(data);
    // })
    this.isLoading$ = this.store.pipe(map(state => state.ui.isLoading));
    // this.isLoadingSubscription = this.uiService.loadingStateChanged
    //   .subscribe(isLoadingState => {
    //       this.isLoading = isLoadingState;
    //     }
    //   );
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.min(6)]],
    });
  }

  ngOnDestroy(): void {
    // this.isLoadingSubscription?.unsubscribe();
  }

  onSubmit() {
    console.log(this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }
}
