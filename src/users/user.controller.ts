import type { Request, Response, NextFunction } from "express";
import { Router } from "express";
import Joi from "joi";
import { Role } from "../_helpers/role";
import { validateRequest } from "../_middleware/validateRequest";
import { userService } from "./user.service";
import { db } from "../_helpers/db";
import { title } from "node:process";


const router = Router();

// routes
router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createSchema, create);
router.put("/:id", updateSchema, update);
router.delete("/:id", _delete);

function getAll(req: Request, res: Response, next: NextFunction): void {
    console.log("GetAll function called");
    console.log("Database User model:", db.User);
	userService.getAll()
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


function getById(req: Request, res: Response, next: NextFunction): void {
    userService.getById(Number(req.params.id))
        .then(user => res.json(user))
        .catch(err => next(err));
}


function create(req: Request, res: Response, next: NextFunction): void {
    console.log("Create function called");
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);
    userService.create(req.body)
        .then(user => res.status(201).json({ message: "User created" }))
        .catch(err => next(err));
}


function update(req: Request, res: Response, next: NextFunction): void {
    console.log("Update function called");
    console.log("Request body:", req.body);
    console.log("User ID:", req.params.id);
    userService.update(Number(req.params.id), req.body)
        .then(user => res.json({ message: "User updated" }))
        .catch(err => next(err));
}

function _delete(req: Request, res: Response, next: NextFunction): void {
    console.log("Delete function called");
    console.log("User ID to delete:", req.params.id);
    userService.delete(Number(req.params.id))
        .then(() => res.json({ message: "User deleted" }))
        .catch(err => next(err));
}


function createSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        title: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        role: Joi.string().valid(Role.ADMIN, Role.USER).default(Role.USER),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req: Request, res: Response, next: NextFunction): void {
    const schema = Joi.object({
        title: Joi.string().optional(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        role: Joi.string().valid(Role.ADMIN, Role.USER).default(Role.USER),
        confirmPassword: Joi.string().valid(Joi.ref("password")).required()
    });
    validateRequest(req, next, schema);
}

export default router;





