import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsComponent } from './settings.component';
import { SETTINGS_ROUTES } from './settings.routing';

/**
 * Module for the user settings.
 */
@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forChild(),
    RouterModule.forChild(SETTINGS_ROUTES)
  ]
})
export class SettingsModule {}
