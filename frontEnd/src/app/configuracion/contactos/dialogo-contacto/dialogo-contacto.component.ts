import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { ContactService } from '../../../core/services/contact.service';
import { ApiService } from '../../../core/services/api-service/api.service';

@Component({
  selector: 'app-dialogo-contacto',
  templateUrl: './dialogo-contacto.component.html',
  styleUrls: ['./dialogo-contacto.component.css'],
})
export class DialogoContactoComponent implements OnInit {

  @Input() operacion: string;
  public form: FormGroup;
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<DialogoContactoComponent>,
    private notificacion: NotificacionService,
    private service: ApiService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.builder.group({
      id: [this.data.id],
      nombre: [ this.data.nombre, [Validators.required]],
      cantdias: [ this.data.cantdias, [Validators.required]],
      frecuencia: [ this.data.frecuencia, [Validators.required]],

  });
  }

  close(): void {
    this.dialogRef.close(null);
  }
  guardar() {
    if (isNaN(this.data.id)) {
      this.service.createPrioridad(this.form.value).subscribe(respuesta => {
        if (respuesta != null) {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se registró la prioridad: ' + respuesta.nombre);
        }
      },
      err => {
        this.notificacion.failed(err.error.detail);
      }
      );
    } else {
      this.service.editPrioridad(this.form.value).subscribe(respuesta => {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se modificó la prioridad: ' + respuesta.nombre);
        },
        err => {
          this.notificacion.failed(err.error.detail);
        }
        );
    }
  }
}
