const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const routes = express.Router()

routes.get('/', (req, res) => res.render("home", { page: 'enter-room' }))
routes.get('/create-pass', (req, res) => res.render("home", { page: 'create-pass' }))

routes.post('/create-room', RoomController.create)
routes.get('/room/:room', RoomController.open)
routes.post('/enterroom', RoomController.enter)

routes.post('/question/create/:room', QuestionController.create)
routes.post('/question/:room/:question/:action', QuestionController.index)

module.exports = routes
