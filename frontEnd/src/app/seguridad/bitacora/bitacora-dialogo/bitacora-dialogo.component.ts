import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bitacora-dialogo',
  templateUrl: './bitacora-dialogo.component.html',
  styleUrls: ['./bitacora-dialogo.component.css'],
  providers: [DatePipe]
})
export class BitacoraDialogoComponent implements OnInit {
  public form: FormGroup;
  datePipe = new DatePipe('en-Bo');


  constructor(private formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<BitacoraDialogoComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
      this.form = this.formBuilder.group(
        {
          id: [this.data.usuario.id],
          fechaRegistro: [this.datePipe.transform(this.data.fechaRegistro, 'dd/MM/yyyy hh:mm')],
          accion: [this.data.accion],
          usuario: [this.data.usuario],
        }
      );
  }
  close(): void {
      this.dialogRef.close(null);
    }
}
