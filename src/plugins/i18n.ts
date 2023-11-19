import { createI18n } from 'vue-i18n';
import pl from '@/locales/pl';

const i18n = createI18n<[typeof pl], 'pl'>({
  locale: 'pl',
  legacy: false,
  globalInjection: true, // make available t in template
  availableLocales: ['pl'],
  messages: {
    pl,
  },
  numberFormats: {
    pl: {
      currency: { style: 'currency', currency: 'PLN', notation: 'standard' },
    },
  },
});

export default i18n;
