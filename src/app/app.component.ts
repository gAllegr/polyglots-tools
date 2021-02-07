import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

/**
 * Main component of the application. Will load the translation file.
 */
@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(
    private readonly translate: TranslateService,
    private readonly http: HttpClient
  ) {
    this.loadTranslations();
  }

  /**
   * Load the italian translation file and set the italian as the default language.
   *
   * The HTTP call ensure to handle the file retrieval both on serving the application locally
   * (when the files are named like 'it-IT.json') and remotely (when the files are named
   * like 'it-IT-0.4.0-26.json).
   */
  private loadTranslations(): void {
    const TRANSLATION_FILE_PATH = `assets/i18n/it-IT-${environment.app_version}.json`;
    this.http
      .get<string>(TRANSLATION_FILE_PATH)
      .pipe(
        map(() => `it-IT-${environment.app_version}`),
        catchError(() => of('it-IT'))
      )
      .subscribe(filename => {
        this.translate.setDefaultLang(filename);
      });
  }
}
