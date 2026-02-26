import type { Request, Response, NextFunction } from "express";

import joi from "joi";

export function validateRequest(
    req: Request,
    next: NextFunction,
    schema: joi.ObjectSchema
):  void {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown keys
        stripUnknown: true, // remove unknown keys
    };


    const { error, value } = schema.validate(req.body, options);

    if (error) {
        next('Validation error: ' + error.details.map(x => x.message).join(', '));
    } else {
        req.body = value;
        next();
    }
}