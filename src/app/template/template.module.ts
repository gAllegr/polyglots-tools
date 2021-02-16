import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

/**
 * Container module for the main parts of the application.
 */
@NgModule({
  declarations: [FooterComponent, NavbarComponent, PageNotFoundComponent],
  exports: [FooterComponent, NavbarComponent, PageNotFoundComponent],
  imports: [
    CommonModule,
    NgbCollapseModule,
    TranslateModule.forChild(),
    RouterModule.forChild([])
  ]
})
export class TemplateModule {}
