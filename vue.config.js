module.exports = {
  devServer: {
    disableHostCheck: true
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
