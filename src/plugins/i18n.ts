import { createI18n } from 'vue-i18n';
import pl from '@/locales/pl';
import type { LocaleMessages } from '@/types/locale';

const i18n = createI18n<LocaleMessages, 'pl'>({
  locale: 'pl',
  legacy: false,
  globalInjection: true, // make available t in template
  availableLocales: ['pl'],
  messages: {
    pl,
  },
  numberFormats: {
    pl: {
      currency: { style: 'currency', currency: 'PLN', notation: 'compact' },
    },
  },
});

export default i18n;
