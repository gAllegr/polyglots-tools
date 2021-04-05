import { Pipe, PipeTransform } from '@angular/core';
import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { GutenbergTranslationComparison } from '../models/gutenberg-translation-comparison.model';
import { StringFilters } from '../models/string-filters.model';
import { TranslationStatus } from '../models/translation-status.type';
import { WpCoreSubprojectNames } from '../models/wp-translate-projects.type';

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
    filters: StringFilters | null,
    scroll: VirtualScrollerComponent
  ): GutenbergTranslationComparison[] {
    scroll.viewPortItems = [];
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    scroll.scrollToIndex(0);
    let strings = [...value];

    if (filters) {
      strings = [...this.filterByTranslationStatus(strings, filters.status)];
      strings = [...this.filterBySubProject(strings, filters.subproject)];
      strings = [...this.filterByText(strings, filters.searchFor)];
    }

    return strings;
  }

  /**
   * Return all Gutenberg strings with the requested status.
   *
   * @param strings The list of Gutenberg strings.
   * @param status The requested status.
   * @returns {GutenbergTranslationComparison[]} The list of strings that match the request.
   */
  private filterByTranslationStatus(
    strings: GutenbergTranslationComparison[],
    status: TranslationStatus | undefined
  ): GutenbergTranslationComparison[] {
    return status
      ? strings.filter(singleString => singleString.status === status)
      : strings;
  }

  /**
   * Search all Gutenberg strings that belongs to the requested subproject.
   *
   * @param strings The list of Gutenberg strings.
   * @param project The requested project.
   * @returns {GutenbergTranslationComparison[]} The list of strings that match the request.
   */
  private filterBySubProject(
    strings: GutenbergTranslationComparison[],
    project: WpCoreSubprojectNames | undefined
  ): GutenbergTranslationComparison[] {
    return project
      ? strings.filter(singleString => singleString.wpCoreProject === project)
      : strings;
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
