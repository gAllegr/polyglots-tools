import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BadgeComponent } from './changelog/badge/badge.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { FooterComponent } from './footer/footer.component';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator/gutenberg-string-comparator.component';
import { StringRetrieverService } from './gutenberg-string-comparator/string-retriever/string-retriever.service';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// tslint:disable-next-line: completed-docs
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavbarComponent,
    GutenbergStringComparatorComponent,
    PageNotFoundComponent,
    FooterComponent,
    ChangelogComponent,
    BadgeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        deps: [HttpClient],
        provide: TranslateLoader,
        useFactory: createTranslateLoader
      }
    }),
    AppRoutingModule
  ],
  providers: [StringRetrieverService]
})
export class AppModule {}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
