import { WpCoreSubprojectNames } from './wp-translate-projects.type';

type TranslationStatus =
  | 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.DIFFERENT'
  | 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.EQUAL'
  | 'GUTENBERG_STRING_COMPARATOR.RESULTS.STATUS.NEW';

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
