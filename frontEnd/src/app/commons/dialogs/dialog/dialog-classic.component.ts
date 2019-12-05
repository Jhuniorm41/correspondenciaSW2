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
  selector: 'app-classic-dialog',
  template:
      `
    <mat-card>
      <form (submit)="this.onConfirmDialog()">
        <mat-card-header *ngIf="this.type === 'DANGER'" class="bg-danger text-white">
          {{this.title}}
        </mat-card-header>
        <mat-card-header *ngIf="this.type === 'WARNING'" class="bg-warning text-white">
          <mat-card-title>{{this.title}}</mat-card-title>
        </mat-card-header>
        <mat-card-header *ngIf="this.type === 'INFO'" class="bg-info text-white">
          <mat-card-title>{{this.title}}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
              <h4 class="text-center">{{this.textContent}}</h4>
        </mat-card-content>
        <mat-card-actions fxLayout="row wrap" fxLayoutAlign="start start" class="p-l-20">
          <button mat-flat-button [color]="'warn'" [type]="'submit'">{{this.btnConfirm}}</button>
        </mat-card-actions>
      </form>

    </mat-card>`
})
export class DialogClassicComponent extends DialogComponent {

  title: string = 'Dialogo';
  type: string = 'bg-info';

  /**
   *
   * @param {MatDialogRef<ConfirmDialogComponent>} dialogRef
   * @param data: contiene el texto personalizado ejmp. data: {textContent: 'Contenido personalizado', btnConfirm: 'Aceptar', btnCancel: 'Cerrar'}
   *              ningun parametro es obligatorio
   */
  constructor(public dialogRef: MatDialogRef<DialogClassicComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
  }

  customOnInit() {
    this.type = this.data && this.data.type ? this.data.type : this.type;
    this.title = this.data && this.data.title ? this.data.title : this.title;
    this.textContent = this.data && this.data.textContent ? this.data.textContent : this.textContent;
    this.btnConfirm = this.data && this.data.btnConfirm ? this.data.btnConfirm : this.btnConfirm;
  }


  onConfirmDialog() {
    this.dialogRef.close(true);
  }

  onCancelDialog() {
    this.dialogRef.close(false);
  }

}
