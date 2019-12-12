module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 80
  },
  assetsDir: 'assets',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {

        },
        javascriptEnabled: true
      }
    }
  }
}
