import { Component, OnInit, ViewEncapsulation, Input, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { UsersService } from '../../../core/services/users.service';
import { Roles } from '../../../core/models/rol';
import { CompanyService } from '../../../core/services/company.service';
import { Company } from '../../../core/models/company';

@Component({
  selector: 'app-dialogo-usuario',
  templateUrl: './dialogo-usuario.component.html',
  styleUrls: ['./dialogo-usuario.component.css'],
  providers: [UsersService, CompanyService]
})
export class DialogoUsuarioComponent implements OnInit {
  @Input() operacion: string;
  listaRoles: Roles[] = [];
  selected: any = null;
  public form: FormGroup;
  empresaList: Company[] = [];
  companyId = 0;
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<DialogoUsuarioComponent>,
    private notificacion: NotificacionService,
    private usuarioService: UsersService,
    private companyService: CompanyService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.listarRoles();
    this.listarEmpresas();
    this.form = this.builder.group({
      id: [this.data.id],
      usuario: [this.data.usuario,  [Validators.required]],
      nombre: [this.data.nombre, [Validators.required]],
      apellido: [this.data.apellido, [Validators.required]],
      email: [this.data.email, [Validators.required]],
      telefono: [this.data.telefono, [Validators.required]],
      password: [this.data.password, [Validators.required]],
      rol: [this.data.rol],
      estado: [this.data.estado],
      fechaRegistro: [this.data.fechaRegistro],
      usuarioAlta: [this.data.usuarioAlta],
  });
    if (this.operacion === 'editar') {
      this.selected = this.data.rol.id;
    }
  }

  buscarObjeto(id) {
    return this.listaRoles.find(function(item){
        return item.id === id;
    });

}

  close(): void {
    this.dialogRef.close(null);
  }
  guardar() {
    this.form.value.rol = this.buscarObjeto(this.selected);
    if (isNaN(this.data.id)) {
      this.usuarioService.createUser(this.form.value, this.companyId).subscribe(respuesta => {
        if (respuesta != null) {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se registró el usuario: ' + respuesta.usuario);
        }
      },
      err => {
        this.notificacion.failed(err.error.errorMessage);
      }
      );
    } else {
      this.usuarioService.editUser(this.form.value).subscribe(respuesta => {
          this.dialogRef.close({ respuesta });
          this.notificacion.success('Se modificó el usuario: ' + respuesta.usuario);
        },
        err => {
          this.notificacion.failed(err.error.errorMessage);
        }
        );
    }
  }
  listarRoles() {
    this.usuarioService.getRol().subscribe(roles => {
      this.listaRoles = roles;
  });
  }
  listarEmpresas() {
    this.companyService.getCompany().subscribe(respuesta => {
      this.empresaList = respuesta;
    });
  }
}
