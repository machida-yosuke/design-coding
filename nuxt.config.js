const pkg = require('./package')
const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES'
  ? {
    base: '/design-coding/'
  }
  : {}

module.exports = {
  mode: 'universal',
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=750, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Dancing+Script' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,800' }
    ],
    script: [
      { src: 'https://api.songle.jp/v2/api.js' },
      { src: 'https://cdnjs.cloudflare.com/ajax/libs/oimo/1.0.9/oimo.min.js' }
    ]
  },
  // genarateディレクトリの変更
  generate: {
    dir: 'docs'
  },

  externals: {
    three: 'three'
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    'reset.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/google-analytics', {
      id: 'UA-135482273-1'
    }],
    ['@nuxtjs/style-resources'],
    'nuxt-user-agent'
  ],
  styleResources: {
    scss: [
      '@/assets/sass/_variable.scss',
      '@/assets/sass/_function.scss',
      '@/assets/sass/_mixin.scss',
      '@/assets/sass/_keyframe.scss'
    ]
  },
  router: {
    ...routerBase
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0' // default: localhost
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.(fs|vs|glsl)$/,
        use: [
          {
            loader: 'glsl-shader-loader',
            options: {}
          }
        ]
      })
    }
  }
}
