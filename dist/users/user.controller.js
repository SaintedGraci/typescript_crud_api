"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const role_1 = require("../_helpers/role");
const validateRequest_1 = require("../_middleware/validateRequest");
const user_service_1 = require("./user.service");
const db_1 = require("../_helpers/db");
const router = (0, express_1.Router)();
// routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);
function getAll(req, res, next) {
    console.log("GetAll function called");
    console.log("Database User model:", db_1.db.User);
    user_service_1.userService.getAll()
        .then(users => {
        console.log("Users found:", users);
        console.log("Number of users:", users.length);
        res.json(users);
    })
        .catch(err => {
        console.log("Error in getAll:", err);
        next(err);
    });
}
function getById(req, res, next) {
    user_service_1.userService.getById(Number(req.params.id))
        .then(user => res.json(user))
        .catch(err => next(err));
}
function create(req, res, next) {
    console.log("Create function called");
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);
    user_service_1.userService.create(req.body)
        .then(user => res.status(201).json({ message: "User created" }))
        .catch(err => next(err));
}
function update(req, res, next) {
    console.log("Update function called");
    console.log("Request body:", req.body);
    console.log("User ID:", req.params.id);
    user_service_1.userService.update(Number(req.params.id), req.body)
        .then(user => res.json({ message: "User updated" }))
        .catch(err => next(err));
}
function _delete(req, res, next) {
    console.log("Delete function called");
    console.log("User ID to delete:", req.params.id);
    user_service_1.userService.delete(Number(req.params.id))
        .then(() => res.json({ message: "User deleted" }))
        .catch(err => next(err));
}
function createSchema(req, res, next) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().optional(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        firstName: joi_1.default.string().optional(),
        lastName: joi_1.default.string().optional(),
        websiteUrl: joi_1.default.string().uri().optional(),
        role: joi_1.default.string().valid(role_1.Role.ADMIN, role_1.Role.USER).default(role_1.Role.USER),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required()
    });
    (0, validateRequest_1.validateRequest)(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = joi_1.default.object({
        title: joi_1.default.string().optional(),
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string().required(),
        firstName: joi_1.default.string().optional(),
        lastName: joi_1.default.string().optional(),
        websiteUrl: joi_1.default.string().uri().optional(),
        role: joi_1.default.string().valid(role_1.Role.ADMIN, role_1.Role.USER).default(role_1.Role.USER),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required()
    });
    (0, validateRequest_1.validateRequest)(req, next, schema);
}
exports.default = router;
