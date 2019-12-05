import { Component, OnInit, ViewEncapsulation, Input, Inject, Optional } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonalDialogComponent } from '../../../configuracion/personal/personal-dialog/personal-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { ApiService } from '../../../core/services/api-service/api.service';

@Component({
  selector: 'app-dialogo-correspondencia',
  templateUrl: './dialogo-correspondencia.component.html',
  styleUrls: ['./dialogo-correspondencia.component.css'],
})
export class DialogoCorrespondenciaComponent implements OnInit {

  @Input() operacion: string;
  public form: FormGroup;
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<DialogoCorrespondenciaComponent>,
    private notificacion: NotificacionService,
    private service: ApiService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.builder.group({
      id: [this.data.id],
      cite: [this.data.cite, [Validators.required]],
      fecharegistro: [ this.data.fecharegistro, [Validators.required]],
      tipo: [ this.data.tipo, [Validators.required]],
      estado: [ this.data.estado, [Validators.required]],
      asunto: [ this.data.asunto, [Validators.required]],
      idprioridad: [this.data.idprioridad],
      idempresa: [this.data.idempresa, [Validators.required]]
  });
  }

  close(): void {
    this.dialogRef.close(null);
  }
  guardar() {
    if (isNaN(this.data.id)) {
      this.service.createPersonal(this.form.value).subscribe(respuesta => {
        if (respuesta != null) {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se registró el personal: ' + respuesta.nombre);
        }
      },
      err => {
        this.notificacion.failed(err.error.detail);
      }
      );
    } else {
      this.service.editCorrespondencia(this.form.value).subscribe(respuesta => {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se modificó la correspondecia: ' + respuesta.cite);
        },
        err => {
          this.notificacion.failed(err.error.detail);
        }
        );
    }
  }

}
