import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';

export const APP_ROUTES: Routes = [
  {
    loadChildren: () =>
      import(
        './feature/gutenberg-string-comparator/gutenberg-string-comparator.module'
      ).then(m => m.GutenbergStringComparatorModule),
    path: 'gutenberg-string-comparator'
  },
  {
    loadChildren: () =>
      import('./feature/changelog/changelog.module').then(
        m => m.ChangelogModule
      ),
    path: 'changelog'
  },
  {
    loadChildren: () =>
      import('./feature/settings/settings.module').then(m => m.SettingsModule),
    path: 'settings'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'gutenberg-string-comparator'
  },
  {
    component: PageNotFoundComponent,
    path: '**'
  }
];
