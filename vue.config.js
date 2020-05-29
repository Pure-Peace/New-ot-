const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin // 打包分析

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    // config.plugin('webpack-report').use(BundleAnalyzerPlugin, [{
    //  analyzerMode: 'static'
    // }])
  },

  configureWebpack: config => {
    if (IS_PROD) {
      config.mode = 'production'
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: true
        })
      )
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            vendor: {
              chunks: 'all',
              test: /node_modules/,
              name: 'vendor',
              minChunks: 1,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 100
            },
            common: {
              chunks: 'all',
              test: /[\\/]src[\\/]js[\\/]/,
              name: 'common',
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 60
            },
            styles: {
              name: 'styles',
              test: /\.(sa|sc|c)ss$/,
              chunks: 'all',
              enforce: true
            },
            runtimeChunk: {
              name: 'manifest'
            }
          }
        }
      }
    }
  },

  devServer: {
    disableHostCheck: true,
    port: 9877,
    open: true,
    compress: false,
    overlay: {
      warnings: true,
      errors: true
    }
  },
  assetsDir: 'assets',

  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  productionSourceMap: false,

  css: {
    extract: IS_PROD,
    loaderOptions: {
      less: {
        modifyVars: {

        },
        javascriptEnabled: true
      }
    }
  }

}
