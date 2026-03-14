"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestService = void 0;
const db_1 = require("../_helpers/db");
exports.requestService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
async function getAll() {
    return await db_1.db.Request.findAll();
}
async function getById(id) {
    const request = await db_1.db.Request.findByPk(id);
    if (!request) {
        throw new Error("Request not found");
    }
    return request;
}
async function create(request) {
    const newRequest = await db_1.db.Request.create(request);
    return newRequest;
}
async function update(id, request) {
    const existingRequest = await db_1.db.Request.findByPk(id);
    if (!existingRequest) {
        throw new Error("Request not found");
    }
    const { id: _, ...updateData } = request;
    await existingRequest.update(updateData);
    return existingRequest;
}
async function _delete(id) {
    console.log("Service delete called with ID:", id);
    const deletedRows = await db_1.db.Request.destroy({
        where: { id }
    });
    console.log("Deleted rows:", deletedRows);
    if (deletedRows === 0) {
        throw new Error("Request not found");
    }
}
async function getRequest(id) {
    const request = await db_1.db.Request.scope("withHash").findByPk(id);
    if (!request) {
        throw new Error("Request not found");
    }
    return request;
}
