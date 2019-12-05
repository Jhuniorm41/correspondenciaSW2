import { Component, OnInit, Optional, Inject, ViewChild, AfterViewInit, ChangeDetectorRef, Output } from '@angular/core';
import { Company } from '../../../core/models/company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../../core/services/company.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSelectChange, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { NotificacionService } from '../../../core/notifications/shared/notificacion.service';
import { ParametroConexion } from '../../../core/models/parameterConexion';
import { DataSourceParametroConexion } from '../../../core/models/dataSourceParametroConexionDto';
import { ConfirmDialogComponent } from '../../../commons/dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dialogo-datasource',
  templateUrl: './dialogo-datasource.component.html',
  styleUrls: ['./dialogo-datasource.component.css'],
  providers: [CompanyService]
})
export class DialogoDatasourceComponent implements OnInit, AfterViewInit {

  @Output() empresa: Company;
  displayedColumns: string[] = ['accion', 'nombre', 'valor'];
  dataSource = null;
  @ViewChild('paginator') paginator: MatPaginator;
  listaParametros: ParametroConexion[] = [];
  dtoDataSource: DataSourceParametroConexion = new DataSourceParametroConexion;

  isLinear = false;
  parametroConexionForm: FormGroup;

  enums: any[];
  selected: string;
  tipo = '';

  public dataSourceForm: FormGroup;
  constructor(
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    private companyService: CompanyService,
    private companyBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogoDatasourceComponent>,
    private notificacion: NotificacionService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  optionsImput(dato: string) {
     this.tipo = dato;
    if (dato === 'file') {
      this.dataSourceForm.controls['driverClassName'].disable();
      this.dataSourceForm.controls['maxPoolSize'].disable();
      this.dataSourceForm.controls['usuario'].disable();
      this.dataSourceForm.controls['password'].disable();
    } else {
      this.dataSourceForm.controls['driverClassName'].enable();
      this.dataSourceForm.controls['maxPoolSize'].enable();
      this.dataSourceForm.controls['usuario'].enable();
      this.dataSourceForm.controls['password'].enable();
    }
  }

  ngOnInit() {
    this.recuperarTipoDataSource();
    this.asignamentCompanyOrDataSource();
    this.parametroConexionForm = this.companyBuilder.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
    this.dataSourceForm = this.companyBuilder.group({
      id: [this.data.id],
      nombre: [this.data.nombre, [Validators.required]],
      descripcion: [this.data.descripcion, [Validators.required]],
      url: [this.data.url, [Validators.required]],
      driverClassName: [this.data.driverClassName],
      maxPoolSize: [this.data.maxPoolSize],
      estado: [this.data.estado],
      usuario: [this.data.usuario],
      password: [this.data.password],
      tipo: [this.data.tipo],
      connectTipoOut: [this.data.connectTipoOut],
      requestTimeOut: [this.data.requestTimeOut],
      token: [this.data.token],
      secure: [this.data.secure],
      fechaModificacion: [this.data.fechaModificacion],
      fechaRegistro: [this.data.fechaRegistro],
      ipv4: [this.data.ipv4],
      puerto: [this.data.puerto],
    });
  }

  ngAfterViewInit() {
    this.optionsImput(this.selected);
    this.cdRef.detectChanges();
  }

  recuperarTipoDataSource() {
    this.companyService.getEnumType().subscribe(result => {
      this.enums = result;
    });
  }

  asignamentCompanyOrDataSource() {
    if (this.data.code === '000') {
      this.selected = this.data.values.dataSource.tipo;
      this.listaParametros = this.data.values.parametroConexionList;
      this.asignarPaginador();
      this.data = this.data.values.dataSource;
    } else {
      this.data = {};
    }
  }
  onSubmit() {
    this.dtoDataSource.dataSource = this.dataSourceForm.value;
    this.dtoDataSource.parametroConexionList = this.listaParametros;
    this.dtoDataSource.empresa = this.empresa;
    if (isNaN(this.data.id)) {
      this.companyService.addDataSource(this.dtoDataSource).subscribe(dataSource => {
        if (dataSource != null) {
          this.dialogRef.close({ dataSource });
          this.notificacion.success('Se registró el DataSource: ' + this.dtoDataSource.dataSource.nombre);
        }
      },
        err => {
          this.notificacion.failed('Existe un problema con el servidor.');
        }
      );
    } else {
      this.companyService.editDataSource(this.dtoDataSource).subscribe(result => {
        if (result.code === '000') {
          this.notificacion.success('Se actualizó el DataSource: ' + this.dtoDataSource.dataSource.nombre);
          this.dialogRef.close({ result });
        } else {
          this.notificacion.failed('Existe un problema con el servidor.');
        }
      }
      );
    }
  }
  close(): void {
    this.dialogRef.close(null);
  }
  asignarPaginador() {
    this.dataSource = new MatTableDataSource<ParametroConexion>(this.listaParametros);
    this.dataSource.paginator = this.paginator;
  }
  sacarDeLista(elemento: ParametroConexion) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      // tslint:disable-next-line:max-line-length
      data: {textContent: '¿Está seguro de eliminar el parametro de conexión ' + elemento.name + ' ?', headerText: 'Eliminar Parametro de Conexión'}
    });
    dialogRef.afterClosed().subscribe(respuesta => {
      if (respuesta) {
        const index = this.listaParametros.indexOf(elemento);
        this.listaParametros.splice(index, 1);
        this.asignarPaginador();
        if (!isNaN(elemento.id)) {
          this.companyService.deleteParametroConexion(elemento).subscribe(response => {
            this.notificacion.success('Se eliminó el parametro de conexión: ' + response.values.name);
          });
        }
      }
    });
  }
  agregar(valor) {
    this.listaParametros.push(valor.value);
    this.asignarPaginador();
    this.parametroConexionForm = this.companyBuilder.group({
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
  }
  editarValor(elemento: ParametroConexion, valorNuevoString: string, campo: string) {
    if (campo === 'name') {
      elemento.name = valorNuevoString;
    } else if (campo === 'value') {
      elemento.value = valorNuevoString;
    }
    this.notificacion.success('Se actualizó el parametro de conexión: ' + elemento.name);
  }

}
