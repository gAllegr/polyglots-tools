import { WpCoreSubprojectNames } from './wp-translate-projects.type';

/**
 * Model to represent the comparison between the strings of the Gutenberg plugin
 * and the same strings of the WordPress Core.
 */
export interface GutenbergTranslationComparison {
  areEqual: boolean;
  gutenberg: string;
  original: string;
  wpCore: string;
  wpCoreProject: WpCoreSubprojectNames;
}
