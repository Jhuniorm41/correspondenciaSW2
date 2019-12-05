import {NgModule} from '@angular/core';

import {MenuItems} from './menu-items/menu-items';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
} from './accordion';
import {MenuService} from '../core/services/menu.service';

@NgModule({
  declarations: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  exports: [
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
  ],
  providers: [MenuItems, MenuService]
})
export class SharedModule {
}
