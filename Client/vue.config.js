const webpack = require('webpack');
// const PreloadWebpackPlugin = require('preload-webpack-plugin');
// const HtmlWebpackPlugin = require('vue-html-webpack-plugin');
// const HtmlCriticalWebpackPlugin = require('html-critical-webpack-plugin');
const path = require('path');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const { styles } = require('@ckeditor/ckeditor5-dev-utils');

function resolveSrc(_path) {
  return path.join(__dirname, _path);
}

// vue.config.js
module.exports = {
  transpileDependencies: [/ckeditor5-[^/\\]+[/\\]src[/\\].+\.js$/],
  lintOnSave: true,
  configureWebpack: {
    resolve: {
      alias: {
        src: resolveSrc('src'),
        assets: resolveSrc('src/assets'),
        'chart.js': 'chart.js/dist/Chart.js'
      }
    },

    optimization: {
      splitChunks: {
        chunks: 'async',
        maxAsyncRequests: 6,
        maxInitialRequests: 4,
        minChunks: 1,
        minSize: 30000,
        maxSize: 0,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          default: false,
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          },
          element: {
            name: 'element',
            test: /[\\/]node_modules[\\/]element-ui[\\/]/,
            chunks: 'initial',
            priority: -30
          }
        }
      }
    },

    // optimization: {
    //   splitChunks: {
    //     chunks: 'all'
    //   }
    // },

    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),

      new CKEditorWebpackPlugin({
        language: 'en'
      })

      // new HtmlWebpackPlugin({
      //   vue: true
      // }),

      // new PreloadWebpackPlugin(),

      // new HtmlCriticalWebpackPlugin({
      //   base: path.resolve(__dirname, '../server/dist'),
      //   src: 'index.html',
      //   dest: 'index.html',
      //   inline: true,
      //   minify: true,
      //   extract: true,
      //   width: 375,
      //   height: 565,
      //   penthouse: {
      //     blockJSRequests: false
      //   }
      // })
    ]
  },

  pwa: {
    name: 'Ask Arya',
    themeColor: '#27408b',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#27408b',
    iconPaths: {
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },

  pluginOptions: {},

  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  // Output directory for Node.js
  outputDir: path.resolve(__dirname, '../server/dist'),

  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000'
      },
      '^/auth/google$': {
        target: 'http://localhost:3000'
      },
      '^/user/activation/': {
        target: 'http://localhost:3000'
      },
      '^/uploads': {
        target: 'http://localhost:3000'
      }
    }
  },

  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.exclude.add(
      path.join(__dirname, 'node_modules', 'ckeditor5-direction')
    );
    svgRule.exclude.add(path.join(__dirname, 'node_modules', '@ckeditor'));

    config.module
      .rule('cke-svg')
      .test(/ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/)
      .use('raw-loader')
      .loader('raw-loader');

    config.module
      .rule('cke-css')
      .test(/ckeditor5-[^/\\]+[/\\].+\.css$/)
      .use('postcss-loader')
      .loader('postcss-loader')
      .tap(() => {
        return styles.getPostCssConfig({
          themeImporter: {
            themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
          },
          minify: true
        });
      });
  }
};
