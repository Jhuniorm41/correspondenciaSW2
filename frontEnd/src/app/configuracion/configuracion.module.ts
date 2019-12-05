import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresasComponent } from './empresas/empresas.component';
import { ContactosComponent } from './contactos/contactos.component';
import { RouterModule } from '@angular/router';
import { ConfiguracionRoutes } from './configuracion.routing';
// tslint:disable-next-line:max-line-length
import { MatCardModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatRadioModule, MatGridListModule, MatButtonModule, MatSnackBarModule, MatNativeDateModule, MatDatepickerModule, MatPaginatorModule, MatTableModule, MatStepperModule, MatExpansionModule, MatTreeModule, MatTooltipModule, MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { DialogoEmpresaComponent } from './empresas/dialogo-empresa/dialogo-empresa.component';
import { DialogoContactoComponent } from './contactos/dialogo-contacto/dialogo-contacto.component';
import { CommonsModule } from '../commons/commons.module';
import { JobsComponent } from './jobs/jobs.component';
import { JobsDialogoComponent } from './jobs/jobs-dialogo/jobs-dialogo.component';
import { DialogoDatasourceComponent } from './empresas/dialogo-datasource/dialogo-datasource.component';
import { PersonalComponent } from './personal/personal.component';
import { PersonalDialogComponent } from './personal/personal-dialog/personal-dialog.component';

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
    RouterModule.forChild(ConfiguracionRoutes),
  ],
  entryComponents: [
    DialogoEmpresaComponent,
    DialogoContactoComponent,
    JobsDialogoComponent,
    DialogoDatasourceComponent,
    PersonalDialogComponent
  ],
  declarations: [
    EmpresasComponent,
    ContactosComponent,
    DialogoEmpresaComponent,
    DialogoContactoComponent,
    JobsComponent,
    JobsDialogoComponent,
    DialogoDatasourceComponent,
    PersonalComponent,
    PersonalDialogComponent
  ],
  exports: []
})
export class ConfiguracionModule { }
