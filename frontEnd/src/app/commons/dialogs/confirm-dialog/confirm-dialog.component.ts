import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogComponent} from '../dialog-component';


/**
 * MC4
 * Santa Cruz - Bolivia
 * project: sfe-backoffice-ui
 * package:
 * date:    22-02-19
 * author:  fmontero
 **/

@Component({
  selector: 'app-confirm-dialog',
  template:
      `<mat-card>
        <mat-card-header class="bg-dialog" style="color:#FFFFFF;">{{this.headerText}}</mat-card-header>
      <mat-card-content>
      <form (submit)="this.onConfirmDialog()">
          <div fxLayout="row wrap">
            <div  fxFlex="100">
              <h4 class="text-center">{{this.textContent}}</h4>
            </div>
            <div fxFlex="100">
            <mat-card-actions fxLayoutAlign="end center" fxLayoutGap="5px">
              <button mat-stroked-button color="warn" [type]="'button'" (click)="this.onCancelDialog()">{{this.btnCancel}}</button>
              <button mat-flat-button color="primary" [type]="'submit'">{{this.btnConfirm}}</button>
            </mat-card-actions>
          </div>
          </div>
        </form>
      </mat-card-content>
  </mat-card>`
})
export class ConfirmDialogComponent extends DialogComponent {

  /**
   *
   * @param {MatDialogRef<ConfirmDialogComponent>} dialogRef
   * @param data: contiene el texto personalizado ejmp. data:
   *  {textContent: 'Contenido personalizado', btnConfirm: 'Aceptar', btnCancel: 'Cerrar'}
   *              Ningúnparametro es obligatorio
   */
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  customOnInit() {
    this.headerText = this.data && this.data.headerText ? this.data.headerText : this.headerText;
    this.textContent = this.data && this.data.textContent ? this.data.textContent : this.textContent;
    this.btnConfirm = this.data && this.data.btnConfirm ? this.data.btnConfirm : this.btnConfirm;
    this.btnCancel = this.data && this.data.btnCancel ? this.data.btnCancel : this.btnCancel;
  }

  onConfirmDialog() {
    this.dialogRef.close(true);
  }

  onCancelDialog() {
    this.dialogRef.close(false);
  }

}
