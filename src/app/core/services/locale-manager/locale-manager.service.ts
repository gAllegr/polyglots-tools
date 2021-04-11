import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Locale } from 'src/app/shared/models/locale.model';
import { SessionStorageService } from '../session-storage/session-storage.service';
import { TranslateWpRoutesService } from '../translate-wp-routes/translate-wp-routes.service';

/**
 * Service to manage Locales from Translate WordPress.
 */
@Injectable({
  providedIn: 'root'
})
export class LocaleManagerService {
  constructor(
    private readonly translateWpRoutesService: TranslateWpRoutesService,
    private readonly sessionStorageService: SessionStorageService
  ) {}

  /**
   * Retrieve the list of locales either from the session storage or
   * from Translate Wordpress page. In the latter case, it will save
   * the result into the session storage for the next usage.
   *
   * @returns {Observable<Locale[]>} An observable containing the locales
   * or an empty array if some error occurs.
   */
  public getLocales(): Observable<Locale[]> {
    return this.sessionStorageService.getLocales().pipe(
      catchError(() => {
        return this.translateWpRoutesService.getWpTranslatePage().pipe(
          map(htmlPage => {
            const LOCALES = this.extractLocales(htmlPage).sort((a, b) =>
              // eslint-disable-next-line @typescript-eslint/no-magic-numbers
              a.code > b.code ? 1 : -1
            );
            this.sessionStorageService.setLocales(LOCALES);
            return LOCALES;
          }),
          catchError(() => {
            this.sessionStorageService.removeLocales();
            return of([] as Locale[]);
          })
        );
      })
    );
  }

  /**
   * Get the locales listed into the page.
   *
   * @param htmlPage The htmlPage of Translate.
   * @returns {Locale[]} The obtained list of locales.
   */
  private extractLocales(htmlPage: string): Locale[] {
    let locales: Locale[] = [];
    const FIRST_ELEMENT = 0;
    const CODE_INDEX = 4;
    Array.from(
      new DOMParser()
        .parseFromString(htmlPage, 'text/html')
        .getElementsByClassName('locale')
    ).forEach(localeTag => {
      const LOCALE_LINK_ELEMENT = localeTag
        .getElementsByClassName('native')
        ?.item(FIRST_ELEMENT)
        ?.getElementsByTagName('a')
        .item(FIRST_ELEMENT);
      const NAME = LOCALE_LINK_ELEMENT?.innerText;
      const CODE = LOCALE_LINK_ELEMENT?.href.split('/')[CODE_INDEX];
      const FULL_CODE = localeTag
        .getElementsByClassName('code')
        ?.item(FIRST_ELEMENT)
        ?.getElementsByTagName('a')
        .item(FIRST_ELEMENT)?.innerText;
      locales =
        NAME && CODE && FULL_CODE
          ? [...locales, new Locale(NAME, CODE, FULL_CODE)]
          : [...locales];
    });
    return locales;
  }
}
