import { Component } from '@angular/core';
import { TranslationHelperService } from './core/services/translation-helper/translation-helper.service';

/**
 * Main component of the application. Will load the translation file.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private readonly translationHelperService: TranslationHelperService
  ) {
    this.translationHelperService.loadTranslations();
  }
}
