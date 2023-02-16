import * as VueI18n from "vue-i18n";
import type { UseI18nOptions } from "vue-i18n";
import { setLocale } from "yup";
import messages from "./messages";

type AVAILABLE_LOCALES = "en-US" | "pt-BR";
export type I18N_TYPE = UseI18nOptions<
  { message: typeof messages },
  AVAILABLE_LOCALES
>;

const availableLocales: Array<AVAILABLE_LOCALES> = ["en-US", "pt-BR"];
const cacheKey = "i18n-lang";
const language =
  (localStorage.getItem(cacheKey) as null | AVAILABLE_LOCALES) ||
  navigator.language;
const i18n = VueI18n.createI18n({
  legacy: false,
  locale: "pt-BR", // set locale
  fallbackLocale: "en-US", // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

export function changeLocale(locale: AVAILABLE_LOCALES | string) {
  // @ts-ignore
  if (!availableLocales.includes(locale)) {
    locale = "en-US";
  }

  i18n.global.locale.value = locale as AVAILABLE_LOCALES;

  localStorage.setItem(cacheKey, locale);

  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  document.querySelector("html")!.setAttribute("lang", locale);
}

setLocale({
  mixed: {
    required: (params) => i18n.global.t("field.mixed.required", { ...params }),
  },
  number: {
    min: (params) => i18n.global.t("field.number.min", { ...params }),
    max: (params) => i18n.global.t("field.number.max", { ...params }),
  },
  string: {
    min: (params) => i18n.global.t("field.string.min", { ...params }),
    max: (params) => i18n.global.t("field.string.max", { ...params }),
  },
});

// set language
changeLocale(language);

export default i18n;
