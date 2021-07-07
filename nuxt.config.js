/**
 *  Nuxt 配置文件
 */ 

module.exports = {
  devtools: true, // 确保 vue 调试工具生效
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes(routes, resolve) {
      // 清除默认的路由规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login',
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register',
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/article/:slug',
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            },
            {
              path: '/editor',
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/setting',
              name: 'setting',
              component: resolve(__dirname, 'pages/setting/')
            },
            {
              path: '/profile/:username',
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            }
          ]
        }
      ])
    }
  },
  // 注册插件
  plugins: [
    '~/utils/request.js',
    '~/utils/dayjs.js',
    '~/utils/derectives.js'
  ],
  server: { // 自动打开浏览器
    open: true,
    autoOpenBrowser: true,
    host: '0.0.0.0',
    port: 3000
  }
}