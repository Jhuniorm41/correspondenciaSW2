/**
 * MC4
 * Santa Cruz - Bolivia
 * project: sfe-backoffice-ui
 * package:
 * date:    01-03-19
 * author:  fmontero
 **/
import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {SuccessComponent} from '../component/success.component';
import {MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar/typings/snack-bar-config';
import {FailedComponent} from '../component/failed.component';
import { WarningComponent } from '../component/warning.component';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private defaultDuration = 6000;
  private defaultHorizontalPosition: MatSnackBarHorizontalPosition = 'right';
  private defaultVerticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(public snackBar: MatSnackBar) {}

  // tslint:disable-next-line:max-line-length
  success(message?: string, title?: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition) {
    this.snackBar.openFromComponent(SuccessComponent, {
      duration: duration ? duration : this.defaultDuration,
      horizontalPosition: horizontalPosition ? horizontalPosition : this.defaultHorizontalPosition,
      verticalPosition: verticalPosition ? verticalPosition : this.defaultVerticalPosition,
      panelClass: ['success-notification', 'zero-padding'],
      data: {message: message ? message : null,  title: title ? title : null}
    });
  }

  // tslint:disable-next-line:max-line-length
  failed(message?: string, title?: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition) {
   // console.log(message)
    this.snackBar.openFromComponent(FailedComponent, {
      duration: duration ? duration : this.defaultDuration,
      horizontalPosition: horizontalPosition ? horizontalPosition : this.defaultHorizontalPosition,
      verticalPosition: verticalPosition ? verticalPosition : this.defaultVerticalPosition,
      panelClass: ['failed-notification'],
      data: {message: message ? message : null,  title: title ? title : null}
    });
  }

// tslint:disable-next-line:max-line-length
  warning(message?: string, title?: string, duration?: number, horizontalPosition?: MatSnackBarHorizontalPosition, verticalPosition?: MatSnackBarVerticalPosition) {
    this.snackBar.openFromComponent(WarningComponent, {
      duration: duration ? duration : this.defaultDuration,
      horizontalPosition: horizontalPosition ? horizontalPosition : this.defaultHorizontalPosition,
      verticalPosition: verticalPosition ? verticalPosition : this.defaultVerticalPosition,
      panelClass: ['warning-notification'],
      data: {message: message ? message : null,  title: title ? title : null}
    });
  }
}
