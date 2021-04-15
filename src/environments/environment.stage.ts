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
    wpTranslate: 'https://translate.wordpress.org'
  },
  production: false,
  proxy: 'https://my-cors-proxy-server.herokuapp.com/'
};
