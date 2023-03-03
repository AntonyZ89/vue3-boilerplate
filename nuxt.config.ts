import messages from './i18n/messages';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
  },
  components: [
    { path: '@/components/common', pathPrefix: false },
    { path: '@/components', pathPrefix: false },
  ],
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    'nuxt-typed-router',
  ],
  i18n: {
    vueI18n: {
      legacy: false,
      locale: 'pt-BR', // set locale
      fallbackLocale: 'en-US', // set fallback locale
      messages, // set locale messages
      // If you need to specify other options, you can set other options
      // ...
    },
  },
});
