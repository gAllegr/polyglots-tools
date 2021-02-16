import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './template/page-not-found/page-not-found.component';

const ROUTES: Routes = [
  {
    loadChildren: () =>
      import(
        './gutenberg-string-comparator/gutenberg-string-comparator.module'
      ).then(m => m.GutenbergStringComparatorModule),
    path: 'gutenberg-string-comparator'
  },
  {
    loadChildren: () =>
      import('./changelog/changelog.module').then(m => m.ChangelogModule),
    path: 'changelog'
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

/**
 * Main routes of the application.
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(ROUTES)]
})
export class AppRoutingModule {}
