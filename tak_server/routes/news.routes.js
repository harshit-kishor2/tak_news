const express = require('express')
const {
  newsAddController,
  newsListController,
} = require('../controller/news.controller')
const imageUpload = require('../middleware/imageUpload')

const router = express.Router()
router.route('/').get((req, res) => res.send('Ok'))
router.route('/add').post(imageUpload.single('image'), newsAddController)
router.route('/list').get(newsListController)
//router.route('/list/:query').get(newsListController)

module.exports = router
