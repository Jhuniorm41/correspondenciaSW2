import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeguridadRoutes } from './seguridad.routing';
import { RecursosComponent } from './recursos/recursos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { AdmTokenComponent } from './adm-token/adm-token.component';
import { DialogoRecursoComponent } from './recursos/dialogo-recurso/dialogo-recurso.component';
import { CommonsModule } from '../commons/commons.module';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatGridListModule, MatButtonModule, MatSnackBarModule, MatNativeDateModule, MatDatepickerModule, MatPaginatorModule, MatTableModule, MatStepperModule, MatExpansionModule, MatTreeModule, MatTooltipModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { DialogoUsuarioComponent } from './usuarios/dialogo-usuario/dialogo-usuario.component';
import { DialogoTokenComponent } from './adm-token/dialogo-token/dialogo-token.component';
import { ViewTokenComponent } from './adm-token/view-token/view-token.component';
import { BitacoraDialogoComponent } from './bitacora/bitacora-dialogo/bitacora-dialogo.component';
import { DialogoAsignacionComponent } from './usuarios/dialogo-asignacion/dialogo-asignacion.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


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
    DragDropModule,
    RouterModule.forChild(SeguridadRoutes),
  ],
  declarations: [
    RecursosComponent,
    UsuariosComponent,
    BitacoraComponent,
    AdmTokenComponent,
    DialogoRecursoComponent,
    DialogoUsuarioComponent,
    DialogoTokenComponent,
    ViewTokenComponent,
    BitacoraDialogoComponent,
    DialogoAsignacionComponent,
  ],
  exports: [],
  // tslint:disable-next-line:max-line-length
  entryComponents: [DialogoRecursoComponent, DialogoUsuarioComponent, DialogoTokenComponent, ViewTokenComponent, BitacoraDialogoComponent, DialogoAsignacionComponent]
})
export class SeguridadModule { }
