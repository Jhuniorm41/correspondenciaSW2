import { Component, OnInit, ViewChild } from '@angular/core';
import { Resource } from '../../core/models/resource';
import { MatDialog } from '@angular/material';
import { ResourceService } from '../../core/services/resource.service';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { DialogoRecursoComponent } from './dialogo-recurso/dialogo-recurso.component';
import { ConfirmDialogComponent } from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css'],
  providers: [ResourceService]
})
export class RecursosComponent implements OnInit {

  @ViewChild('table') currencyTable: any;
 // @BlockUI() blockUI: NgBlockUI;
  listaRecurso: Resource[] = [];

  constructor(
    public dialog: MatDialog,
    private recursoService: ResourceService,
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

  abrirDialogo(recurso: Resource) {
    let temporal: any;
    let operacion: string;
    operacion = '';
    if (recurso !== null) {
         operacion = 'editar';
         temporal = recurso;
    } else {
      temporal = {};
      operacion = 'crear';
    }
    const dialogRef = this.dialog.open(DialogoRecursoComponent, {
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
    this.listaRecurso = [];
    this.recursoService.getResource().subscribe(respuesta => {
      this.listaRecurso = respuesta;
    });
  }
  eliminar(recurso: Resource) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      data: {textContent: '¿Está seguro de eliminar el recurso ' + recurso.nombre + ' ?', headerText: 'Eliminar Recurso'}
    });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        // this.recursoService.eliminar(recurso).subscribe(
        //   () => {
        //     this.listar();
        //     this.notificacion.success('Se eliminó correctamente el recurso: ' + recurso.nombre);
        //   }
        //   , err => {
        //     this.notificacion.failed(err.error.detail);
        //   }
        // );
      }
    });
  }
}
