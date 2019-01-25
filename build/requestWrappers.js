"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("./constants");
var FORMAT_HTTP_HEADERS = require('opentracing').FORMAT_HTTP_HEADERS;
var continuation_local_storage_1 = require("continuation-local-storage");
var session = continuation_local_storage_1.getNamespace(constants_1.constants.clsNamespace);
exports.unirestWrapper = function (unirest) {
    if (!unirest.request)
        throw Error('This is not a unirest object please provide a unirest object');
    var baseRequest = unirest.request;
    var headers = getInjectHeaders();
    baseRequest = baseRequest.defaults({
        headers: headers
    });
    unirest.request = baseRequest;
    return unirest;
};
exports.requestWrapper = function (request) {
    if (!request.defaults)
        throw Error('This is not a request object please provide a request object');
    var headers = getInjectHeaders();
    var baseRequest = request.defaults({
        headers: headers
    });
    return baseRequest;
};
var getInjectHeaders = function () {
    var tracer = session.get(constants_1.constants.mainSpan);
    var span = session.get(constants_1.constants.mainSpan);
    var headers = {};
    tracer.inject(span, FORMAT_HTTP_HEADERS, headers);
    return headers;
};
//# sourceMappingURL=requestWrappers.js.map