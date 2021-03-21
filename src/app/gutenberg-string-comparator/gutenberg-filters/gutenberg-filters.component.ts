import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { StringFilters } from '../models/string-filters.model';

/**
 * Filter component for the Gutenberg string comparator tool.
 */
@Component({
  selector: 'app-gutenberg-filters',
  styleUrls: ['./gutenberg-filters.component.scss'],
  templateUrl: './gutenberg-filters.component.html'
})
export class GutenbergFiltersComponent {
  public filters: FormGroup;
  @Output() public readonly filtersUpdated = new EventEmitter<StringFilters>();

  constructor(private readonly formBuilder: FormBuilder) {
    this.filters = this.formBuilder.group({
      searchFor: this.formBuilder.control('')
    });

    this.filters.valueChanges
      .pipe(filter(() => this.filters.valid))
      .subscribe(value => {
        const SELECTED_FILTERS = value as StringFilters;
        SELECTED_FILTERS.searchFor = SELECTED_FILTERS.searchFor.toLowerCase();
        this.filtersUpdated.emit(SELECTED_FILTERS);
      });
  }
}
