import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { HeaderComponent } from './navigation/header/header.component';
import { MaterialModule } from './material.module';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { UIService } from './shared/ui.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavListComponent,
    WelcomeComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    MaterialModule,
    StoreModule.forRoot({ui: appReducer}),
  ],
  providers: [AuthService, UIService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
