import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReporteRoutes } from './reportes.routing';
import { ReporteClienteComponent } from './reporte-cliente/reporte-cliente.component';
import { ReportePagoComponent } from './reporte-pago/reporte-pago.component';
import { ReporteDeudaComponent } from './reporte-deuda/reporte-deuda.component';
import { CommonsModule } from '../commons/commons.module';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatGridListModule, MatButtonModule, MatSnackBarModule, MatNativeDateModule, MatDatepickerModule, MatPaginatorModule, MatTableModule, MatStepperModule, MatExpansionModule, MatTreeModule, MatTooltipModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { CorrespondenciaComponent } from './correspondencia/correspondencia.component';
import { DialogoCorrespondenciaComponent } from './correspondencia/dialogo-correspondencia/dialogo-correspondencia.component';
import { AsignacionComponent } from './correspondencia/asignacion/asignacion.component';


@NgModule({
  imports: [
    CommonsModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatTableModule,
    MatStepperModule,
    MatExpansionModule,
    MatTreeModule,
    MatTooltipModule,
    MatSelectModule,
    NgxDatatableModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    RouterModule.forChild(ReporteRoutes),
  ],
  declarations: [
    ReporteClienteComponent,
    ReportePagoComponent,
    ReporteDeudaComponent,
    CorrespondenciaComponent,
    DialogoCorrespondenciaComponent,
    AsignacionComponent
  ],
  exports: [],
  entryComponents: [DialogoCorrespondenciaComponent]
})
export class ReporteModule { }
