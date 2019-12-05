import { Component, OnInit, ViewChild } from '@angular/core';
import { EntidadService } from '../../core/services/entidad.service';
import { MatDialog } from '@angular/material';
import { DialogoEmpresaComponent } from './dialogo-empresa/dialogo-empresa.component';
import { ConfirmDialogComponent } from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { Company } from '../../core/models/company';
import { CompanyService } from '../../core/services/company.service';
import { DialogoDatasourceComponent } from './dialogo-datasource/dialogo-datasource.component';
import { ApiService } from '../../core/services/api-service/api.service';
import { Empresa } from '../../core/models/Api-model/empresa';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css'],
})
export class EmpresasComponent implements OnInit {

  @ViewChild('table') currencyTable: any;
  listaEmpresa: Empresa[] = [];

  constructor(
    public dialog: MatDialog,
    private notificacion: NotificacionService,
    private service: ApiService
  ) { }

  ngOnInit() {
    this.currencyTable.messages = {
      emptyMessage: 'Ningún registro para mostrar',
      selectedMessage: 'seleccionados',
      totalMessage: 'en total'
    };
    this.listar();
  }

  abrirDialogo(empresa: Empresa) {
    let temporal: any;
    let operacion = '';
    if (empresa !== null) {
         operacion = 'editar';
         temporal = empresa;
    } else {
      temporal = {};
      operacion = 'crear';
    }
    const dialogRef = this.dialog.open(DialogoEmpresaComponent, {
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
    this.listaEmpresa = [];
    this.service.listAllEmpresa().subscribe(respuesta => {
      this.listaEmpresa = respuesta;
    });
  }
  eliminar(empresa: Empresa) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      data: {textContent: '¿Está seguro de eliminar la empresa ' + empresa.nombre + ' ?', headerText: 'Eliminar Empresa'}
    });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        this.service.deleteEmpresa(empresa).subscribe(
          () => {
            this.listar();
            this.notificacion.success('Se eliminó la empresa: ' + empresa.nombre);
          }
          , err => {
            this.notificacion.failed(err.error.errorMessage);
          }
        );
      }
    });
  }

}
