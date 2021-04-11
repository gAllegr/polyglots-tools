import { WpCoreSubprojectNames } from './wp-translate-projects.model';

/**
 * Possible statuses of the Gutenberg plugin strings with respect to
 * the WordPress Core related ones.
 */
export type TranslationStatus =
  | 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.DIFFERENT'
  | 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.EQUAL'
  | 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.NEW';

/**
 * Array of possible statuses of the Gutenberg plugin strings with
 * respect to the WordPress Core related ones.
 */
export const TRANSLATION_STATUS: TranslationStatus[] = [
  'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.DIFFERENT',
  'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.EQUAL',
  'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.NEW'
];

/**
 * Model to represent the comparison between the strings of the Gutenberg plugin
 * and the same strings of the WordPress Core.
 */
export interface GutenbergTranslationComparison {
  areEqual: boolean;
  gutenberg: string;
  isNew: boolean;
  original: string;
  status: TranslationStatus;
  wpCore: string;
  wpCoreProject: WpCoreSubprojectNames;
}

/**
 * Models the available filters for the Gutenberg strings.
 */
export interface StringFilters {
  searchFor: string;
  status: TranslationStatus | undefined;
  subproject: WpCoreSubprojectNames | undefined;
}
