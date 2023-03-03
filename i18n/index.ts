import type { UseI18nOptions } from 'vue-i18n';
import { setLocale as setLocaleYup } from 'yup';
import printValue from 'yup/lib/util/printValue';
import type { LocaleObject as LocaleObjectBase } from 'yup/lib/locale';
import messages from './messages';

type AVAILABLE_LOCALES = 'en-US' | 'pt-BR';
export type I18N_TYPE = UseI18nOptions<
  { message: typeof messages },
  AVAILABLE_LOCALES
>;

const { $i18n } = useNuxtApp();

const availableLocales: Array<AVAILABLE_LOCALES> = ['en-US', 'pt-BR'];
const cacheKey = 'i18n-lang';
const language =
  (localStorage.getItem(cacheKey) as null | AVAILABLE_LOCALES) ||
  navigator.language;

export function changeLocale(locale: AVAILABLE_LOCALES | string) {
  // @ts-ignore
  if (!availableLocales.includes(locale)) {
    locale = 'en-US';
  }

  $i18n.setLocale(locale as AVAILABLE_LOCALES);

  localStorage.setItem(cacheKey, locale);

  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector('html')!.setAttribute('lang', locale);
}

const setLocaleMessage = (key: string) => {
  return (params?: any) => $i18n.t(`field.${key}`, params);
};

setLocaleYup({
  mixed: {
    default: setLocaleMessage('mixed.default'),
    required: setLocaleMessage('mixed.required'),
    oneOf: setLocaleMessage('mixed.oneOf'),
    notOneOf: setLocaleMessage('mixed.notOneOf'),
    notType: ({ label, type, value, originalValue }) => {
      const isCast = originalValue != null && originalValue !== value;

      const params: {
        label: string;
        type: string;
        finalValue: string;
        cast?: string;
        nullable?: string;
      } = {
        label,
        type,
        finalValue: printValue(value, true),
      };

      if (isCast) {
        params.cast =
          ' ' +
          setLocaleMessage('mixed.cast')({
            value: printValue(originalValue, true),
          });
      }

      if (value === null) {
        params.nullable = '\n ' + setLocaleMessage('mixed.nullable')();
      }

      return setLocaleMessage('mixed.notType')(params);
    },
    defined: setLocaleMessage('mixed.defined'),
  },
  string: {
    length: setLocaleMessage('string.length'),
    min: setLocaleMessage('string.min'),
    max: setLocaleMessage('string.max'),
    matches: setLocaleMessage('string.matches'),
    email: setLocaleMessage('string.email'),
    url: setLocaleMessage('string.url'),
    uuid: setLocaleMessage('string.uuid'),
    trim: setLocaleMessage('string.trim'),
    lowercase: setLocaleMessage('string.lowercase'),
    uppercase: setLocaleMessage('string.uppercase'),
  },
  number: {
    min: setLocaleMessage('number.min'),
    max: setLocaleMessage('number.max'),
    lessThan: setLocaleMessage('number.lessThan'),
    moreThan: setLocaleMessage('number.moreThan'),
    positive: setLocaleMessage('number.positive'),
    negative: setLocaleMessage('number.negative'),
    integer: setLocaleMessage('number.integer'),
  },
  date: {
    min: setLocaleMessage('date.min'),
    max: setLocaleMessage('date.max'),
  },
  boolean: {
    isValue: setLocaleMessage('boolean.isValue'),
  },
  object: {
    noUnknown: setLocaleMessage('object.noUnknown'),
  },
  array: {
    min: setLocaleMessage('array.min'),
    max: setLocaleMessage('array.max'),
    length: setLocaleMessage('array.length'),
  },
} satisfies Required<LocaleObjectBase>);

// set language
changeLocale(language);
