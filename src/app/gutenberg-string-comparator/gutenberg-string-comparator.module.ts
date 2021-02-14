import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { GutenbergStringComparatorRoutingModule } from './gutenberg-string-comparator-routing.module';
import { GutenbergStringComparatorComponent } from './gutenberg-string-comparator.component';

/**
 * Module for the Gutenberg string comparator tool.
 */
@NgModule({
  declarations: [GutenbergStringComparatorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild(),
    GutenbergStringComparatorRoutingModule
  ]
})
export class GutenbergStringComparatorModule {}
