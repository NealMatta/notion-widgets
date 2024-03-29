const express = require('express');
// The router will be added as a middleware and will take control of requests starting with path /record.
const createdWidgetsRoutes = express.Router();

const {
    getOneWidgetByPersonalWidgetID,
    insertCreatedWidget,
    deleteCreatedWidget,
} = require('../controllers/createdWidgetsController');

createdWidgetsRoutes.get('/personalWidget/:id', getOneWidgetByPersonalWidgetID);

createdWidgetsRoutes.post('/', insertCreatedWidget);

createdWidgetsRoutes.delete('/delete/:id', deleteCreatedWidget);

// widgetRoutes.post('/', createNewWidget);

module.exports = createdWidgetsRoutes;
