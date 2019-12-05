import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BienvenidaComponent} from './bienvenida.component';
import {RouterModule} from '@angular/router';
import {BienvenidaRoutes} from './bienvenida.routing';
import {MatCardModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [BienvenidaComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FlexLayoutModule,
    RouterModule.forChild(BienvenidaRoutes)
  ]
})
export class BienvenidaModule { }
