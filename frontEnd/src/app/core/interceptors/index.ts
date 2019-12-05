/**
 * MC4
 * Santa Cruz - Bolivia
 * project: sfe-backoffice-ui
 * package:
 * date:    01-03-19
 * author:  fmontero
 **/
import {ErrorInterceptor} from './error.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeadersInterceptor} from './headers.interceptor';

export const httpInterceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }
];
