"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Express = require("express");
var log_middleware_1 = require("./middleware/log.middleware");
var app = Express();
app.use(log_middleware_1.LogMiddleware.init);
app.route('/').get(function (req, res) {
    res.status(200).send('Hello World!');
});
exports.default = app;
