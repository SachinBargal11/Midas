module.exports = {
  server: {
    baseDir: "./",
    middleware: {
      // overrides the second middleware default with new settings
      1: require('connect-history-api-fallback')({index: '/compiled/index.html', verbose: true})
    }
  }
};