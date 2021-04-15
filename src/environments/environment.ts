import { version } from '../../package.json';

export const environment = {
  app_version: version,
  defaultLanguage: 'it-IT',
  defaultLocale: {
    name: 'Italiano',
    code: 'it',
    fullCode: 'it-IT'
  },
  hosts: {
    wpTranslate: 'http://localhost:4200/translate-wp'
  },
  production: false,
  proxy: ''
};
