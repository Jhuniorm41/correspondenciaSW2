import { Component, OnInit, ViewEncapsulation, Input, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { ApiService } from '../../../core/services/api-service/api.service';

@Component({
  selector: 'app-personal-dialog',
  templateUrl: './personal-dialog.component.html',
  styleUrls: ['./personal-dialog.component.css'],
 // encapsulation: ViewEncapsulation.ShadowDom
})
export class PersonalDialogComponent implements OnInit {

  @Input() operacion: string;
  public form: FormGroup;
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<PersonalDialogComponent>,
    private notificacion: NotificacionService,
    private service: ApiService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.builder.group({
      id: [this.data.id],
      ci: [this.data.ci, [Validators.required]],
      nombre: [ this.data.nombre, [Validators.required]],
      telefono: [ this.data.telefono, [Validators.required]],
      cargo: [ this.data.cargo, [Validators.required]],
      correo: [ this.data.correo, [Validators.required]],
      area: [this.data.area, [Validators.required]]
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
      this.service.editPersonal(this.form.value).subscribe(respuesta => {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se modificó el personal: ' + respuesta.nombre);
        },
        err => {
          this.notificacion.failed(err.error.detail);
        }
        );
    }
  }
}
