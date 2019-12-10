module.exports = {
  devServer: {
    proxy: {
      '/api/': {
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
  transpileDependencies: [/[\\/]node_modules[\\/]quasar[\\/]/]
}
