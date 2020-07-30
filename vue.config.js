module.exports = {
  publicPath: './',
  outputDir: 'dist',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.168.1.150:8802/',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}