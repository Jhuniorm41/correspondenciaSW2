import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessComponent } from './component/success.component';
import {MatCardModule, MatIconModule, MatSnackBarModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FailedComponent} from './component/failed.component';
import {HttpStatus} from '../utils/http-util/http-status';
import { WarningComponent } from './component/warning.component';

@NgModule({
  declarations: [SuccessComponent, FailedComponent, WarningComponent],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    FlexLayoutModule
  ],
  entryComponents: [SuccessComponent, FailedComponent, WarningComponent],
  providers: [HttpStatus]
})
export class NotificationsModule { }
