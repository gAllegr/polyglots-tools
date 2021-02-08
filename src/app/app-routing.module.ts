import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangelogComponent } from './changelog/changelog.component';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator/gutenberg-string-comparator.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const ROUTES: Routes = [
  {
    component: GutenbergStringComparatorComponent,
    path: 'gutenberg-string-comparator'
  },
  {
    component: ChangelogComponent,
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
