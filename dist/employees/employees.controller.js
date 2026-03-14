"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joi_1 = __importDefault(require("joi"));
const validateRequest_1 = require("../_middleware/validateRequest");
const employees_service_1 = require("./employees.service");
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
    console.log("Database Employee model:", db_1.db.Employee);
    employees_service_1.employeeService.getAll()
        .then(employees => {
        console.log("Employees found:", employees);
        console.log("Number of employees:", employees.length);
        res.json(employees);
    })
        .catch(err => {
        console.log("Error in getAll:", err);
        next(err);
    });
}
function getById(req, res, next) {
    employees_service_1.employeeService.getById(Number(req.params.id))
        .then(employee => res.json(employee))
        .catch(err => next(err));
}
function create(req, res, next) {
    console.log("Create function called");
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);
    employees_service_1.employeeService.create(req.body)
        .then(employee => res.status(201).json({ message: "Employee created" }))
        .catch(err => next(err));
}
function update(req, res, next) {
    console.log("Update function called");
    console.log("Request body:", req.body);
    console.log("Employee ID:", req.params.id);
    employees_service_1.employeeService.update(Number(req.params.id), req.body)
        .then(employee => res.json({ message: "Employee updated" }))
        .catch(err => next(err));
}
function _delete(req, res, next) {
    console.log("Delete function called");
    console.log("Employee ID to delete:", req.params.id);
    employees_service_1.employeeService.delete(Number(req.params.id))
        .then(() => res.json({ message: "Employee deleted" }))
        .catch(err => next(err));
}
function createSchema(req, res, next) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        createdAt: joi_1.default.date().optional(),
        updatedAt: joi_1.default.date().optional(),
    });
    (0, validateRequest_1.validateRequest)(req, next, schema);
}
function updateSchema(req, res, next) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().optional(),
        description: joi_1.default.string().optional(),
        createdAt: joi_1.default.date().optional(),
        updatedAt: joi_1.default.date().optional(),
    });
    (0, validateRequest_1.validateRequest)(req, next, schema);
}
exports.default = router;
