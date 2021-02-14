import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator.component';

const ROUTES: Routes = [
  {
    component: GutenbergStringComparatorComponent,
    path: ''
  }
];

/**
 * Routes for the changelog module.
 */
@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(ROUTES)]
})
export class GutenbergStringComparatorRoutingModule {}
