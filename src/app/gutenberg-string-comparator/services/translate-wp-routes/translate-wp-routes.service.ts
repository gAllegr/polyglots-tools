import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationFromWpTranslate } from 'src/app/gutenberg-string-comparator/models/translation-from-wp-translate.model';
import { environment } from 'src/environments/environment';
import {
  PluginProject,
  WordPressSubProject
} from '../../models/wp-translate-projects.type';

/**
 * Perform the HTTP calls to retrieve data form the WordPress Translate tool.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslateWpRoutesService {
  constructor(private readonly http: HttpClient) { }

  /**
   * Perform the HTTP call to get the HTML code of the WordPress main Translate page.
   *
   * @returns {Observable<string>} The HTML code of the page.
   */
  public getWpTranslatePage(): Observable<string> {
    const URL = environment.hosts.wpTranslate;
    return this.http.get(URL, {
      responseType: 'text'
    });
  }

  /**
   * Perform the HTTP call to get the translation strings of a specific plugin.
   *
   * @param slug The slug of the plugin project.
   * @param project Either 'stable' or 'dev' to get rispectively the last stable version strings
   * or the next upcoming ones.
   * @returns {Observable<TranslationFromWpTranslate>} The Observable that contains the Gutenberg strings from the plugin.
   */
  public getPluginStrings(
    slug: string,
    project: PluginProject,
    locale?: string
  ): Observable<TranslationFromWpTranslate> {
    const LOCALE = locale ?? 'it';
    const URL = `${environment.hosts.wpTranslate}/projects/wp-plugins/${slug}/${project}/${LOCALE}/default/export-translations/?format=ngx`;

    return this.http.get<TranslationFromWpTranslate>(
      `${environment.proxy}${URL}`
    );
  }

  /**
   * Perform the HTTP call to get the last WordPress Core plugin strings.
   *
   * @returns {Observable<TranslationFromWpTranslate>} The Observable that contains the WordPress Core strings.
   */
  public getLastWordPressTranslations(
    subproject: WordPressSubProject,
    locale?: string
  ): Observable<TranslationFromWpTranslate> {
    const LOCALE = locale ?? 'it';
    const URL = `${environment.hosts.wpTranslate}/projects/wp/dev${subproject}${LOCALE}/default/export-translations/?format=ngx`;

    return this.http.get<TranslationFromWpTranslate>(
      `${environment.proxy}${URL}`
    );
  }
}
