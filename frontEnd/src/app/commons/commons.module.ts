import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmDialogComponent} from './dialogs/confirm-dialog/confirm-dialog.component';
import { MatButtonModule, MatCardModule, MatInputModule, MatIcon, MatIconModule, MatFormFieldModule } from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputDialogComponent} from './dialogs/input-dialog/input-dialog.component';
import { ProfileComponent } from './dialogs/profile/profile.component';
import { DialogClassicComponent } from './dialogs/dialog/dialog-classic.component';


@NgModule({
  declarations: [ConfirmDialogComponent, InputDialogComponent, ProfileComponent, DialogClassicComponent],
  imports: [
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  entryComponents: [ConfirmDialogComponent, InputDialogComponent, ProfileComponent, DialogClassicComponent],
  exports: []
})
export class CommonsModule { }
