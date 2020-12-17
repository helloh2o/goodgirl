export default {
  server: {
    port: 3000,
    host: '0.0.0.0',
    timing: {
      total: true,
    },
  },
  mode: 'universal',
  modern: true,
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'zh-cmn-Hans',
      xmlns: 'http://www.w3.org/1999/xhtml',
    },
    title: '',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui',
      },
      { name: 'window-target', content: '_top' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon_.ico' },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        title: '文章',
        href: '/atom.xml',
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        title: '话题',
        href: '/topic_atom.xml',
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        title: '开源项目',
        href: '/project_atom.xml',
      },
      {
        rel: 'stylesheet',
        href: '//cdn.staticfile.org/bulma/0.8.0/css/bulma.min.css',
      },
      {
        rel: 'stylesheet',
        href: '//at.alicdn.com/t/font_1142441_bu6x3hdokz.css',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FFB90F' },
  /*
   ** Global CSS
   */
  css: [{ src: '~/assets/styles/main.scss', lang: 'scss' }],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/filters',
    '~/plugins/axios',
    '~/plugins/bbs-go',
    { src: '~/plugins/infinite-scroll', ssr: false },
    { src: '~/plugins/vue-lazyload', ssr: false },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc:https://github.com/nuxt-community/modules/tree/master/packages/bulma
    // '@nuxtjs/bulma',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/eslint-module',
    '@nuxtjs/toast',
    ['cookie-universal-nuxt', { alias: 'cookies' }],
    [
      '@nuxtjs/google-adsense',
      {
        id: 'ca-pub-5683711753850351',
        pageLevelAds: true,
      },
    ],
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    credentials: true,
  },

  proxy: {
    '/api/':
      process.env.NODE_ENV === 'production'
        ? 'http://127.0.0.1:8082'
        : 'http://127.0.0.1:8082',
  },

  // Doc: https://github.com/shakee93/vue-toasted
  // Doc: https://github.com/nuxt-community/modules/tree/master/packages/toast
  toast: {
    position: 'top-right',
    duration: 2000, // Display time of the toast in millisecond
    keepOnHover: true, // When mouse is over a toast's element, the corresponding duration timer is paused until the cursor leaves the element
  },

  /*
   ** Build configuration
   */
  build: {
    // publicPath: 'https://file.mlog.club/static/nuxtclient/',
    optimizeCSS: true,
    extractCSS: true,
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    postcss: {
      preset: {
        features: {
          customProperties: false,
        },
      },
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
