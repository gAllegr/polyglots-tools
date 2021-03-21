import { Pipe, PipeTransform } from '@angular/core';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { GutenbergTranslationComparison } from '../models/gutenberg-translation-comparison.model';
import { StringFilters } from '../models/string-filters.model';

/**
 * Filter Gutenberg strings based on filters selected by the user.
 *
 * Before starting filtering option, reset the virtual scroll viewport item
 * list to prevent an height recalculation problem. For this problem case,
 * I referenced this VirtualScroller
 * [GitHub issue]{@link https://github.com/rintoj/ngx-virtual-scroller/issues/330#issuecomment-494274880}.
 */
@Pipe({
  name: 'filterStrings'
})
export class FilterStringsPipe implements PipeTransform {
  // eslint-disable-next-line jsdoc/require-jsdoc
  public transform(
    value: GutenbergTranslationComparison[],
    filters: StringFilters | undefined,
    scroll: VirtualScrollerComponent
  ): GutenbergTranslationComparison[] {
    scroll.viewPortItems = [];
    let filteredStrings = [...value];

    if (filters) {
      filteredStrings = [
        ...this.filterByText(filteredStrings, filters.searchFor)
      ];
    }

    return filteredStrings;
  }

  /**
   * Search all Gutenberg strings that contains the requested text.
   *
   * @param strings The list of Gutenberg strings.
   * @param searchText The requested text.
   * @returns {GutenbergTranslationComparison[]} The list of strings that match the request.
   */
  private filterByText(
    strings: GutenbergTranslationComparison[],
    searchText: string
  ): GutenbergTranslationComparison[] {
    return searchText === ''
      ? strings
      : strings.filter(
          singleString =>
            singleString.original?.toLowerCase().includes(searchText) ||
            singleString.wpCore?.toLowerCase().includes(searchText) ||
            singleString.gutenberg?.toLowerCase().includes(searchText)
        );
  }
}
