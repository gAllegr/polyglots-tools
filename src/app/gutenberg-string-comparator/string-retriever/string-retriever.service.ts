import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError, zip } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GutenbergTranslationComparison } from '../models/gutenberg-translation-comparison.model';
import { Translation } from '../models/translation.model';

/**
 * Perform the HTTP calls to retrieve strings from translate.wordpress.org.
 */
@Injectable()
export class StringRetrieverService {
  private readonly _error$ = new Subject<string>();
  private readonly _loading$ = new BehaviorSubject<boolean>(true);
  private readonly _search$ = new Subject<GutenbergTranslationComparison[]>();

  constructor(private readonly http: HttpClient) { }

  get error$() {
    return this._error$.asObservable();
  }
  get loading$() {
    return this._loading$.asObservable();
  }
  get search$() {
    return this._search$.asObservable();
  }

  public getStrings() {
    const gutenbergStrings$ = this.getGutenbergPluginStrings('stable');
    const wordpressStrings$ = this.getLastWordPressTranslations();

    zip(gutenbergStrings$, wordpressStrings$)
      .pipe(
        tap(() => this._loading$.next(true)),
        map(response => this.getCommonStrings(response[0], response[1]))
      )
      .subscribe(
        result => this._search$.next(result),
        (error: Error) => this._error$.next(error.message)
      )
      .add(() => this._loading$.next(false));
  }

  /**
   * Perform the HTTP call to get the Gutenberg plugin strings.
   * @param project Either 'stable' or 'dev' to get rispectively the last stable version strings
   * or the next upcoming ones.
   */
  private getGutenbergPluginStrings(
    project: 'stable' | 'dev'
  ): Observable<Translation> {
    const language = 'it';
    const url = `${environment.hosts.wpTranslate}/projects/wp-plugins/gutenberg/${project}/${language}/default/export-translations/?format=ngx`;

    return this.http
      .get<Translation>(`${environment.proxy}${url}`)
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
   */
  private getLastWordPressTranslations(): Observable<Translation> {
    const language = 'it';
    const url = `${environment.hosts.wpTranslate}/projects/wp/dev/${language}/default/export-translations/?format=ngx`;

    return this.http
      .get<Translation>(`${environment.proxy}${url}`)
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
   * @param gutenbergStrings Strings obtained from the plugin.
   * @param wpCoreStrings Strings obtained from the WordPress core.
   */
  private getCommonStrings(
    gutenbergStrings: Translation,
    wpCoreStrings: Translation
  ) {
    const gutenbergKeys = Object.keys(gutenbergStrings);
    const wpCoreKeys = Object.keys(wpCoreStrings);
    const commonKeys = wpCoreKeys.filter(key => gutenbergKeys.includes(key));

    let comparison: GutenbergTranslationComparison[] = [];
    commonKeys.forEach(key => {
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
