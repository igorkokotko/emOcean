module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://localhost:5000',
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
  transpileDependencies: [/[\\/]node_modules[\\/]quasar[\\/]/],
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/assets/styles/variables.scss";
        `
      }
    }
  }
}
