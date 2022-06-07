/**
 * @desc    This file contain express configuration and third party middleware
 * @author  Harshit Kishor
 * @since   2021
 */

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')

const app = express()
//Helmet
app.use(helmet())

app.use(cors())

// parse application/json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// compress all responses
app.use(compression())

app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.use('/uploads', express.static('uploads'))
module.exports = app
