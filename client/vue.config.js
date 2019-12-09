module.exports = {
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://emocean.dev',
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
  transpileDependencies: [/[\\/]node_modules[\\/]quasar[\\/]/]
}
