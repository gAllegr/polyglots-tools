import { version } from '../../package.json';

export const environment = {
  app_version: version,
  defaultLanguage: 'it-IT',
  hosts: {
    wpTranslate: 'https://translate.wordpress.org'
  },
  production: true,
  proxy: 'https://my-cors-proxy-server.herokuapp.com/'
};
