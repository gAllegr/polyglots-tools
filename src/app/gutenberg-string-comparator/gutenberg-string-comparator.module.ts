import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NgbAccordionModule,
  NgbPaginationModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
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
    NgbPaginationModule,
    TranslateModule.forChild(),
    GutenbergStringComparatorRoutingModule
  ]
})
export class GutenbergStringComparatorModule {}
