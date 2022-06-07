const express = require('express')
const {
  userAddController,
  userListController,
  userUpdateController,
} = require('../controller/user.controller')

const imageUpload = require('../middleware/imageUpload')

const router = express.Router()
router.route('/').get((req, res) => res.send('Ok'))
router.route('/add').post(imageUpload.single('image'), userAddController)
router.route('/list/:id').get(userListController)
router.route('/edit').post(userUpdateController)

module.exports = router
