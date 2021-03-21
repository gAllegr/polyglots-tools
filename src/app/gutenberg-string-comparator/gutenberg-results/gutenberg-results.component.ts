import { Component, EventEmitter, Input } from '@angular/core';
import { GutenbergTranslationComparison } from '../models/gutenberg-translation-comparison.model';
import { StringFilters } from '../models/string-filters.model';

/**
 * Show the lis tof retrieve Gutenberg strings.
 */
@Component({
  selector: 'app-gutenberg-results',
  styleUrls: ['./gutenberg-results.component.scss'],
  templateUrl: './gutenberg-results.component.html'
})
export class GutenbergResultsComponent {
  @Input() public strings!: GutenbergTranslationComparison[];
  @Input() public selectedFilters$!: EventEmitter<StringFilters>;
}
