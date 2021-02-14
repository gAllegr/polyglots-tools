import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GutenbergStringComparatorRoutingModule } from './gutenberg-string-comparator-routing.module';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator.component';
import { TranslateWpRoutesService } from './services/translate-wp-routes/translate-wp-routes.service';
import { WpCoreNameProjectMapperService } from './services/wp-core-name-project-mapper/wp-core-name-project-mapper.service';

/**
 * Module for the Gutenberg string comparator tool.
 */
@NgModule({
  declarations: [GutenbergStringComparatorComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    GutenbergStringComparatorRoutingModule
  ],
  providers: [TranslateWpRoutesService, WpCoreNameProjectMapperService]
})
export class GutenbergStringComparatorModule {}
