import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbAccordionModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { GutenbergFiltersComponent } from './gutenberg-filters/gutenberg-filters.component';
import { GutenbergResultsComponent } from './gutenberg-results/gutenberg-results.component';
import { COMPARATOR_ROUTES } from './gutenberg-string-comparator.routing';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator.component';
import { FilterStringsPipe } from './pipe/filter-strings.pipe';
import { GutenbergComparatorServicesModule } from './gutenberg-comparator-services.module';

/**
 * Module for the Gutenberg string comparator tool.
 */
@NgModule({
  declarations: [
    GutenbergStringComparatorComponent,
    GutenbergFiltersComponent,
    GutenbergResultsComponent,
    FilterStringsPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgbTypeaheadModule,
    VirtualScrollerModule,
    GutenbergComparatorServicesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(COMPARATOR_ROUTES)
  ]
})
export class GutenbergStringComparatorModule {}
