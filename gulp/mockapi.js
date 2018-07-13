var Class = require('./mockapi/Class')

module.exports = function (router) {
  router.get('/Class/Name', Class.Name)
}
