import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NotificacionService} from '../notifications/shared/notificacion.service';
import {HttpStatus, Status} from '../shared/utils/http-util/http-status';
import {MatDialog} from '@angular/material';
import {Router} from '@angular/router';
import {DialogClassicComponent} from '../../commons/dialogs/dialog/dialog-classic.component';

/**
 * MC4
 * Santa Cruz - Bolivia
 * project: sfe-backoffice-ui
 * package:
 * date:    01-03-19
 * author:  fmontero
 **/

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private httpStatus: HttpStatus, private notificationService: NotificacionService, private matDialog: MatDialog, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse) {
        const status: Status = this.httpStatus.statusFromCodeStatus(error.status);
        if ((status.code === 401) && this.router.url !== '/authentication/login') {
          this.matDialog.open(DialogClassicComponent, {
            panelClass: ['zero-padding'],
            data: {
              textContent: 'Tiempo de sesion finalizado, debe iniciar sesion nuevamente.',
              btnConfirm: 'Cerrar',
              titleContent: 'SESIÓN EXPIRADA'
            }
          }).afterClosed().subscribe(() => {
            sessionStorage.clear();
            this.router.navigate(['/authentication/login']);
          });
        } else if ((status.code === 403) && this.router.url !== '/authentication/login') {
          sessionStorage.clear();
          this.router.navigate(['/authentication/login']);
        } else {
          if (this.router.url !== '/authentication/login' && (error.status !== (401 || 403))) {
            this.notificationService.failed(error.error.message);
          }
        }
        return throwError(error);
      } else {
        this.notificationService.failed('Ha ocurrido un error inesperado');
        return throwError(error);
      }
    }));
  }

}
