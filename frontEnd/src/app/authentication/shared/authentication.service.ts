/**
 * MC4
 * Santa Cruz - Bolivia
 * project:
 * package:
 * date:    26-01-19
 * author:  fmontero
 **/
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Authentication} from './authentication';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  requestStorageLogin(auth: Authentication): any {
    const url = environment.apiUrl + environment.services.apiLogin;
    return this.httpClient.post<HttpResponse<any>>(url, JSON.stringify(auth), {observe: 'response'});
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('token');
  }
}
