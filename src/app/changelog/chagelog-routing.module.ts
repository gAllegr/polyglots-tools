import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangelogComponent } from './changelog.component';

const ROUTES: Routes = [
  {
    component: ChangelogComponent,
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
export class ChangelogRoutingModule {}
