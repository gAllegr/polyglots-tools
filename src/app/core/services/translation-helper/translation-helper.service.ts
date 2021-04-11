import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LANGUAGES } from 'src/app/shared/models/languages.const';
import { environment } from 'src/environments/environment';

/**
 * Helper service to manage operations related to the language to
 * be used in the application.
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationHelperService {
  constructor(
    private readonly translate: TranslateService,
    private readonly http: HttpClient
  ) {}

  /**
   * Load the initial translation file.
   *
   * The HTTP call ensure to handle the file retrieval both on serving the application locally
   * (when the files are named like 'it-IT.json') and remotely (when the files are named
   * like 'it-IT-0.4.0-26.json).
   *
   * @returns {void} Nothing.
   */
  public loadTranslations(): void {
    const USER_LANGUAGE = navigator.language;
    const AVAILABLE_LANGUAGES = LANGUAGES.map(lang => lang.code.toLowerCase());
    let translationLanguage: string;
    if (AVAILABLE_LANGUAGES.includes(USER_LANGUAGE.toLowerCase())) {
      translationLanguage = USER_LANGUAGE;
    } else {
      const RADIX_LANGUAGE = USER_LANGUAGE.split('-')[0];
      const ALTERNATIVE_LANGUAGE = LANGUAGES.find(value =>
        value.code.includes(RADIX_LANGUAGE)
      );
      translationLanguage = ALTERNATIVE_LANGUAGE
        ? ALTERNATIVE_LANGUAGE.code
        : (environment.defaultLanguage as string);
    }

    const TRANSLATION_FILE_PATH = `assets/i18n/${translationLanguage}-${environment.app_version}.json`;
    this.http
      .get<string>(TRANSLATION_FILE_PATH)
      .pipe(
        map(() => `${translationLanguage}-${environment.app_version}`),
        catchError(() => of(`${translationLanguage}`))
      )
      .subscribe(filename => {
        this.translate.setDefaultLang(filename);
      });
  }
}
