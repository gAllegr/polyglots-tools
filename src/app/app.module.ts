import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { APP_ROUTES } from './app.routing';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { RouterModule } from '@angular/router';

/**
 * Function required by NgxTranslate tool to retrieve translation files.
 *
 * @param http The Angular HttpClient service to make HTTP call to translation file folder.
 * @returns {TranslateHttpLoader} The loader provided by the NgxTranslate tool.
 */
export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * Main module of the application.
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TemplateModule,
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: createTranslateLoader
      }
    }),
    RouterModule.forRoot(APP_ROUTES)
  ]
})
export class AppModule {}
