/**
 * MC4
 * Santa Cruz - Bolivia
 * project:
 * package:
 * date:    22-02-19
 * author:  fmontero
 **/

import {Component, Inject} from '@angular/core';
import {DialogComponent} from '../dialog-component';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-confirm-dialog',
  template:
    `
<mat-card>
  <mat-card-header class="bg-info"></mat-card-header>
  <form (submit)="this.onConfirmDialog()">
    <div fxLayout="row wrap">
      <div  fxFlex="100">
        <h4 class="text-center">{{this.textContent}}</h4>
      </div>
      <div  fxFlex="100">
        <mat-card-content>
          <mat-form-field>
            <input matInput type='text' [placeholder]="this.placeholder" [formControl]="this.inputControl"/>
          </mat-form-field>
          <mat-hint *ngIf="this.inputControl.hasError('required') && this.inputControl.touched"
          class="text-danger font-11">Este campo es requerido.</mat-hint>
        </mat-card-content>
      </div>
      <div fxFlex="50" fxLayoutAlign="center">
        <button mat-button [color]="'primary'" [type]="'submit'">{{this.btnConfirm}}</button>
      </div>
      <div fxFlex="50" fxLayoutAlign="center">
        <button mat-button [color]="'warn'" [type]="'button'" (click)="this.onCancelDialog()">{{this.btnCancel}}</button>
      </div>
    </div>
  </form>
</mat-card>
`
})
export class InputDialogComponent extends DialogComponent {
  public placeholder: String = 'Introduzca el valor';
  public inputControl: FormControl;

  /**
   *
   * @param {MatDialogRef<ConfirmDialogComponent>} dialogRef
   * @param data: contiene el texto personalizado ejmp. data: {textContent: 'Contenido personalizado',
   *  btnConfirm: 'Aceptar', btnCancel: 'Cerrar'}
   *              Ningúnparametro es obligatorio
   */
  constructor(public dialogRef: MatDialogRef<InputDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  customOnInit() {
    this.textContent = this.data && this.data.textContent ? this.data.textContent : this.textContent;
    this.btnConfirm = this.data && this.data.btnConfirm ? this.data.btnConfirm : this.btnConfirm;
    this.btnCancel = this.data && this.data.btnCancel ? this.data.btnCancel : this.btnCancel;
    this.placeholder = this.data && this.data.placeholder ? this.data.placeholder : this.placeholder;
    this.inputControl = new FormControl('', [Validators.required]);
  }

  onCancelDialog(): void {
    this.dialogRef.close();
  }

  onConfirmDialog(): void {
    // tslint:disable-next-line:curly
    if (this.inputControl.valid)
      this.dialogRef.close(this.inputControl.value);
  }

}
