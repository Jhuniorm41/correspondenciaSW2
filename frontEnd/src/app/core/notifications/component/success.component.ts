import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-success',
  template:
    `<div fxLayout="row wrap">
        <div fxFlex="90" class="text-left error-color">
         <b>{{this.customTitle}}</b><br>
               {{this.customMessage}}
              </div>
         <div fxFlex="10">
          <mat-icon>check_circle</mat-icon>
          </div>
      </div>`,
  styles: [`.error-color{color: white;}`]
})
export class SuccessComponent implements OnInit {

  public customMessage: string;
  customTitle: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    this.customMessage = this.data && this.data.message ? this.data.message : 'Proceso satisfactorio';
    this.customTitle = this.data && this.data.title ? this.data.title : 'ÉXITO';
  }

}
