import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

/**
 * MC4
 * Santa Cruz - Bolivia
 * project: sfe-backoffice-ui
 * package:
 * date:    01-03-19
 * author:  fmontero
 **/
@Component({
  selector: 'app-failed',
  template:
    `<div fxLayout="row wrap">
        <div fxFlex="90" class="text-left error-color">
          <b>{{this.customTitle}}</b><br>
          {{this.customMessage}}
        </div>
        <div fxFlex="10">
          <mat-icon>cancel</mat-icon>
        </div>
      </div>`,
  styles: [`.error-color{color: white;}`]
})
export class FailedComponent implements OnInit {
  public customMessage: string;
  public customTitle: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any,
  ) { }

  ngOnInit() {
      this.customMessage = this.data && this.data.message ? this.data.message : 'Fallo al procesar';
      this.customTitle = this.data && this.data.title ? this.data.title : 'ERROR';
  }
}
