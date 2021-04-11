import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Locale } from 'src/app/shared/models/locale.model';

/**
 * Session storage service.
 */
@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {
  private readonly _LOCALES_KEY = 'locales';

  /**
   * Get the locales saved into the session storage.
   *
   * @returns {Observable<Locale[]>} The list of locales or an error if
   * the key does not exist.
   */
  public getLocales(): Observable<Locale[]> {
    const LOCALES = sessionStorage.getItem(this._LOCALES_KEY) ?? undefined;
    return LOCALES
      ? of(JSON.parse(LOCALES) as Locale[])
      : throwError(new Error());
  }

  /**
   * Save a list of locales into the session storage.
   *
   * @param locales The list to be saved.
   * @returns {void} Nothing.
   */
  public setLocales(locales: Locale[]): void {
    sessionStorage.setItem(this._LOCALES_KEY, JSON.stringify(locales));
  }

  /**
   * Destroy the locales saved into the session storage.
   *
   * @returns {void} Nothing.
   */
  public removeLocales(): void {
    sessionStorage.removeItem(this._LOCALES_KEY);
  }
}
