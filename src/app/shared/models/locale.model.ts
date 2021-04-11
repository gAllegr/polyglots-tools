/**
 * Interface for the locale object into Translate WordPress.
 */
export interface Locale {
  name: string;
  code: string;
  fullCode: string;
}

/**
 * Object that represent a locale into Translate WordPress.
 */
export class Locale implements Locale {
  constructor(name: string, code: string, fullCode: string) {
    this.name = name;
    this.code = code;
    this.fullCode = fullCode;
  }
}
