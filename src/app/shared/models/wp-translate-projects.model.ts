/**
 * Model representing the translation string returned by translate.wordpress.org.
 */
export interface TranslationFromWpTranslate {
  [index: string]: string;
}

/**
 * Types of projects available for plugins.
 */
export type PluginProject = 'dev' | 'stable';

/**
 * Types of subprojects available for WordPress core project.
 */
export type WordPressSubProject = '/' | '/admin/' | '/admin/network/' | '/cc/';

/**
 * Names for the subprojects available for WordPress core project.
 */
export type WpCoreSubprojectNames =
  | 'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.MAIN'
  | 'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.ADMIN'
  | 'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.NETWORK'
  | 'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.CC'
  | 'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.NONE';

/**
 * Array of names for the subprojects available for WordPress core project.
 */
export const WP_CORE_SUBPROJECTS: WpCoreSubprojectNames[] = [
  'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.MAIN',
  'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.ADMIN',
  'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.NETWORK',
  'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.CC',
  'GUTENBERG_STRING_COMPARATOR.WP_CORE_SUBPROJECTS_NAME.NONE'
];
