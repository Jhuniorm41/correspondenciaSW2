/**
 * MC4
 * Santa Cruz - Bolivia
 * project: sfe-backoffice-ui
 * package:
 * date:    01-03-19
 * author:  fmontero
 **/
import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {environment} from '../../../environments/environment';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private jwtHelperService: JwtHelperService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = this.authorization(request);
    // if (!(request.body instanceof FormData)) {
    //   request = this.setCommonHeaders(request);
    // } else {
    //   request = this.formDataHeaders(request);
    // }

    return next.handle(request);
  }

  authorization(request: HttpRequest<any>): HttpRequest<any> {
    if (request.url === environment.apiUrl + '/login/') {
      return request;
    }
   // const auth: Authentication = JSON.parse(sessionStorage.getItem('data'));
    const token = JSON.parse(sessionStorage.getItem('token'));

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        }
      });
    }
    return request;
  }

  private setCommonHeaders(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      },
      responseType: 'json'
    });
    return request;
  }

  private formDataHeaders(request: HttpRequest<any>): HttpRequest<any> {
    return request;
  }
}
