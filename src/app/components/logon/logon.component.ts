import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/Users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.component.html',
  styleUrls: ['./logon.component.scss']
})
export class LogonComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

  get authenticated(): boolean {
    return this.authService.authenticated;
  }

  get user(): User {
    return this.authService.user;
  }

  async signIn(): Promise<void> {

    // await this.authService.signIn();

    // if (this.authenticated) {

      this.router.navigate(['/home']);
    // }

  }

}
