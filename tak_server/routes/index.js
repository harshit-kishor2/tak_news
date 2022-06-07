const userRoutes = require('./user.routes')
const newsRoutes = require('./news.routes')

const router = (app) => {
  app.use('/api/profile', userRoutes)

  app.use('/api/news', newsRoutes)
}
module.exports = router
