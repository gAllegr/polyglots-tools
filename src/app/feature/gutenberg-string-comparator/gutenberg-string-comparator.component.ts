import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, throwError, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GutenbergTranslationComparison } from '../../shared/models/gutenberg-translation-comparison.model';
import { StringRetrieverService } from './services/string-retriever/string-retriever.service';

/**
 * Show the comparison between the Gutemberg string from the plugin and the WordPress core.
 */
@Component({
  providers: [StringRetrieverService],
  selector: 'app-gutenberg-string-comparator',
  templateUrl: './gutenberg-string-comparator.component.html'
})
export class GutenbergStringComparatorComponent implements OnInit {
  public error$ = new Subject<string>();
  public gutenbergStrings$ = new Subject<GutenbergTranslationComparison[]>();
  public loading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private readonly stringRetrieverService: StringRetrieverService
  ) {}

  // eslint-disable-next-line jsdoc/require-jsdoc
  public ngOnInit(): void {
    this.getStrings();
  }

  /**
   * Use the {@link StringRetrieverService} to collect strings from WordPress Translate.
   *
   * @returns {void} Nothing.
   */
  public getStrings(locale?: string): void {
    this.error$.next();
    this.gutenbergStrings$.next([]);
    this.loading$.next(true);
    const SUBSCRIPTION = zip(
      this.stringRetrieverService.getGutenbergPluginStrings(locale),
      this.stringRetrieverService.getLastWordPressTranslations(locale),
      this.stringRetrieverService.getLastWordPressTranslations(
        locale,
        '/admin/'
      ),
      this.stringRetrieverService.getLastWordPressTranslations(
        locale,
        '/admin/network/'
      ),
      this.stringRetrieverService.getLastWordPressTranslations(locale, '/cc/')
    )
      .pipe(
        map(response => {
          const STRINGS = this.stringRetrieverService.convertStringToComparisonObject(
            response
          );
          this.gutenbergStrings$.next(STRINGS);
          this.error$.next();
          this.loading$.next(false);
          return STRINGS;
        }),
        catchError((error: Error) => {
          this.gutenbergStrings$.next([]);
          this.error$.next(error.message);
          this.loading$.next(false);
          return throwError(error);
        })
      )
      .subscribe()
      .add(() => SUBSCRIPTION.unsubscribe());
  }
}
