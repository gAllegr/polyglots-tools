import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { GutenbergFiltersComponent } from './gutenberg-filters/gutenberg-filters.component';
import { GutenbergStringComparatorRoutingModule } from './gutenberg-string-comparator-routing.module';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator.component';
import { FilterStringsPipe } from './pipe/filter-strings.pipe';

/**
 * Module for the Gutenberg string comparator tool.
 */
@NgModule({
  declarations: [
    GutenbergStringComparatorComponent,
    GutenbergFiltersComponent,
    FilterStringsPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    VirtualScrollerModule,
    TranslateModule.forChild(),
    GutenbergStringComparatorRoutingModule
  ]
})
export class GutenbergStringComparatorModule {}
