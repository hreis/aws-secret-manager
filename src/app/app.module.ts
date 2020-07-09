import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogonComponent } from './components/logon/logon.component';

import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { MsalModule } from "@azure/msal-angular";
import { HttpClientModule } from "@angular/common/http";
import { HomeComponent } from './components/home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OAuthSettings } from '../oauth';

@NgModule({
  declarations: [
    AppComponent,
    LogonComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTooltipModule,
    MatSlideToggleModule,
    AutocompleteLibModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
