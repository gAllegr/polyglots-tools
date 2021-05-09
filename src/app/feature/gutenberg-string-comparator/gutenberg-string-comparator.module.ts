import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NgbAccordionModule,
  NgbTooltipModule,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { VirtualScrollerModule } from 'ngx-virtual-scroller';
import { GutenbergComparatorServicesModule } from './gutenberg-comparator-services.module';
import { GutenbergFiltersComponent } from './gutenberg-filters/gutenberg-filters.component';
import { GutenbergResultsComponent } from './gutenberg-results/gutenberg-results.component';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator.component';
import { COMPARATOR_ROUTES } from './gutenberg-string-comparator.routing';
import { FilterStringsPipe } from './pipe/filter-strings.pipe';

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
    NgbTooltipModule,
    VirtualScrollerModule,
    ClipboardModule,
    GutenbergComparatorServicesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(COMPARATOR_ROUTES)
  ]
})
export class GutenbergStringComparatorModule {}
