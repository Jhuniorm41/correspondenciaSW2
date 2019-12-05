import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './authentication/shared/authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private authService: AuthenticationService, private helper: JwtHelperService) {
  }
  ngOnInit() {
    if (this.authService.isLoggedIn() && !this.helper.isTokenExpired()) {
      this.router.navigate(['/bienvenida']);
    } else {
      this.router.navigate(['/authentication/login']);
    }
  }
}
