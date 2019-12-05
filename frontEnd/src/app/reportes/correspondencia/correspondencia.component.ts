import { Component, OnInit, ViewChild } from '@angular/core';
import { Correspondencia } from '../../core/models/Api-model/correspondencia';
import { ApiService } from '../../core/services/api-service/api.service';
import { MatDialog } from '@angular/material';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { ConfirmDialogComponent } from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { DialogoCorrespondenciaComponent } from './dialogo-correspondencia/dialogo-correspondencia.component';

@Component({
  selector: 'app-correspondencia',
  templateUrl: './correspondencia.component.html',
  styleUrls: ['./correspondencia.component.css']
})
export class CorrespondenciaComponent implements OnInit {

  @ViewChild('table') currencyTable: any;

  lista: Correspondencia[] = [];
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


  abrirDialogo(correspondencia: Correspondencia) {
    let temporal: any;
    let operacion: string;
    operacion = '';
    if (correspondencia !== null) {
         operacion = 'editar';
         temporal = correspondencia;
    } else {
      temporal = {};
      operacion = 'crear';
    }
    const dialogRef = this.dialog.open(DialogoCorrespondenciaComponent, {
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
    this.service.listAllCorrespondencia().subscribe(respuesta => {
      this.lista = respuesta;
    });
  }
  eliminar(correspondencia: Correspondencia) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      // tslint:disable-next-line:max-line-length
      data: {textContent: '¿Está seguro de eliminar la correspondencia ' + correspondencia.cite + '?', headerText: 'Eliminar Correspondencia'}
    });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.service.deleteCorrespondencia(correspondencia).subscribe(
          () => {
            this.listar();
            this.notificacion.success('Se eliminó la correspondencia: ' + correspondencia.cite);
          }
          , err => {
            this.notificacion.failed(err.error.detail);
          }
        );
      }
    });
   }

}
