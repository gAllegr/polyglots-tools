/* eslint-disable @typescript-eslint/no-invalid-this */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { LocaleManagerService } from 'src/app/core/services/locale-manager/locale-manager.service';
import {
  StringFilters,
  TRANSLATION_STATUS
} from 'src/app/shared/models/gutenberg-translation-comparison.model';
import { Locale } from 'src/app/shared/models/locale.model';
import { WP_CORE_SUBPROJECTS } from '../../../shared/models/wp-translate-projects.model';

/**
 * Filter component for the Gutenberg string comparator tool.
 */
@Component({
  selector: 'app-gutenberg-filters',
  templateUrl: './gutenberg-filters.component.html'
})
export class GutenbergFiltersComponent {
  public filters: FormGroup;
  @Output() public readonly filtersUpdated = new EventEmitter<StringFilters>();
  @Output() public readonly localeUpdated = new EventEmitter<Locale>();
  public subProjectSelection = WP_CORE_SUBPROJECTS;
  public subProjectAllValue =
    'GUTENBERG_STRING_COMPARATOR.FILTERS.SUB_PROJECTS.ALL_VALUE';
  public translationStatus = TRANSLATION_STATUS;
  public translationStatusAllValue =
    'GUTENBERG_STRING_COMPARATOR.FILTERS.TRANSLATION_STATUS.ALL_VALUE';
  public usedLocale: Locale = new Locale('Italiano', 'it', 'it-IT');

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly localeManagerService: LocaleManagerService
  ) {
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

  /**
   * Invoked when the user select a {@link Locale} among the
   * available ones. Will patch the selection into the form.
   *
   * @param event The user-selected locale.
   * @returns {void} Nothing.
   */
  public localeChanged(event: Locale): void {
    this.usedLocale = event;
    this.localeUpdated.emit(event);
  }

  /**
   * Given a possible selecteable Locale element, generate
   * an equivalent string to be displayed to the user.
   *
   * @param result The {@link Locale} object to be diplayed.
   * @returns {string} The equivalent content to be displayed
   * in the input HTML element.
   */
  public inputFormatter(result: Locale): string {
    return `${result.code} - ${result.name}`;
  }

  /**
   * Convert a stream of text to a stream of array with possible
   * selectable values.
   *
   * @param text$ The string stream typed into the input element.
   * @returns {Locale[]} The list of possible selectable values.
   */
  public searchLocales: OperatorFunction<string, readonly Locale[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term =>
        this.localeManagerService
          .getLocales()
          .pipe(map(locales => this.filterLocales(term, locales)))
      )
    );

  /**
   * Filter the list of Locales to get only ones that matches the
   * searched text.
   *
   * @param term The searched text.
   * @param locales The full list of locales.
   * @returns {Locale[]} The filtered list of Locales.
   */
  private filterLocales(term: string, locales: Locale[]): Locale[] {
    const NORMALIZED_TERM = term.toLowerCase();
    return locales.filter(
      locale =>
        locale.code.toLowerCase().includes(NORMALIZED_TERM) ||
        locale.name.toLowerCase().includes(NORMALIZED_TERM)
    );
  }
}
