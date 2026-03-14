"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (typeof err === "string") {
        // custom application error
        const is404 = err.toLowerCase().includes("not found");
        const statusCode = is404 ? 404 : 400;
        return res.status(statusCode).json({ message: err });
    }
    if (err instanceof Error) {
        //standard error - check if it's a "not found" error
        const is404 = err.message.toLowerCase().includes("not found");
        const statusCode = is404 ? 404 : 500;
        return res.status(statusCode).json({ message: err.message });
    }
    //fallback to 500
    return res.status(500).json({ message: "Internal Server Error" });
};
exports.errorHandler = errorHandler;
