"use strict";
exports.__esModule = true;
var hapi_1 = require("hapi");
var sever = new hapi_1.Server({
    port: "5000"
});
sever.route([
    {
        path: "/",
        method: "GET",
        handler: function (request, h) {
            return "Hello World!";
        }
    }
]);
sever.start().then(function () { console.log("Sever start"); }, function (err) { console.log("Sever eror" + err); });
