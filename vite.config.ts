import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react-swc'

const mode = process.env.NODE_ENV

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ // 参考：https://blog.csdn.net/weixin_43968658/article/details/132208534
        manifest: {
          name: '测试应用',
          short_name: ' test-app',
          description: 'PWA应用测试',
          theme_color: '#182330',
          icons: [        //添加图标， 注意路径和图像像素正确
            {
              src: './public/vite.svg',
              sizes: '192x192',
              type: 'image/svg+xml',
            },
          ]
        },
        registerType: 'autoUpdate',
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,jpg,svg}'],        //缓存相关静态资源
          runtimeCaching: [ // 配置自定义运行时缓存
                mode !== 'production'
                  ? {
                      urlPattern: ({ url }) => url.origin === 'http://localhost:5173',
                      handler: 'NetworkFirst',
                      options: {
                        cacheName: 'wisbayar-api',
                        cacheableResponse: {
                          statuses: [200]
                        }
                      }
                    }
                  : {
                      urlPattern: ({ url }) => url.origin === 'https://static-pages-sand.vercel.app',
                      handler: 'NetworkFirst',
                      options: {
                        cacheName: 'wisbayar-api',
                        cacheableResponse: {
                          statuses: [200]
                        }
                      }
                    },
                {
                  urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                  handler: 'CacheFirst',
                  options: {
                    cacheName: 'wisbayar-images',
                    expiration: {
                      // 最多30个图
                      maxEntries: 30
                    }
                  }
                },
                {
                  urlPattern: /.*\.js.*/,
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'wisbayar-js',
                    expiration: {
                      maxEntries: 30, // 最多缓存30个，超过的按照LRU原则删除
                      maxAgeSeconds: 30 * 24 * 60 * 60
                    },
                    cacheableResponse: {
                      statuses: [200]
                    }
                  }
                },
                {
                  urlPattern: /.*\.css.*/,
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'wisbayar-css',
                    expiration: {
                      maxEntries: 20,
                      maxAgeSeconds: 30 * 24 * 60 * 60
                    },
                    cacheableResponse: {
                      statuses: [200]
                    }
                  }
                },
                {
                  urlPattern: /.*\.html.*/,
                  handler: 'StaleWhileRevalidate',
                  options: {
                    cacheName: 'wisbayar-html',
                    expiration: {
                      maxEntries: 20,
                      maxAgeSeconds: 30 * 24 * 60 * 60
                    },
                    cacheableResponse: {
                      statuses: [200]
                    }
                  }
                }
              ]
        },
        devOptions: {
          enabled: true
        }
    })
  ]
})
