// more info https://eslint.org/docs/latest/developer-guide/working-with-rules
const { stringify } = require('../utils/nodeHelper')


module.exports = {
  create: function (context) {
    return {
      // NOTE: just for debugging
      Program(node) {
        // if(context.getFilename().endsWith('window-location-replace.ts')) {
        //   console.log(context.getFilename())
        //   console.log(stringify(node))
        // }
      }
    }
  }
}
