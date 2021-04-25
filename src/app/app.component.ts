import { Component, OnInit } from '@angular/core';
import { PwaHelperService } from './core/services/pwa-helper/pwa-helper.service';
import { TranslationHelperService } from './core/services/translation-helper/translation-helper.service';

/**
 * Main component of the application. Will load the translation file.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  constructor(
    private readonly translationHelperService: TranslationHelperService,
    private readonly pwaHelperService: PwaHelperService
  ) {
    this.translationHelperService.loadTranslations();
  }

  // eslint-disable-next-line jsdoc/require-jsdoc
  public ngOnInit(): void {
    this.pwaHelperService.checkNewVersion();
  }
}
