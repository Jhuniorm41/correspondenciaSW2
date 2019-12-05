import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
// import { MatConfirmDialogComponent } from '../view/dialog/mat-dialog.component';

@Injectable()
export class DialogConfirmService {
    constructor(private dialog: MatDialog, public snackBar: MatSnackBar) {
    }

    openConfirmDialog(msg) {
        // return this.dialog.open(MatConfirmDialogComponent, {
        //     width: '600px',
        //     panelClass: 'confirm-dialog-container',
        //     disableClose: true,
        //     position: { top: '250px' },
        //     data: {
        //         message: msg
        //     }
        // });
    }
    // tslint:disable-next-line:member-ordering
    config: MatSnackBarConfig = {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
    };

    success(msg) {
        this.config['panelClass'] = ['notification', 'success'];
        this.snackBar.open(msg, '', this.config);
    }
    warn(msg) {
        this.config['panelClass'] = ['notification', 'warn'];
        this.snackBar.open(msg, '', this.config);
    }
}
