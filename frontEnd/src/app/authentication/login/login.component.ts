import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Authentication} from '../shared/authentication';
import {AuthenticationService} from '../shared/authentication.service';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoad = false;
  public error: string = null;

  constructor(private router: Router, private authService: AuthenticationService, private helper: JwtHelperService) {
  }

  ngOnInit() {
    // tslint:disable-next-line:curly
    if (this.helper.isTokenExpired())
      sessionStorage.clear();
    // else
    //   window.location.reload();
  }


  viewPrincipal() {
      this.router.navigate(['/bienvenida']);
  }

  onLogin(credentials: Authentication) {
    this.isLoad = true;
    this.error = null;
    this.viewPrincipal();
    // setTimeout(() => {
    //   this.authService.requestStorageLogin(credentials).subscribe(response => {
    //     sessionStorage.clear();
    //     sessionStorage.setItem('token', JSON.stringify(response.body.JWT));
    //     this.viewPrincipal();
    //     setTimeout(() => {
    //       this.isLoad = false;
    //       this.error = null;
    //     }, 1000);
    //   }, ({error}) => {
    //     if (error.MESSAGE === undefined) {
    //       this.error = 'No se puedo establecer la conexión, intentelo de nuevo.';
    //     } else {
    //       this.error = error.MESSAGE;
    //     }
    //     this.isLoad = false;

    //   });
    // }, 750);+
  }
}
