"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../_helpers/db");
exports.userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
async function getAll() {
    return await db_1.db.User.findAll();
}
async function getById(id) {
    const user = await db_1.db.User.findByPk(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}
async function create(user) {
    const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
    const newUser = await db_1.db.User.create({
        ...user,
        password: hashedPassword
    });
    return newUser;
}
async function update(id, user) {
    console.log("Service update called with:", { id, user });
    let updateData = { ...user };
    // Only hash password if it's provided
    if (user.password) {
        const hashedPassword = await bcryptjs_1.default.hash(user.password, 10);
        updateData.password = hashedPassword;
    }
    else {
        // Remove password from update if not provided
        delete updateData.password;
    }
    const [affectedRows] = await db_1.db.User.update(updateData, {
        where: { id }
    });
    if (affectedRows === 0) {
        throw new Error("User not found");
    }
    // Return the updated user
    const updatedUser = await db_1.db.User.findByPk(id);
    return updatedUser;
}
async function _delete(id) {
    console.log("Service delete called with ID:", id);
    const deletedRows = await db_1.db.User.destroy({
        where: { id }
    });
    console.log("Deleted rows:", deletedRows);
    if (deletedRows === 0) {
        throw new Error("User not found");
    }
}
async function getUser(id) {
    const user = await db_1.db.User.scope("withHash").findByPk(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}
