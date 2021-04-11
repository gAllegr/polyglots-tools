import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeComponent } from './badge/badge.component';
import { CHANGELOG_ROUTES } from './chagelog.routing';
import { ChangelogComponent } from './changelog.component';

/**
 * Module for the changelog of the application.
 */
@NgModule({
  declarations: [ChangelogComponent, BadgeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    RouterModule.forChild(CHANGELOG_ROUTES)
  ]
})
export class ChangelogModule {}
