import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ReportPaymentService } from '../../core/services/reportPayment.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReportPago } from '../../core/models/ReportPago';
import { DatePipe } from '@angular/common';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { MatDialog } from '@angular/material';
import { ClicComponent } from '../../core/utils/clic-component';
import * as moment from 'moment';
@Component({
    selector: 'app-reporte-pago',
    templateUrl: './reporte-pago.component.html',
    styleUrls: ['./reporte-pago.component.css'],
    providers: [ReportPaymentService, DatePipe]
})
export class ReportePagoComponent extends ClicComponent implements OnInit {

    @ViewChild('table') currencyTable: any;
    listaReportePago: ReportPago[] = [];
    private startDate: any;
    private endDate: any;
    public today: any;
    public form: FormGroup;
    query = '';

    constructor(private reportPayment: ReportPaymentService,
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
      this.initializePage(10, false);
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

    setPage(pageInfo: any) {
      this.pageControl.number = pageInfo.offset;
      // tslint:disable-next-line:max-line-length
      this.reportPayment.getReportPaymentFull(this.startDate.format('DD-MM-YYYY'), this.endDate.format('DD-MM-YYYY'), this.query , this.pageControl.number, this.pageControl.size).subscribe(response => {
       this.pageControl = response;
       console.warn(response);
        this.render = true;
        // tslint:disable-next-line:max-line-length
        this.notificacion.success('Recuperando desde: ' + this.startDate.format('DD-MM-YYYY') + ', hasta: ' + this.endDate.format('DD-MM-YYYY'));
      }, error => {
        this.notificacion.warning(error.error.messages);
      });
    }

    updateDate() {
      this.startDate = moment(moment.utc(this.form.get('fechaInicial').value));
      this.endDate = moment(moment.utc(this.form.get('fechaFinal').value));
    }
}
