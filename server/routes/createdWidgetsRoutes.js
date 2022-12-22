const express = require('express');
// The router will be added as a middleware and will take control of requests starting with path /record.
const createdWidgetsRoutes = express.Router();

const {
    getOneWidget,
    insertCreatedWidget,
} = require('../controllers/createdWidgetsController');

createdWidgetsRoutes.get('/:id', getOneWidget);

createdWidgetsRoutes.post('/', insertCreatedWidget);

// widgetRoutes.post('/', createNewWidget);

module.exports = createdWidgetsRoutes;