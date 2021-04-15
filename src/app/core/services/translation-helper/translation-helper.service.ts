import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { LANGUAGES } from 'src/app/shared/models/languages.const';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage/local-storage.service';

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
    private readonly http: HttpClient,
    private readonly localStorageService: LocalStorageService
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
    const TRANSLATION_LANGUAGE = this.getLanguageToUse();
    const TRANSLATION_FILE_PATH = `assets/i18n/${TRANSLATION_LANGUAGE}-${environment.app_version}.json`;
    this.http
      .get<string>(TRANSLATION_FILE_PATH)
      .pipe(
        map(() => `${TRANSLATION_LANGUAGE}-${environment.app_version}`),
        catchError(() => of(`${TRANSLATION_LANGUAGE}`))
      )
      .subscribe(filename => {
        this.translate.setDefaultLang(filename);
      });
  }

  /**
   * Change to language used in the application. If none is provided, retrieve
   * the language to be used in the same way at application load.
   *
   * @param language The language to be used.
   * @returns {void} Nothing.
   */
  public changeLanguage(language?: string): void {
    const LANGUAGE_TO_USE = language ?? this.getLanguageToUse();
    this.translate.use(LANGUAGE_TO_USE);
  }

  /**
   * Check if user settings contains a preference, otherwise fallback on browser language.
   * If none is supported, fallback to default language for the application.
   *
   * @returns {string} The language code to be used.
   */
  private getLanguageToUse(): string {
    const USER_LANGUAGE =
      this.localStorageService.getSettings()?.appLanguage ?? navigator.language;
    const AVAILABLE_LANGUAGES = LANGUAGES.map(lang => lang.code.toLowerCase());

    if (AVAILABLE_LANGUAGES.includes(USER_LANGUAGE.toLowerCase())) {
      return USER_LANGUAGE;
    }

    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    const RADIX_LANGUAGE = USER_LANGUAGE.split('-')[0];
    const ALTERNATIVE_LANGUAGE = LANGUAGES.find(value =>
      value.code.includes(RADIX_LANGUAGE)
    );
    return ALTERNATIVE_LANGUAGE
      ? ALTERNATIVE_LANGUAGE.code
      : environment.defaultLanguage;
  }
}
