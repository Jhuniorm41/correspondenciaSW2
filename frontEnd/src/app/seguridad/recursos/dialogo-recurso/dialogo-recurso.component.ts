import { Component, OnInit, Input, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Resource } from '../../../core/models/resource';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Roles } from '../../../core/models/rol';
import { ResourceService } from '../../../core/services/resource.service';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { icons } from '../../../core/utils/icons/icons';

@Component({
  selector: 'app-dialogo-recurso',
  templateUrl: './dialogo-recurso.component.html',
  styleUrls: ['./dialogo-recurso.component.css'],
  providers: [ResourceService]
})
export class DialogoRecursoComponent implements OnInit {

  listaIconos = icons;
  @Input() operacion: string;
  public form: FormGroup;

  listaRecursosPadres: Resource[] = [];
  listaRol: Roles[] = [];
  rol: Roles;
  disableSelect = new FormControl(true);

  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<DialogoRecursoComponent>,
    private resourceServide: ResourceService,
    private notificacion: NotificacionService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.builder.group({
      id: [this.data.id],
      nombre: [this.data.nombre, [Validators.required]],
      url: [this.data.url],
      icono: [this.data.icono],
      idRecurso: [this.data.idRecurso],
    });
    this.listarRecursosPadres();
    this.listarRoles();
  }

  close(): void {
    this.dialogRef.close(null);
  }
  guardar() {
    if (isNaN(this.data.id)) {
      this.resourceServide.addResource(this.form.value, this.rol).subscribe(respuesta => {
        if (respuesta != null) {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se registró correctamente el recurso: ' + respuesta.nombre);
        }
      },
      err => {
        this.notificacion.failed(err.error.detail);
      }
      );
    } else {
      this.resourceServide.editResource(this.form.value)
        .subscribe(respuesta => {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se modificó el recurso: ' + respuesta.nombre);
        },
        err => {
          this.notificacion.failed(err.error.detail);
        }
        );
    }
  }
  listarRoles() {
    this.resourceServide.getRoles().subscribe(respuesta => {
      this.listaRol = respuesta;
    }, err => {
      this.notificacion.failed(err.error.detail);
    });
  }
  listarRecursosPadres() {
    this.resourceServide.getResourcePadre().subscribe(respuesta => {
      this.listaRecursosPadres = respuesta;
    }, err => {
      this.notificacion.failed(err.error.detail);
    });
  }

}
