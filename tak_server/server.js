/**
 * @desc    This is the main file which is used to run server
 * @author  Harshit Kishor
 * @since   2022
 */

const app = require('./config/express')
const mdlwr = require('./middleware')
const router = require('./routes')

//Console Logger for request
app.use(mdlwr.consoleLogger)

// Router
router(app)

app.get('/', (req, res) => {
  res.send('Server is ready !')
})

// Error Handler Middleware
app.use(mdlwr.notFound)
app.use(mdlwr.methodNotAllowed)
app.use(mdlwr.genericErrorHandler)

/**
 * For connecting server
 */
const serverStatus = app.listen(5000, () => {
  console.log(`Listening at http://localhost:${5000}`)
})
serverStatus.on('error', console.error)
