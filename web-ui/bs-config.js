module.exports = {
  logLevel: "silent",
  server: {
    baseDir: "./",
    middleware: {
      // overrides the second middleware default with new settings
      1: require('connect-history-api-fallback')({index: '/compiled/index.html', verbose: false})
    }
  },
  files: ["compiled/**/*.*"],
  reloadDebounce: 2000,
  // reloadThrottle: 2000
};