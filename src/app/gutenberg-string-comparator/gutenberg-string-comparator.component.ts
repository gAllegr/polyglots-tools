import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GutenbergTranslationComparison } from './models/gutenberg-translation-comparison.model';
import { StringFilters } from './models/string-filters.model';
import { StringRetrieverService } from './services/string-retriever/string-retriever.service';

/**
 * Show the comparison between the Gutemberg string from the plugin and the WordPress core.
 */
@Component({
  providers: [StringRetrieverService],
  selector: 'app-gutenberg-string-comparator',
  styleUrls: ['./gutenberg-string-comparator.component.scss'],
  templateUrl: './gutenberg-string-comparator.component.html'
})
export class GutenbergStringComparatorComponent implements OnInit {
  public busy$: Observable<boolean>;
  public errorMessage$: Observable<string>;
  public gutenbergStrings$: Observable<GutenbergTranslationComparison[]>;
  public selectedFilters: StringFilters | undefined;

  constructor(private readonly stringRetrieverService: StringRetrieverService) {
    this.busy$ = this.stringRetrieverService.loading$;
    this.errorMessage$ = this.stringRetrieverService.error$;
    this.gutenbergStrings$ = this.stringRetrieverService.search$;
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public ngOnInit(): void {
    this.getStrings();
  }

  /**
   * Use the {@link StringRetrieverService} to collect strings from WordPress Translate.
   *
   * @returns {void} Nothing.
   */
  public getStrings(): void {
    this.stringRetrieverService.getStrings();
  }

  /**
   * Invoked when the user modify the search params.
   *
   * @param filters The values selected by the user.
   * @returns {void} Nothing.
   */
  public onSelectedFilters(filters: StringFilters): void {
    this.selectedFilters = filters;
  }
}
