/**
 * MC4
 * Santa Cruz - Bolivia
 * project:
 * package:
 * date:    22-02-19
 * author:  fmontero
 **/
import {OnInit} from '@angular/core';

export abstract class DialogComponent implements OnInit {

  /**
   * valor por defecto para el texto de contenido del dialogo de confirmacion
   * @type {string}
   */
  public textContent: String = 'Confirmar esta acción?';

  /**
   * valor por defecto para el texto del boton de confirmacion
   * @type {string}
   */
  public btnConfirm: String = 'Confirmar';

  /**
   * valor por defecto para el texto del boton cancelar
   * @type {string}
   */
  public btnCancel: String = 'Cancelar';

   /**
   * valor por defecto para el texto del boton cancelar
   * @type {string}
   */
  public headerText: String = 'Cancelar';


  /**
   * @void configuracion de valores customizados
   */
  abstract customOnInit();

  /**
   * @return boolean, retornamos true al cerrar dialogo si se confirma el dialogo
   */
  abstract onConfirmDialog(): void;

  /**
   * @return boolean, retornamos false al cerrar dialogo si se cancela el dialogo
   */
  abstract onCancelDialog(): void;

  /**
   * @void asignacion de valores personalizados, si existiera
   */
  ngOnInit(): void {
    this.customOnInit();
  }

}
