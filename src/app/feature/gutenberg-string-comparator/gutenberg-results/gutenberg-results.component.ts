import { Component, EventEmitter, Input } from '@angular/core';
import {
  GutenbergTranslationComparison,
  StringFilters
} from '../../../shared/models/gutenberg-translation-comparison.model';

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
