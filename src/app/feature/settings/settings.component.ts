import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { TranslationHelperService } from 'src/app/core/services/translation-helper/translation-helper.service';
import { LANGUAGES } from 'src/app/shared/models/languages.const';
import { Locale } from 'src/app/shared/models/locale.model';
import { Settings } from 'src/app/shared/models/settings.model';

/**
 * Page to manage user settings.
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {
  public appLanguages = LANGUAGES;
  public locales!: Locale[];
  public settings!: FormGroup;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly localStorageService: LocalStorageService,
    private readonly translateHelperService: TranslationHelperService
  ) {}

  // eslint-disable-next-line jsdoc/require-jsdoc
  public ngOnInit(): void {
    this.locales = this.activatedRoute.snapshot.data.locales as Locale[];
    this.initForm();
  }

  /**
   * Function to track locale identity on the select.
   *
   * @param locale1 The first locale.
   * @param locale2 The second locale.
   * @returns {boolean} The result of comparison.
   */
  public compareLocales(locale1: Locale, locale2: Locale): boolean {
    return locale1 && locale2 && locale1.fullCode === locale2.fullCode;
  }

  /**
   * Delete all user settings from local storage and reset form.
   *
   * @returns {void} Nothing.
   */
  public onDeleteSettings(): void {
    this.localStorageService.removeSettings();
    this.settings.patchValue({
      appLanguage: undefined,
      wpLocale: undefined
    });
  }

  /**
   * Get settings from local storage, if any, and create the form.
   *
   * @returns {void} Nothing.
   */
  private initForm(): void {
    const USER_SETTINGS = this.localStorageService.getSettings();
    this.settings = this.formBuilder.group({
      appLanguage: [USER_SETTINGS?.appLanguage],
      wpLocale: [USER_SETTINGS?.wpLocale]
    });
    this.settings.valueChanges.subscribe((selection: Settings) => {
      this.localStorageService.setSettings(selection);
      this.translateHelperService.changeLanguage(selection.appLanguage);
    });
  }
}
