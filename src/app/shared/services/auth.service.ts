import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { User } from '../models/Users';
import { OAuthSettings } from 'src/oauth';
import { Client } from '@microsoft/microsoft-graph-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticated: boolean;
  user: User;

  constructor(private msalService: MsalService) {

    this.authenticated = this.msalService.getAccount() != null;
    this.getUser().then((user) => {this.user = user});

   }

   async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {


        console.log('Login failed', JSON.stringify(reason, null, 2));
        // this.alertsService.add('Login failed', JSON.stringify(reason, null, 2));
      });


    if (result) {
      this.authenticated = true;
      this.user = await this.getUser();

    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
        console.log('Get token failed')
        // this.alertsService.add('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      return result.accessToken;
    }
    return null;
  }

  // <getUserSnippet>
  private async getUser(): Promise<User> {
    if (!this.authenticated) return null;

    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async(done) => {
        let token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });

        if (token)
        {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });

    // Get the user from Graph (GET /me)
    let graphUser = await graphClient.api('/me').get();

    let user = new User();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;

    return user;
  }

}

