import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { GutenbergStringComparatorRoutingModule } from './gutenberg-string-comparator-routing.module';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator.component';

/**
 * Module for the Gutenberg string comparator tool.
 */
@NgModule({
  declarations: [GutenbergStringComparatorComponent],
  imports: [
    CommonModule,
    NgbAccordionModule,
    VirtualScrollerModule,
    TranslateModule.forChild(),
    GutenbergStringComparatorRoutingModule
  ]
})
export class GutenbergStringComparatorModule {}
