import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../../core/services/contact.service';
import { Contact } from '../../core/models/contacts';
import { DialogoContactoComponent } from './dialogo-contacto/dialogo-contacto.component';
import { MatDialog } from '@angular/material';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { ConfirmDialogComponent } from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../../core/services/api-service/api.service';
import { Prioridad } from '../../core/models/Api-model/prioridad';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css'],
})
export class ContactosComponent implements OnInit {

  @ViewChild('table') currencyTable: any;
 // @BlockUI() blockUI: NgBlockUI;
  lista: Prioridad[] = [];

  constructor(
    public dialog: MatDialog,
    private service: ApiService,
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

  abrirDialogo(prioridad: Prioridad) {
    let temporal: any;
    let operacion: string;
    operacion = '';
    if (prioridad !== null) {
         operacion = 'editar';
         temporal = prioridad;
    } else {
      temporal = {};
      operacion = 'crear';
    }
    const dialogRef = this.dialog.open(DialogoContactoComponent, {
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
  listar() {
    this.service.listAllPrioridad().subscribe(respuesta => {
      this.lista = respuesta;
      console.warn(respuesta);
    });
  }
  eliminar(contacto: Contact) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      // tslint:disable-next-line:max-line-length
      data: {textContent: '¿Está seguro de eliminar el contacto ' + contacto.nombre +  ' ' + contacto.apellido + ' ?', headerText: 'Eliminar Contacto'}
    });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.service.deletePrioridad(contacto).subscribe(
          () => {
            this.listar();
            this.notificacion.success('Se eliminó la prioridad correctamente');
          }
          , err => {
            this.notificacion.failed(err.error.detail);
          }
        );
      }
    });
  }
}
