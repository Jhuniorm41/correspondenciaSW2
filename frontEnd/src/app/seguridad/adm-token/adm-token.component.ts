import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { UsersService } from '../../core/services/users.service';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { DialogoTokenComponent } from './dialogo-token/dialogo-token.component';
import { ConfirmDialogComponent } from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { TokenService } from '../../core/services/token.service';
import { User } from '../../core/models/users';
import { ViewTokenComponent } from './view-token/view-token.component';

@Component({
  selector: 'app-adm-token',
  templateUrl: './adm-token.component.html',
  styleUrls: ['./adm-token.component.css'],
  providers: [UsersService, TokenService]
})
export class AdmTokenComponent implements OnInit {


  @ViewChild('table') currencyTable: any;
  listaUsuarios: User[] = [];

  constructor(
    public dialog: MatDialog,
    private usuarioService: UsersService,
    private notificacion: NotificacionService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.currencyTable.messages = {
      emptyMessage: 'Ningún registro para mostrar',
      selectedMessage: 'seleccionados',
      totalMessage: 'en total'
    };
    this.listar();
  }

  abrirDialogoCreate(usuario: User) {
    this.tokenService.viewToken(usuario).subscribe(result => {
      if (result.code === '000') {
        this.notificacion.warning('El usuario: ' + usuario.usuario + ' ya tiene un Token.');
      } else {
        const dialogRef = this.dialog.open(DialogoTokenComponent, {
          maxHeight: (window.innerHeight - 50) + 'px',
          width: '50%',
          data: usuario
        });
        dialogRef.afterClosed().subscribe(respuesta => {
          if (respuesta !== null) {
            this.listar();
          }
        });
      }
    });
  }
  abrirDialogoVista(usuario: User) {
    this.tokenService.viewToken(usuario).subscribe(result => {
      if (result.code === '000') {
        const dialogRef = this.dialog.open(ViewTokenComponent, {
          maxHeight: (window.innerHeight - 50) + 'px',
          width: '50%',
          data: result.values
        });
        dialogRef.afterClosed().subscribe(respuesta => {
          if (respuesta !== null) {
            this.listar();
          }
        });
      } else {
        this.notificacion.warning(result.message);
      }
    });
  }

  listar() {
    this.listaUsuarios = [];
    this.usuarioService.getUsersPayment().subscribe(respuesta => {
      this.listaUsuarios = respuesta;
    });
  }
  eliminar(usuario: User) {
    this.tokenService.viewToken(usuario).subscribe(result => {
      if (result.code !== '000') {
        this.notificacion.warning('El usuario ' + usuario.usuario + ' no tiene un token asignado.');
      } else {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          panelClass: ['zero-padding'],
          // tslint:disable-next-line:max-line-length
          data: { textContent: '¿Está seguro de eliminar el Token para el ' + usuario.usuario + ' ?', headerText: 'Eliminar Token' }
        });
        dialogRef.afterClosed().subscribe(respuesta => {
          if (respuesta) {
            this.tokenService.deleteToken(usuario).subscribe(
              () => {
                this.listar();
                this.notificacion.success('Se eliminó el token del usuario: ' + usuario.usuario);
              }, err => {
                this.notificacion.failed(err.error.message);
              }
            );
          }
        });
      }
    });
  }

}
