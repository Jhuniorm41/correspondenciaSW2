import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule, MatProgressSpinnerModule, MatOptionModule, MatSelectModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AuthenticationRoutes} from './authentication.routing';
import {ErrorComponent} from './error/error.component';
import {LoginComponent} from './login/login.component';
import {FormLoginComponent} from './login/form-login/form-login.component';
import {CompanyService} from '../core/services/company.service';
import { FooterModule } from '../core/footer/footer.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule,
    FooterModule,
  ],
  declarations: [
    ErrorComponent,
    LoginComponent,
    FormLoginComponent,
  ], providers: [CompanyService]
})
export class AuthenticationModule {
}
