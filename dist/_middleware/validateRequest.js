"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = validateRequest;
function validateRequest(req, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown keys
        stripUnknown: true, // remove unknown keys
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next('Validation error: ' + error.details.map(x => x.message).join(', '));
    }
    else {
        req.body = value;
        next();
    }
}
