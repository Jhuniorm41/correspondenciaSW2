import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AppBlankComponent } from './layouts/blank/blank.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
    {
      path: '',
      redirectTo: '/bienvenida',
      pathMatch: 'full'
    },
    {
      path: 'bienvenida',
      loadChildren: './bienvenida/bienvenida.module#BienvenidaModule'
    },
      {
        path: 'configuracion',
        loadChildren: './configuracion/configuracion.module#ConfiguracionModule'
      },
      {
        path: 'seguridad',
        loadChildren: './seguridad/seguridad.module#SeguridadModule'
      },
      {
        path: 'reportes',
        loadChildren: './reportes/reportes.module#ReporteModule'
      }
    ]
  },
  {
    path: '',
    component: AppBlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren:
          './authentication/authentication.module#AuthenticationModule'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'authentication/404'
  }
];
