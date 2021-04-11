/**
 * Interface for the locale object into Translate WordPress.
 */
export interface Locale {
  name: string;
  code: string;
}

/**
 * Object that represent a locale into Translate WordPress.
 */
export class Locale {
  constructor(name: string, code: string) {
    this.name = name;
    this.code = code;
  }
}
