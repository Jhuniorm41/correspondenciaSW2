import { Routes } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RecursosComponent } from './recursos/recursos.component';
import { BitacoraComponent } from './bitacora/bitacora.component';
import { AdmTokenComponent } from './adm-token/adm-token.component';
import {AuthGuardService} from '../authentication/shared/auth-guard.service';

export const SeguridadRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'usuario',
        component: UsuariosComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'recurso',
        component: RecursosComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'bitacora',
        component: BitacoraComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'admToken',
        component: AdmTokenComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];
