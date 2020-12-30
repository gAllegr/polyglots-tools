import { version } from '../../package.json';

export const environment = {
  app_version: version,
  hosts: {
    wpTranslate: 'http://localhost:4200/translate-wp'
  },
  production: false,
  proxy: ''
};
