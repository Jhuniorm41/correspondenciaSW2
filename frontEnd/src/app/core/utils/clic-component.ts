import {Page} from './paginator/page';
import {ChangeDetectorRef, TemplateRef, ViewChild} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {DatatableComponent} from '@swimlane/ngx-datatable';

/**
 * MC4 SRL
 * Santa Cruz - Bolivia
 * project: sfe-backoffice-ui
 * date:    09-07-19
 * author:  fmontero
 **/

/**
 *
 * ====================================================================
 * ==============================MC4-SRL===============================
 * ===========LISTENER DE CAMBIO DE DIMENSION DE PANTALLA==============
 * ===========LISTENER DE CAMBIO DE DIMENSION DE PANTALLA==============
 * ==============BASADO EN MEDIDAS DE FLEX-LAYOUT==================
 * =====https://github.com/angular/flex-layout/wiki/Responsive-API=====
 * ====================================================================
 *
 */

export abstract class ClicComponent {
  /**
   *
   * @type {Page}
   */
  public pageControl: Page = new Page();

  /**
   * @Atribute xsMatcher
   * Listener que escucha cuando la dimension de pantalla esta en el rango 0-599px
   */
  private xsMatcher: MediaQueryList; // (max-width: 599px) => xs

  /**
   * @Atribute smMatcher
   * Listener que escucha cuando la dimension de pantalla esta en el rango 600-959px
   */
  private smMatcher: MediaQueryList; // (min-width: 600px) and (max-width: 959px) => sm

  /**
   * @Atribute mdMatcher
   * Listener que escucha cuando la dimension de pantalla esta en el rango 960px-maxWidth
   */
  private mdMatcher: MediaQueryList; // (min-width: 960px) and (max-width: 1279px) => md

  /**
   * @Atribute mdMatcher
   * Listener que escucha cuando la dimension de pantalla esta en el rango 960px-maxWidth
   */
  private lgMatcher: MediaQueryList; // (min-width: 1280px) and (max-width: 1919px)

  /**
   * @Atribute mdMatcher
   * Listener que escucha cuando la dimension de pantalla esta en el rango 960px-maxWidth
   */
  private gt_lgMatcher: MediaQueryList; // (min-width: 1920px) => gt-lg

  /**
   * flag para activar scrol horizontal en tablas
   */
  public scrollH: boolean;

  /**
   * porcentaje del dialogo frente a la dimension actual de pantalla ('50%')
   */
  public dialogWidth: string;

  /**
   * porcentaje del dialogos de notificacion y confirmacion frente a la dimension actual de pantalla ('20%')
   */
  public confirmDialogWith: string;

  public render: boolean;

  @ViewChild('table') table: DatatableComponent;

  protected constructor() {
    this.render = false;
  }

  abstract setPage(pageInfo: Page);

  public initializePage(pageSize: number, execute: boolean = false) {
    this.pageControl = new Page();
    this.pageControl.content = [];
    this.pageControl.size = pageSize;
    this.pageControl.number = 0;
    const page: Page = new Page();
    page.offset = this.pageControl.number;
    // tslint:disable-next-line:curly
    if (execute) this.setPage(page);
  }
}

