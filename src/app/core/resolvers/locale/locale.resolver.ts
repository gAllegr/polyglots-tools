import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Locale } from 'src/app/shared/models/locale.model';
import { LocaleManagerService } from '../../services/locale-manager/locale-manager.service';

/**
 * Resolver to get the list of locales from Translate WordPress.
 */
@Injectable({
  providedIn: 'root'
})
export class LocaleResolver implements Resolve<Locale[]> {
  constructor(private readonly localManagerService: LocaleManagerService) {}

  /**
   * Get the list of locales from Translate WordPress.
   *
   * @returns {Observable<Locale[]>} The list of locales.
   */
  public resolve(): Observable<Locale[]> {
    return this.localManagerService.getLocales();
  }
}
