/* eslint-disable @typescript-eslint/no-invalid-this */
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, OperatorFunction } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap
} from 'rxjs/operators';
import { SessionStorageService } from 'src/app/core/services/session-storage/session-storage.service';
import { Locale } from 'src/app/shared/models/locale.model';
import { StringFilters } from '../models/string-filters.model';
import {
  TRANSLATION_STATUS,
  TranslationStatus
} from '../models/translation-status.type';
import {
  WP_CORE_SUBPROJECTS,
  WpCoreSubprojectNames
} from '../models/wp-translate-projects.type';
import { StringRetrieverService } from '../services/string-retriever/string-retriever.service';

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
  public usedLocale: Locale;
  @Output() public readonly localeUpdated = new EventEmitter<Locale>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly stringRetrieverService: StringRetrieverService,
    private readonly sessionStorageService: SessionStorageService
  ) {
    this.usedLocale = { code: 'it-IT', name: 'Italiano' };
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
        this.sessionStorageService.getLocales().pipe(
          map(locales => this.filterLocales(term, locales)),
          catchError(() =>
            this.stringRetrieverService
              .getLocales()
              .pipe(map(locales => this.filterLocales(term, locales)))
          )
        )
      )
    );

  /**
   * Filter the list of Locales to get only ones that mathes the
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
