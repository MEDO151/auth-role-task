import { getRequestConfig }
  from 'next-intl/server';

import { routing }
  from './routing';


import en from '@/messages/en.json';
import ar from '@/messages/ar.json';

const messages = {
  en,
  ar,
};

export default getRequestConfig(
  async ({ requestLocale }) => {
    const requestedLocale =
      await requestLocale;

    const locale =
      requestedLocale &&
      routing.locales.includes(
        requestedLocale as
          | 'en'
          | 'ar'
      )
        ? requestedLocale
        : routing.defaultLocale;

    return {locale,messages:messages[locale as  | 'en'  | 'ar']};
  }
);