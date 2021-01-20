import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: Date;
  isLoading: boolean = false;
  isLoadingSubscription: Subscription;


  constructor(
    private authService: AuthService,
    private uiService: UIService,
  ) {
  }

  ngOnInit(): void {
    this.maxDate = new Date(); // today
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.isLoadingSubscription = this.uiService.loadingStateChanged
      .subscribe(isLoadingState => {
        this.isLoading = isLoadingState;
      });
  }

  ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }
}
