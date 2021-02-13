import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError, zip } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GutenbergTranslationComparison } from '../models/gutenberg-translation-comparison.model';
import { TranslationFromWpTranslate } from '../models/translation.model';

/**
 * Perform the HTTP calls to retrieve strings from translate.wordpress.org.
 */
@Injectable({
  providedIn: 'root'
})
export class StringRetrieverService {
  private readonly _error$ = new Subject<string>();
  private readonly _loading$ = new BehaviorSubject<boolean>(true);
  private readonly _search$ = new Subject<GutenbergTranslationComparison[]>();

  constructor(private readonly http: HttpClient) {}

  /**
   * Get the Observable that keeps track of errors.
   *
   * @returns {Observable<string>} Get the error observable.
   */
  public get error$(): Observable<string> {
    return this._error$.asObservable();
  }

  /**
   * Get the Observable that keeps track of the loading state.
   *
   * @returns {Observable<boolean>} Get the loading observable.
   */
  public get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  /**
   * Get the Observable that keeps track of the search operations.
   *
   * @returns {Observable<GutenbergTranslationComparison[]>} Get the search observable.
   */
  public get search$(): Observable<GutenbergTranslationComparison[]> {
    return this._search$.asObservable();
  }

  /**
   * Manage the HTTP calls to get strings related to Gutenberg plugin from projects on the Translate platform.
   *
   * @returns {void} Nothing.
   */
  public getStrings(): void {
    const GUTENBERG_STRINGS$ = this.getGutenbergPluginStrings('stable');
    const WORDPRESS_STRINGS$ = this.getLastWordPressTranslations();

    zip(GUTENBERG_STRINGS$, WORDPRESS_STRINGS$)
      .pipe(
        tap(() => this._loading$.next(true)),
        map(response => {
          const GUTENBERG_STRINGS_INDEX = 0;
          const WP_CORE_STRINGS_INDEX = 1;
          return this.getCommonStrings(
            response[GUTENBERG_STRINGS_INDEX],
            response[WP_CORE_STRINGS_INDEX]
          );
        })
      )
      .subscribe(
        result => this._search$.next(result),
        (error: Error) => this._error$.next(error.message)
      )
      .add(() => this._loading$.next(false));
  }

  /**
   * Perform the HTTP call to get the Gutenberg plugin strings.
   *
   * @param project Either 'stable' or 'dev' to get rispectively the last stable version strings
   * or the next upcoming ones.
   * @returns {Observable<TranslationFromWpTranslate>} The Observable that contains the Gutenberg strings from the plugin.
   */
  private getGutenbergPluginStrings(
    project: 'stable' | 'dev'
  ): Observable<TranslationFromWpTranslate> {
    const LANGUAGE = 'it';
    const URL = `${environment.hosts.wpTranslate}/projects/wp-plugins/gutenberg/${project}/${LANGUAGE}/default/export-translations/?format=ngx`;

    return this.http
      .get<TranslationFromWpTranslate>(`${environment.proxy}${URL}`)
      .pipe(
        catchError(() =>
          throwError(
            new Error(
              'GUTENBERG_STRING_COMPARATOR.ERRORS.CANNOT_GET_PLUGIN_STRINGS'
            )
          )
        )
      );
  }

  /**
   * Perform the HTTP call to get the last WordPress Core plugin strings.
   *
   * @returns {Observable<TranslationFromWpTranslate>} The Observable that contains the WordPress Core strings.
   */
  private getLastWordPressTranslations(): Observable<TranslationFromWpTranslate> {
    const LANGUAGE = 'it';
    const URL = `${environment.hosts.wpTranslate}/projects/wp/dev/${LANGUAGE}/default/export-translations/?format=ngx`;

    return this.http
      .get<TranslationFromWpTranslate>(`${environment.proxy}${URL}`)
      .pipe(
        catchError(() =>
          throwError(
            new Error(
              'GUTENBERG_STRING_COMPARATOR.ERRORS.CANNOT_GET_WORDPRESS_STRINGS'
            )
          )
        )
      );
  }

  /**
   * Get the strings in common between the retrieved objects.
   *
   * @param gutenbergStrings Strings obtained from the plugin.
   * @param wpCoreStrings Strings obtained from the WordPress core.
   * @returns {GutenbergTranslationComparison[]} The object that compare Gutenberg strings.
   */
  private getCommonStrings(
    gutenbergStrings: TranslationFromWpTranslate,
    wpCoreStrings: TranslationFromWpTranslate
  ): GutenbergTranslationComparison[] {
    const GUTENBERG_KEYS = Object.keys(gutenbergStrings);
    const WP_CORE_KEYS = Object.keys(wpCoreStrings);
    const COMMON_KEYS = WP_CORE_KEYS.filter(key =>
      GUTENBERG_KEYS.includes(key)
    );

    let comparison: GutenbergTranslationComparison[] = [];
    COMMON_KEYS.forEach(key => {
      comparison = [
        ...comparison,
        {
          gutenberg: gutenbergStrings[key],
          original: key,
          wpCore: wpCoreStrings[key]
        }
      ];
    });

    return comparison;
  }
}
