import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BadgeComponent } from './badge/badge.component';
import { ChangelogRoutingModule } from './chagelog-routing.module';
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
    ChangelogRoutingModule
  ]
})
export class ChangelogModule {}
