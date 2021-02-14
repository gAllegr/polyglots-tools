import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError, zip } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { WordPressSubProject } from 'src/app/gutenberg-string-comparator/models/wp-translate-projects.type';
import { TranslateWpRoutesService } from 'src/app/gutenberg-string-comparator/services/translate-wp-routes/translate-wp-routes.service';
import { GutenbergTranslationComparison } from '../../models/gutenberg-translation-comparison.model';
import { TranslationFromWpTranslate } from '../../models/translation-from-wp-translate.model';
import { WpCoreNameProjectMapperService } from '../wp-core-name-project-mapper/wp-core-name-project-mapper.service';

/**
 * Perform the HTTP calls to retrieve strings from translate.wordpress.org.
 */
@Injectable({
  // eslint-disable-next-line unicorn/no-null
  providedIn: null
})
export class StringRetrieverService {
  private readonly _error$ = new Subject<string>();
  private readonly _loading$ = new BehaviorSubject<boolean>(true);
  private readonly _search$ = new Subject<GutenbergTranslationComparison[]>();

  constructor(
    private readonly translateWpRoutesService: TranslateWpRoutesService,
    private readonly wpCoreNameProjectMapper: WpCoreNameProjectMapperService
  ) {}

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
    zip(
      this.getGutenbergPluginStrings(),
      this.getLastWordPressTranslations(),
      this.getLastWordPressTranslations('/admin/'),
      this.getLastWordPressTranslations('/admin/network/'),
      this.getLastWordPressTranslations('/cc/')
    )
      .pipe(
        tap(() => this._loading$.next(true)),
        map(response => this.convertStringToComparisonObject(response))
      )
      .subscribe(
        result => this._search$.next(result),
        (error: Error) => this._error$.next(error.message)
      )
      .add(() => this._loading$.next(false));
  }

  /**
   * Get strings retrieved from WordPress Translate API and compare them.
   *
   * @param translationStrings The translations collection retrieved from Translate API. Will
   * contain, in this specific order: Gutenberg strings, WordPress Core main strings, WordPress
   * Core admin strings, WordPress Core admin newtwork strings and WordPress Core continents
   * and cities strings.
   * @returns {GutenbergTranslationComparison[]} The comparison object with all new strings.
   */
  private convertStringToComparisonObject(
    translationStrings: TranslationFromWpTranslate[]
  ): GutenbergTranslationComparison[] {
    const [
      GUTENBERG_STRINGS,
      WP_CORE_STRINGS,
      WP_CORE_ADMIN_STRINGS,
      WP_CORE_NETWORK_STRINGS,
      WP_CORE_CC_STRINGS
    ] = [...translationStrings];
    return [
      ...this.createWpCoreComparisonObject(
        GUTENBERG_STRINGS,
        WP_CORE_STRINGS,
        '/'
      ),
      ...this.createWpCoreComparisonObject(
        GUTENBERG_STRINGS,
        WP_CORE_ADMIN_STRINGS,
        '/admin/'
      ),
      ...this.createWpCoreComparisonObject(
        GUTENBERG_STRINGS,
        WP_CORE_NETWORK_STRINGS,
        '/admin/network/'
      ),
      ...this.createWpCoreComparisonObject(
        GUTENBERG_STRINGS,
        WP_CORE_CC_STRINGS,
        '/cc/'
      ),
      ...this.createNewStringsComparisonObject(
        GUTENBERG_STRINGS,
        WP_CORE_STRINGS,
        WP_CORE_ADMIN_STRINGS,
        WP_CORE_NETWORK_STRINGS,
        WP_CORE_CC_STRINGS
      )
    ];
  }

  /**
   * Perform the HTTP call to get the Gutenberg plugin strings.
   *
   * @returns {Observable<TranslationFromWpTranslate>} The Observable that contains the Gutenberg strings from the plugin.
   */
  private getGutenbergPluginStrings(): Observable<TranslationFromWpTranslate> {
    return this.translateWpRoutesService
      .getPluginStrings('gutenberg')
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
  private getLastWordPressTranslations(
    subproject: WordPressSubProject = '/'
  ): Observable<TranslationFromWpTranslate> {
    return this.translateWpRoutesService
      .getLastWordPressTranslations(subproject)
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
   * Compare keys from Gutenberg strings with keys from a WordPress core subproject to find strings in common.
   *
   * @param gutenbergStrings Translation of the Gutenberg plugin.
   * @param wpCoreStrings Translations of a WordPress core subproject.
   * @returns {GutenbergTranslationComparison[]} The object that compare Gutenberg strings.
   */
  private createWpCoreComparisonObject(
    gutenbergStrings: TranslationFromWpTranslate,
    wpCoreStrings: TranslationFromWpTranslate,
    wpSubproject: WordPressSubProject
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
          areEqual: gutenbergStrings[key] === wpCoreStrings[key],
          gutenberg: gutenbergStrings[key],
          isNew: false,
          original: key,
          wpCore: wpCoreStrings[key],
          wpCoreProject: this.wpCoreNameProjectMapper.getValue(wpSubproject)
        }
      ];
    });

    return comparison;
  }

  /**
   * Find new strings in Gutenberg plugin.
   *
   * @param gutenbergStrings Translation of the Gutenberg plugin.
   * @param wpCoreStrings Translations of the main WordPress core subproject.
   * @param wpCoreAdminStrings Translations of the admin WordPress core subproject.
   * @param wpCoreNetworkStrings Translations of the network WordPress core subproject.
   * @param wpCoreCcStrings Translations of the city WordPress core subproject.
   * @returns {GutenbergTranslationComparison[]} The comparison object with all new strings.
   */
  private createNewStringsComparisonObject(
    gutenbergStrings: TranslationFromWpTranslate,
    wpCoreStrings: TranslationFromWpTranslate,
    wpCoreAdminStrings: TranslationFromWpTranslate,
    wpCoreNetworkStrings: TranslationFromWpTranslate,
    wpCoreCcStrings: TranslationFromWpTranslate
  ): GutenbergTranslationComparison[] {
    const GUTENBERG_KEYS = Object.keys(gutenbergStrings);
    const NEW_KEYS = GUTENBERG_KEYS.filter(
      key =>
        !Object.keys(wpCoreStrings).includes(key) &&
        !Object.keys(wpCoreAdminStrings).includes(key) &&
        !Object.keys(wpCoreNetworkStrings).includes(key) &&
        !Object.keys(wpCoreCcStrings).includes(key)
    );
    let comparison: GutenbergTranslationComparison[] = [];
    NEW_KEYS.forEach(key => {
      comparison = [
        ...comparison,
        {
          areEqual: false,
          gutenberg: gutenbergStrings[key],
          isNew: true,
          original: key,
          wpCore: '',
          wpCoreProject: this.wpCoreNameProjectMapper.getValue(undefined)
        }
      ];
    });

    return comparison;
  }
}
