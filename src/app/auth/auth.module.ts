import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    AngularFireAuthModule,
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ReactiveComponentModule,
  ],
  exports: [],
})
export class AuthModule {
}
