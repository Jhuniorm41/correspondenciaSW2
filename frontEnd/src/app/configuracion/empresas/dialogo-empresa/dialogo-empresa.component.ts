import { Component, OnInit, Optional, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { EntidadService } from '../../../core/services/entidad.service';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { Contact } from '../../../core/models/contacts';
import { ContactService } from '../../../core/services/contact.service';
import { ApiService } from '../../../core/services/api-service/api.service';

@Component({
  selector: 'app-dialogo-empresa',
  templateUrl: './dialogo-empresa.component.html',
  styleUrls: ['./dialogo-empresa.component.css'],
})
export class DialogoEmpresaComponent implements OnInit {

  @Input() operacion: string;
  public form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<DialogoEmpresaComponent>,
    private service: ApiService,
    private notificacion: NotificacionService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.builder.group({
      id: [this.data.id],
      nombre: [this.data.nombre, [Validators.required]],
      direccion: [this.data.direccion, [Validators.required]],
      telefono: [this.data.telefono, [Validators.required]],
    });
  }
  close(): void {
    this.dialogRef.close(null);
  }
  guardar() {
    if (isNaN(this.data.id)) {
      this.service.createEmpresa(this.form.value).subscribe(respuesta => {
        if (respuesta != null) {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se registró la empresa: ' + respuesta.nombre);
        }
      },
      err => {
        this.notificacion.failed(err.error.errorMessage);
      }
      );
    } else {
      this.service.editEmpresa(this.form.value)
        .subscribe(respuesta => {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se actualizó la empresa: ' + respuesta.nombre);
        },
        err => {
          this.notificacion.failed(err.error.errorMessage);
        }
        );
    }
  }
}
