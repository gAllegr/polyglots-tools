/**
 * Interface model for the application language object.
 */
interface Language {
  code: string;
  label: string;
}

/**
 * List of languages supported by the application.
 */
export const LANGUAGES: Language[] = [
  { code: 'en-GB', label: 'English (UK)' },
  { code: 'it-IT', label: 'Italiano' }
];
