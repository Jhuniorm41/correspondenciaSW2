import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../core/services/api-service/api.service';
import { Personal } from '../../core/models/Api-model/personal';
import { MatDialog } from '@angular/material';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { PersonalDialogComponent } from './personal-dialog/personal-dialog.component';
import { ConfirmDialogComponent } from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
})
export class PersonalComponent implements OnInit {
  @ViewChild('table') currencyTable: any;

  lista: Personal[] = [];
  constructor(private service: ApiService,  public dialog: MatDialog,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    this.currencyTable.messages = {
      emptyMessage: 'Ningún registro para mostrar',
      selectedMessage: 'seleccionados',
      totalMessage: 'en total'
    };
    this.listar();
  }


  abrirDialogo(personal: Personal) {
    let temporal: any;
    let operacion: string;
    operacion = '';
    if (personal !== null) {
         operacion = 'editar';
         temporal = personal;
    } else {
      temporal = {};
      operacion = 'crear';
    }
    const dialogRef = this.dialog.open(PersonalDialogComponent, {
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
    this.service.listAllPersonal().subscribe(respuesta => {
      this.lista = respuesta;
    });
  }
  eliminar(personal: Personal) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      // tslint:disable-next-line:max-line-length
      data: {textContent: '¿Está seguro de eliminar el personal ' + personal.nombre + '?', headerText: 'Eliminar Personal'}
    });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.service.deletePersonal(personal).subscribe(
          () => {
            this.listar();
            this.notificacion.success('Se eliminó el personal: ' + personal.nombre);
          }
          , err => {
            this.notificacion.failed(err.error.detail);
          }
        );
      }
    });
  }
}
