import { Routes } from '@angular/router';
import { ContactosComponent } from './contactos/contactos.component';
import { EmpresasComponent } from './empresas/empresas.component';
import {AuthGuardService} from '../authentication/shared/auth-guard.service';
import { JobsComponent } from './jobs/jobs.component';
import { PersonalComponent } from './personal/personal.component';

export const ConfiguracionRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'personal',
        component: PersonalComponent,
       // canActivate: [AuthGuardService]
      },
      {
        path: 'empresa',
        component: EmpresasComponent,
       // canActivate: [AuthGuardService]
      },
      {
        path: 'contacto',
        component: ContactosComponent,
       // canActivate: [AuthGuardService]
      },
      {
        path: 'job',
        component: JobsComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];
