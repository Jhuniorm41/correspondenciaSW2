import {Injectable, OnInit} from '@angular/core';
import {MenuService} from '../../core/services/menu.service';

export interface BadgeItem {
  type: string;
  value: string;
}
export interface Saperator {
  name: string;
  type?: string;
}
export interface SubChildren {
  state: string;
  name: string;
  type?: string;
}
export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
  child?: SubChildren[];
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  saperator?: Saperator[];
  children?: ChildrenItems[];
}

const MENUITEMS = [
  // {
  //   state: '',
  //   name: 'Personal',
  //   type: 'saperator',
  //   icon: 'av_timer'
  // },
  // {
  //   state: 'dashboards',
  //   name: 'Dashboards',
  //   type: 'sub',
  //   icon: 'av_timer',
  //   children: [
  //     { state: 'dashboard1', name: 'Dashboard 1', type: 'link' },
  //     { state: 'dashboard2', name: 'Dashboard 2', type: 'link' }
  //   ]
  // },
   {
     state: 'configuracion',
     name: 'Administración',
     type: 'sub',
     icon: 'settings',
     children: [
      { state: 'empresa', name: 'Empresas', type: 'link' },
       { state: 'contacto', name: 'Prioridades', type: 'link' },
      { state: 'personal', name: 'Personales', type: 'link' },
   ]
   },
   {
    state: 'seguridad',
    name: 'Seguridad',
    type: 'sub',
    icon: 'security',
    children: [
     { state: 'recurso', name: 'Recursos', type: 'link' },
     { state: 'usuario', name: 'Usuarios', type: 'link' },
     { state: 'admToken', name: 'Adm Token', type: 'link' },
     { state: 'bitacora', name: 'Bitacora', type: 'link' }
  ]
  },
  {
    state: 'reportes',
    name: 'Seguimiento',
    type: 'sub',
    icon: 'trending_up',
    children: [
     { state: 'correspondencia', name: 'Correspondencias', type: 'link' },
    //  { state: 'reporteCliente', name: 'Reportes Clientes', type: 'link' },
    //  { state: 'reportePago', name: 'Reportes Pagos', type: 'link' },
    //  { state: 'reporteDeuda', name: 'Reportes Deudas', type: 'link' },
  ]
  }
];

@Injectable()
export class MenuItems implements OnInit {
  public items: Menu[] = [];
  public user: string;
  public sucursal: string;

  getItems() {
    return this.items;
  }

  constructor(private resourceService: MenuService) {

  }

  getMenuRecursos() {
  //  this.items = this.resourceService.getMenu();
    return MENUITEMS;
  }

  ngOnInit(): void {
  }
}
