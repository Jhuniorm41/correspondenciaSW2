import { Routes } from '@angular/router';
import { ReporteClienteComponent } from './reporte-cliente/reporte-cliente.component';
import { ReporteDeudaComponent } from './reporte-deuda/reporte-deuda.component';
import { ReportePagoComponent } from './reporte-pago/reporte-pago.component';
import { CorrespondenciaComponent } from './correspondencia/correspondencia.component';

export const ReporteRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'correspondencia',
        component: CorrespondenciaComponent
      },
      {
        path: 'reporteCliente',
        component: ReporteClienteComponent
      },
      {
        path: 'reporteDeuda',
        component: ReporteDeudaComponent
      },
      {
        path: 'reportePago',
        component: ReportePagoComponent
      }
    ]
  }
];
