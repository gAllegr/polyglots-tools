import { Routes } from '@angular/router';
import { LocaleResolver } from 'src/app/core/resolvers/locale/locale.resolver';
import { SettingsComponent } from './settings.component';

export const SETTINGS_ROUTES: Routes = [
  {
    component: SettingsComponent,
    path: '',
    resolve: {
      locales: LocaleResolver
    }
  }
];
