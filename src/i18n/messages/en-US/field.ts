import type { LocaleObject } from "yup/lib/locale";
import * as locale from "yup/lib/locale";

function parse(locale: LocaleObject): LocaleObject {
  const result = Object.entries(locale).map(([key, value]) => {
    if (typeof value === "string") {
      value = value.replaceAll("${path}", "{label}").replaceAll("${", "{");
    } else if (value && typeof value === "object") {
      value = parse(value);
    }

    return [key, value];
  });

  return Object.fromEntries(result);
}

const fieldMessages: LocaleObject = parse(locale);

export default fieldMessages;
