import { WpCoreSubprojectNames } from './wp-translate-projects.type';

/**
 * Models the available filters for the Gutenberg strings.
 */
export interface StringFilters {
  searchFor: string;
  subproject: WpCoreSubprojectNames | undefined;
}
