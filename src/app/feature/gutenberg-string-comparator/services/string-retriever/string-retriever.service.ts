import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TranslateWpRoutesService } from 'src/app/core/services/translate-wp-routes/translate-wp-routes.service';
import {
  TranslationFromWpTranslate,
  WordPressSubProject
} from 'src/app/shared/models/wp-translate-projects.model';
import { WpCoreNameProjectMapperService } from '../../../../core/services/wp-core-name-project-mapper/wp-core-name-project-mapper.service';
import { GutenbergTranslationComparison } from '../../../../shared/models/gutenberg-translation-comparison.model';
import { GutenbergComparatorServicesModule } from '../../gutenberg-comparator-services.module';

/**
 * Perform the HTTP calls to retrieve strings from translate.wordpress.org.
 */
@Injectable({
  providedIn: GutenbergComparatorServicesModule
})
export class StringRetrieverService {
  constructor(
    private readonly translateWpRoutesService: TranslateWpRoutesService,
    private readonly wpCoreNameProjectMapper: WpCoreNameProjectMapperService
  ) {}

  /**
   * Perform the HTTP call to get the Gutenberg plugin strings.
   *
   * @returns {Observable<TranslationFromWpTranslate>} The Observable that contains the Gutenberg strings from the plugin.
   */
  public getGutenbergPluginStrings(
    locale?: string
  ): Observable<TranslationFromWpTranslate> {
    return this.translateWpRoutesService
      .getPluginStrings('gutenberg', 'stable', locale)
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
  public getLastWordPressTranslations(
    locale?: string,
    subproject: WordPressSubProject = '/'
  ): Observable<TranslationFromWpTranslate> {
    return this.translateWpRoutesService
      .getLastWordPressTranslations(subproject, locale)
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
   * Get strings retrieved from WordPress Translate API and compare them.
   *
   * @param translationStrings The translations collection retrieved from Translate API. Will
   * contain, in this specific order: Gutenberg strings, WordPress Core main strings, WordPress
   * Core admin strings, WordPress Core admin newtwork strings and WordPress Core continents
   * and cities strings.
   * @returns {GutenbergTranslationComparison[]} The comparison object with all new strings.
   */
  public convertStringToComparisonObject(
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
      const ARE_EQUAL = gutenbergStrings[key] === wpCoreStrings[key];
      comparison = [
        ...comparison,
        {
          areEqual: ARE_EQUAL,
          gutenberg: gutenbergStrings[key],
          isNew: false,
          original: key,
          status: ARE_EQUAL
            ? 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.EQUAL'
            : 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.DIFFERENT',
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
          status: 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.NEW',
          wpCore: '',
          wpCoreProject: this.wpCoreNameProjectMapper.getValue(undefined)
        }
      ];
    });

    return comparison;
  }
}
