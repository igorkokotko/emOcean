module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        // target: 'https://emocean.dev',
        target: 'http://localhost:5000',
        // target: 'https://emocean.dev',
        ws: true,
        changeOrigin: true
      }
    }
  },
  pluginOptions: {
    quasar: {
      rtlSupport: true,
      treeShake: true
    }
  },
<<<<<<< HEAD
  transpileDependencies: [/[\\/]node_modules[\\/]quasar[\\/]/],
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "quasar/dist/quasar.sass";
        `
      }
    }
  }
=======
  transpileDependencies: [/[\\/]node_modules[\\/]quasar[\\/]/]
>>>>>>> add some features and fixes
}
