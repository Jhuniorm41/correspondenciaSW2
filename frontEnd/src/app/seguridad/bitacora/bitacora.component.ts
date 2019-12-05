import { Component, OnInit, ViewChild } from '@angular/core';
import { BinnacleService } from '../../core/services/binnacle.service';
import { Binnacle } from '../../core/models/binnacle';
import { ClicComponent } from '../../core/utils/clic-component';
import * as moment from 'moment';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { BitacoraDialogoComponent } from './bitacora-dialogo/bitacora-dialogo.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.component.html',
  styleUrls: ['./bitacora.component.css'],
  providers: [BinnacleService]
})
export class BitacoraComponent extends ClicComponent implements OnInit {
  @ViewChild('table') currencyTable: any;
  listaBitacora: Binnacle[] = [];
  private startDate: any;
  private endDate: any;
  public today: any;
  public form: FormGroup;
  query = '';

  constructor(private bitacoraService: BinnacleService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private notificacion: NotificacionService) {
    super();
    moment.locale('es-BO');
  }

  ngOnInit() {
    this.currencyTable.messages = {
      emptyMessage: 'Ningún registro para mostrar',
      selectedMessage: 'seleccionados',
      totalMessage: 'en total'
    };
    this.form = this.initialForm();
    this.today = moment().toDate();
    this.render = false;
    this.initializePage(10, true);
  }
  onSearch() {
    if (this.form.valid) {
      this.updateDate();
      if (this.endDate.isBefore(this.startDate)) {
        return this.notificacion.failed('La fecha final no puede ser menor que la fecha inicial');
      }
      this.render = false;
      this.initializePage(10, true);
    }
  }

  onLogFilter(value: string) {
    if (this.form.valid) {
      this.updateDate();
      if (this.endDate.isBefore(this.startDate)) {
        return this.notificacion.failed('La fecha final no puede ser menor que la fecha inicial');
      }
      this.render = false;
      this.initializePage(10, true);
    }
  }

  private initialForm(): FormGroup {
    this.startDate = moment().subtract(30, 'days');
    this.endDate = moment();
    return this.formBuilder.group({
      fechaInicial: new FormControl(this.startDate.toDate(), Validators.compose([Validators.required])),
      fechaFinal: new FormControl(this.endDate.toDate(), Validators.compose([Validators.required])),
    });
  }

  verDetalle(bitacora: Binnacle) {
        const dialogRef = this.dialog.open(BitacoraDialogoComponent, {
          maxHeight: (window.innerHeight - 50) + 'px',
          width: '50%',
          data: bitacora
        });
        dialogRef.afterClosed().subscribe(respuesta => {
        });
  }

  setPage(pageInfo: any) {
    this.pageControl.number = pageInfo.offset;
    // tslint:disable-next-line:max-line-length
    this.bitacoraService.getReportBinnacleFull(this.startDate.format('DD-MM-YYYY'), this.endDate.format('DD-MM-YYYY'), this.query , this.pageControl.number, this.pageControl.size).subscribe(response => {
     this.pageControl = response;
      this.render = true;
      // tslint:disable-next-line:max-line-length
     // this.notificacion.success('Recuperando desde: ' + this.startDate.format('DD-MM-YYYY') + ', hasta: ' + this.endDate.format('DD-MM-YYYY'));
    }, error => {
      this.notificacion.failed(error.error.messages);
    });
  }

  updateDate() {
    this.startDate = moment(moment.utc(this.form.get('fechaInicial').value));
    this.endDate = moment(moment.utc(this.form.get('fechaFinal').value));
  }

}
