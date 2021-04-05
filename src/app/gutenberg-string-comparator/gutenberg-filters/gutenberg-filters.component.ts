import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { StringFilters } from '../models/string-filters.model';
import {
  TRANSLATION_STATUS,
  TranslationStatus
} from '../models/translation-status.type';
import {
  WP_CORE_SUBPROJECTS,
  WpCoreSubprojectNames
} from '../models/wp-translate-projects.type';

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
  public subProjectSelection: WpCoreSubprojectNames[];
  public subProjectAllValue: string;
  public translationStatus: TranslationStatus[];
  public translationStatusAllValue: string;

  constructor(private readonly formBuilder: FormBuilder) {
    this.subProjectSelection = WP_CORE_SUBPROJECTS;
    this.subProjectAllValue =
      'GUTENBERG_STRING_COMPARATOR.FILTERS.SUB_PROJECTS.ALL_VALUE';
    this.translationStatus = TRANSLATION_STATUS;
    this.translationStatusAllValue =
      'GUTENBERG_STRING_COMPARATOR.FILTERS.TRANSLATION_STATUS.ALL_VALUE';
    this.filters = this.formBuilder.group({
      searchFor: this.formBuilder.control(''),
      status: this.formBuilder.control(
        this.translationStatusAllValue,
        Validators.required
      ),
      subproject: this.formBuilder.control(
        this.subProjectAllValue,
        Validators.required
      )
    });

    this.filters.valueChanges
      .pipe(filter(() => this.filters.valid))
      .subscribe((value: StringFilters) =>
        this.fineTuneValuesAndUpdateParent(value)
      );
  }

  /**
   * When the user change some values, get them and then update parent component.
   *
   * @param selectedFilters The filtering values selected by the user.
   * @returns {void} Nothing.
   */
  private fineTuneValuesAndUpdateParent(selectedFilters: StringFilters): void {
    selectedFilters.searchFor = selectedFilters.searchFor.toLowerCase();
    selectedFilters.status =
      selectedFilters.status === this.translationStatusAllValue
        ? undefined
        : selectedFilters.status;
    selectedFilters.subproject =
      selectedFilters.subproject === this.subProjectAllValue
        ? undefined
        : selectedFilters.subproject;
    this.filtersUpdated.emit(selectedFilters);
  }
}
