import { Injectable } from '@angular/core';
import {
  WordPressSubProject,
  WpCoreSubprojectNames
} from '../../../shared/models/wp-translate-projects.model';

/**
 * Map the the {@link WordPressSubProject} path type and the
 * {@link WpCoreSubprojectNames} name type.
 */
@Injectable({
  providedIn: 'root'
})
export class WpCoreNameProjectMapperService {
  private readonly _mapper: Map<
    WordPressSubProject | undefined,
    WpCoreSubprojectNames
  >;

  constructor() {
    this._mapper = new Map([]);
    this.populateMap();
  }

  /**
   * Get the WordPress core subproject name.
   *
   * @param key The url part of the subproject used in Translate.
   * @returns {WpCoreSubprojectNames} The corresponding name.
   */
  public getValue(key: WordPressSubProject | undefined): WpCoreSubprojectNames {
    return this._mapper.get(key) as WpCoreSubprojectNames;
  }

  /**
   * Set entries into the map.
   *
   * @returns {void} Nothing.
   */
  private populateMap(): void {
    this._mapper.set(
      '/',
      'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.MAIN'
    );
    this._mapper.set(
      '/admin/',
      'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.ADMIN'
    );
    this._mapper.set(
      '/admin/network/',
      'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.NETWORK'
    );
    this._mapper.set(
      '/cc/',
      'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.CC'
    );
    this._mapper.set(
      undefined,
      'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.NONE'
    );
  }
}
