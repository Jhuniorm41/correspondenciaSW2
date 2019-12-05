import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner.component';
import { CommonsModule } from './commons/commons.module';
import { NotificationsModule } from './core/notifications/notifications.module';
import {httpInterceptorProvider} from './core/interceptors';
import {JwtModule} from '@auth0/angular-jwt';
import {HttpStatus} from './core/shared/utils/http-util/http-status';
import { dateFormatProvider } from './core/utils/providers/date-format.provider';
import { FooterModule } from './core/footer/footer.module';
import { MatPaginatorIntl, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatPaginatorIntlCas } from './core/utils/custom-util/mat-table-paginator';
import { ApiService } from './core/services/api-service/api.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};
export function tokenGetter() {
  const data = JSON.parse(sessionStorage.getItem('token'));
  // tslint:disable-next-line:curly
  if (data) return data;
  return null;
}
@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppBlankComponent,
    AppSidebarComponent,
  ],
  imports: [
    CommonsModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    PerfectScrollbarModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    NotificationsModule,
    FooterModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      }
    }),
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    ApiService,
    httpInterceptorProvider,
    HttpStatus,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCas
    },
    dateFormatProvider
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
