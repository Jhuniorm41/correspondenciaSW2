import * as $ from 'jquery';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit,
  OnInit
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AppHeaderComponent } from './header/header.component';
import { AppSidebarComponent } from './sidebar/sidebar.component';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {ConfirmDialogComponent} from '../../commons/dialogs/confirm-dialog/confirm-dialog.component';
import {MatDialog} from '@angular/material';
import { CompanyService } from '../../core/services/company.service';
/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['full.component.css'],
  providers: [CompanyService]
})
export class FullComponent implements OnDestroy, AfterViewInit, OnInit {
  mobileQuery: MediaQueryList;
  dir = 'ltr';
  green: boolean;
  blue: boolean;
  dark: boolean;
  minisidebar: boolean;
  boxed: boolean;
  danger: boolean;
  showHide: boolean;
  sidebarOpened;
  bandera: boolean;

  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;
  name: string;

  constructor(
    private router: Router,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private matDialog: MatDialog,
    public menuItems: MenuItems,
    private companyService: CompanyService,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.bandera = false;
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit() {
  //   this.companyService.getCompanyid().subscribe(company => {
  //     this.name = company.prefijo;
  //     this.bandera = true;
  // });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {
    // This is for the topbar search
    (<any>$('.srh-btn, .cl-srh-btn')).on('click', function() {
      (<any>$('.app-search')).toggle(200);
    });
    // This is for the megamenu
  }
  getNombreEmpresa() {
    if (this.bandera === true) {
        return this.name;
    }
    return 'uniColegio';
}
  logout() {
    const logoutConfirm = this.matDialog.open(ConfirmDialogComponent, {
      panelClass: ['zero-padding'],
      // tslint:disable-next-line:max-line-length
      data: {textContent: '¿Está seguro que desea cerrar sesión?', btnConfirm: 'Confirmar', btnCancel: 'Cancelar', titleContent: 'CERRAR SESIÓN'}
    });

    logoutConfirm.afterClosed().subscribe(result => {
      if (result) {
        sessionStorage.clear();
        // window.location.reload();
        this.router.navigate(['authentication/login']);
      }
    });
  }
}
