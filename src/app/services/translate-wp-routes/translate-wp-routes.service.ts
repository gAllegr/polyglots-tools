import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationFromWpTranslate } from 'src/app/gutenberg-string-comparator/models/translation-from-wp.model';
import { environment } from 'src/environments/environment';

/**
 * Perform the HTTP calls to retrieve data form the WordPress Translate tool.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslateWpRoutesService {
  constructor(private readonly http: HttpClient) {}

  /**
   * Perform the HTTP call to get the Gutetranslation strings of a specific plugin.
   *
   * @param slug The slug of the plugin project.
   * @param project Either 'stable' or 'dev' to get rispectively the last stable version strings
   * or the next upcoming ones.
   * @returns {Observable<TranslationFromWpTranslate>} The Observable that contains the Gutenberg strings from the plugin.
   */
  public getPluginStrings(
    slug: string,
    project: 'stable' | 'dev' = 'stable'
  ): Observable<TranslationFromWpTranslate> {
    const LANGUAGE = 'it';
    const URL = `${environment.hosts.wpTranslate}/projects/wp-plugins/${slug}/${project}/${LANGUAGE}/default/export-translations/?format=ngx`;

    return this.http.get<TranslationFromWpTranslate>(
      `${environment.proxy}${URL}`
    );
  }

  /**
   * Perform the HTTP call to get the last WordPress Core plugin strings.
   *
   * @returns {Observable<TranslationFromWpTranslate>} The Observable that contains the WordPress Core strings.
   */
  public getLastWordPressTranslations(): Observable<TranslationFromWpTranslate> {
    const LANGUAGE = 'it';
    const URL = `${environment.hosts.wpTranslate}/projects/wp/dev/${LANGUAGE}/default/export-translations/?format=ngx`;

    return this.http.get<TranslationFromWpTranslate>(
      `${environment.proxy}${URL}`
    );
  }
}
