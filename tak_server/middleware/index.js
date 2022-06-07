const {
  genericErrorHandler,
  methodNotAllowed,
  notFound,
} = require('./errorHandlers')
const consoleLogger = require('./consoleLogger')

module.exports = {
  genericErrorHandler,
  methodNotAllowed,
  notFound,
  consoleLogger,
}
