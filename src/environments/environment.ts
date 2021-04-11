import { version } from '../../package.json';

export const environment = {
  app_version: version,
  defaultLanguage: 'it-IT',
  hosts: {
    wpTranslate: 'http://localhost:4200/translate-wp'
  },
  production: false,
  proxy: ''
};
