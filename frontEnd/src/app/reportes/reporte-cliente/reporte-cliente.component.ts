import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Customers } from '../../core/models/customer';
import { ReporteClienteService } from '../../core/services/reporteCliente.service';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { map } from 'rxjs/operators';
import { ClicComponent } from '../../core/utils/clic-component';
import * as moment from 'moment';

@Component({
  selector: 'app-reporte-cliente',
  templateUrl: './reporte-cliente.component.html',
  styleUrls: ['./reporte-cliente.component.css'],
  providers: [ReporteClienteService]
})
export class ReporteClienteComponent extends ClicComponent implements OnInit {

  @ViewChild('table') currencyTable: any;
  query: string;
  listaCliente: Customers[] = [];

  constructor(private reporteClienteService: ReporteClienteService,
    private notificacion: NotificacionService) {
      super();
    }

  ngOnInit() {
    this.currencyTable.messages = {
      emptyMessage: 'Ningún registro para mostrar',
      selectedMessage: 'seleccionados',
      totalMessage: 'en total'
    };
      this.initializePage(10, false);
  }
  searchCustomer() {
      if ( this.query == null) {
        return this.notificacion.warning('Inserte algún criterio de búsqueda.');
      }
      this.render = false;
      this.initializePage(10, true);
      // this.reporteClienteService.getCustomer(this.query).pipe(map(data => data.filter(item => JSON.stringify(item)))).subscribe(
      //     data => {
      //         this.listaCliente = data;
      //        return this.notificacion.success('Reporte del criterio : ' + this.query.toString());
      //     }
      // );
  }

  setPage(pageInfo: any) {
    this.pageControl.number = pageInfo.offset;
    // tslint:disable-next-line:max-line-length
    this.reporteClienteService.getCustomer(this.query, this.pageControl.number, this.pageControl.size).subscribe(response => {
     this.pageControl = response;
      this.render = true;
      // tslint:disable-next-line:max-line-length
      return this.notificacion.success('Reporte del criterio : ' + this.query.toString());
    }, error => {
      this.notificacion.warning(error.error.message);
    });
  }
}
