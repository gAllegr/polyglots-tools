import { Component, EventEmitter, Input } from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
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

  /**
   * Close a tooltip after half a second.
   *
   * @param tooltip The tooltip to be closed.
   * @returns {void} Nothing.
   */
  public closeTooltipOnTimeout(tooltip: NgbTooltip): void {
    const TIME_TO_WAIT = 800;
    setTimeout(() => {
      tooltip.close();
    }, TIME_TO_WAIT);
  }
}
