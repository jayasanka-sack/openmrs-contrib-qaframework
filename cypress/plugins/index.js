const cucumber = require('cypress-cucumber-preprocessor').default
const del = require('del')

module.exports = (on) => {
  on('file:preprocessor', cucumber());
  on('after:spec', (spec, results) => {
    if (results.stats.failures === 0 && results.video) {
      // `del()` returns a promise, so it's important to return it to ensure
      // deleting the video is finished before moving on
      return del(results.video)
    }
  })
}
