import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { UpdateAvailableComponent } from './components/update-available/update-available/update-available.component';

/**
 * Container module for classes needed in the whole application.
 */
@NgModule({
  declarations: [UpdateAvailableComponent],
  exports: [UpdateAvailableComponent],
  imports: [TranslateModule.forChild()]
})
export class SharedModule {}
