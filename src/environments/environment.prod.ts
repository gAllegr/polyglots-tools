import { version } from '../../package.json';

export const environment = {
  app_version: version,
  defaultLanguage: 'en-GB',
  defaultLocale: {
    name: 'English (UK)',
    code: 'en-gb',
    fullCode: 'en-GB'
  },
  hosts: {
    wpTranslate: 'https://translate.wordpress.org'
  },
  production: true,
  proxy: 'https://my-cors-proxy-server.herokuapp.com/'
};
