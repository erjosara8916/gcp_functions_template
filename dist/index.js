"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus[HttpStatus["SUCCESS"] = 200] = "SUCCESS";
    HttpStatus[HttpStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatus[HttpStatus["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(HttpStatus || (HttpStatus = {}));
var existMessage = function (message) {
    if (!message) {
        var error = { status: HttpStatus.BAD_REQUEST, error: "message not found" };
        throw error;
    }
};
var main = function (request, response) {
    try {
        var message = request.query.message || request.body.message;
        existMessage(message);
        var result = {
            messageReceived: message,
        };
        return response.status(HttpStatus.SUCCESS).json(result);
    }
    catch (err) {
        var error = err;
        return response.status(error.status).json(error);
    }
};
exports.main = main;
//# sourceMappingURL=index.js.map