import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../core/models/users';
import { MatDialog } from '@angular/material';
import { UsersService } from '../../core/services/users.service';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { DialogoUsuarioComponent } from './dialogo-usuario/dialogo-usuario.component';
import { ConfirmDialogComponent } from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogoAsignacionComponent } from './dialogo-asignacion/dialogo-asignacion.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  providers: [UsersService]
})
export class UsuariosComponent implements OnInit {

  @ViewChild('table') currencyTable: any;
  // @BlockUI() blockUI: NgBlockUI;
   listaUsuarios: User[] = [];

   constructor(
     public dialog: MatDialog,
     private usuarioService: UsersService,
     private notificacion: NotificacionService,
   ) { }

   ngOnInit() {
     this.currencyTable.messages = {
       emptyMessage: 'Ningún registro para mostrar',
       selectedMessage: 'seleccionados',
       totalMessage: 'en total'
     };
     this.listar();
   }

   abrirDialogo(usuario: User) {
     let temporal: any;
     let operacion: string;
     operacion = '';
     if (usuario !== null) {
          operacion = 'editar';
          temporal = usuario;
     } else {
       temporal = {};
       operacion = 'crear';
     }
     const dialogRef = this.dialog.open(DialogoUsuarioComponent, {
       maxHeight: (window.innerHeight - 50) + 'px',
       width: '50%',
       data: temporal
     });
     dialogRef.componentInstance.operacion = operacion;
     dialogRef.afterClosed().subscribe(respuesta => {
       if (respuesta !== null) {
         this.listar();
       }
     });
   }
   volver() {}

   listar() {
     this.listaUsuarios = [];
     this.usuarioService.getUsers().subscribe(respuesta => {
       this.listaUsuarios = respuesta;
     });
   }
   eliminar(usuario: User) {
     const dialogRef = this.dialog.open(ConfirmDialogComponent, {
       panelClass: ['zero-padding'],
       data: {textContent: '¿Está seguro de eliminar el usuario ' + usuario.nombre + ' ?', headerText: 'Eliminar Usuario'}
     });
     dialogRef.afterClosed().subscribe(respuesta => {
       if (respuesta) {
         this.usuarioService.deleteUser(usuario).subscribe(
           () => {
             this.listar();
             this.notificacion.success('Se eliminó el usuario: ' + usuario.nombre);
           }
           , err => {
             this.notificacion.failed(err.error.message);
           }
         );
       }
     });
   }

   abrirDialogoDeAsignacion(usuario: User) {
    this.dialog.open(DialogoAsignacionComponent, {
      // maxHeight: (window.innerHeight - 50) + 'px',
      // width: '50%',
      panelClass: ['zero-padding'],
      data: usuario
    });
  }
}
