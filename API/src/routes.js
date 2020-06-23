const expresss = require('express');
const SessionController = require('./controllers/SessionController');
const routes = expresss.Router();

routes.get('/login', SessionController.login);

module.exports = routes;