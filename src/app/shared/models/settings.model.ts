import { Locale } from './locale.model';

/**
 * Model the user settings.
 */
export interface Settings {
  appLanguage?: string;
  wpLocale?: Locale;
}
