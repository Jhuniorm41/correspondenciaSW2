import { Component, OnInit, ViewChild } from '@angular/core';
import { DebtsService } from '../../core/services/debts.service';
import { Debts } from '../../core/models/debt';
import { NotificacionService } from '../../core/notifications/shared/notificacion.service';
import { ClicComponent } from '../../core/utils/clic-component';

@Component({
  selector: 'app-reporte-deuda',
  templateUrl: './reporte-deuda.component.html',
  styleUrls: ['./reporte-deuda.component.css'],
  providers: [DebtsService]
})
export class ReporteDeudaComponent extends ClicComponent implements OnInit {

  @ViewChild('table') currencyTable: any;
  query: string;
  listaDeudas: Debts[] = [];

  constructor(private deudaService: DebtsService, private notificacion: NotificacionService) {
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
}

setPage(pageInfo: any) {
  this.pageControl.number = pageInfo.offset;
  // tslint:disable-next-line:max-line-length
  this.deudaService.getDebt(this.query, this.pageControl.number, this.pageControl.size).subscribe(response => {
   this.pageControl = response;
    this.render = true;
    // tslint:disable-next-line:max-line-length
    return this.notificacion.success('Reporte del criterio : ' + this.query.toString());
  }, error => {
    this.notificacion.warning(error.error.message);
  });
}
}
