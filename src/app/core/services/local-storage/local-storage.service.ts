import { Injectable } from '@angular/core';
import { Settings } from 'src/app/shared/models/settings.model';

/**
 * Local Storage service.
 */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly _SETTINGS = 'settings';

  /**
   * Get the user settings.
   *
   * @returns {Settings | undefined} The value from the local storage.
   */
  public getSettings(): Settings | undefined {
    const SETTINGS = localStorage.getItem(this._SETTINGS) ?? undefined;
    return SETTINGS ? (JSON.parse(SETTINGS) as Settings) : undefined;
  }

  /**
   * Save the user preferences into the locale storage.
   *
   * @param settings The user preferences.
   * @returns {void} Nothing.
   */
  public setSettings(settings: Settings): void {
    localStorage.setItem(this._SETTINGS, JSON.stringify(settings));
  }

  /**
   * Destroy the user settings from the local storage.
   *
   * @returns {void} Nothing.
   */
  public removeSettings(): void {
    localStorage.removeItem(this._SETTINGS);
  }
}
