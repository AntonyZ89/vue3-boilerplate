import type { LocaleObject } from "yup/lib/locale";

const fieldMessages: LocaleObject = {
  mixed: {
    required: "{label} obrigatório",
  },
  number: {
    min: "{label} precisa ser maior ou igual a {min}",
    max: "{label} precisa ser menor ou igual a {max}",
  },
  string: {
    min: "{label} deve ter no mínimo {min} caracteres",
    max: "{label} deve ter no máximo {max} caracteres",
  },
};

export default fieldMessages;
