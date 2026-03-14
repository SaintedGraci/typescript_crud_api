"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeService = void 0;
const db_1 = require("../_helpers/db");
exports.employeeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};
async function getAll() {
    return await db_1.db.Employee.findAll();
}
async function getById(id) {
    const employee = await db_1.db.Employee.findByPk(id);
    if (!employee) {
        throw new Error("Employee not found");
    }
    return employee;
}
async function create(employee) {
    const newEmployee = await db_1.db.Employee.create(employee);
    return newEmployee;
}
async function update(id, employee) {
    const existingEmployee = await db_1.db.Employee.findByPk(id);
    if (!existingEmployee) {
        throw new Error("Employee not found");
    }
    const { id: _, ...updateData } = employee;
    await existingEmployee.update(updateData);
    return existingEmployee;
}
async function _delete(id) {
    console.log("Service delete called with ID:", id);
    const deletedRows = await db_1.db.Employee.destroy({
        where: { id }
    });
    console.log("Deleted rows:", deletedRows);
    if (deletedRows === 0) {
        throw new Error("Employee not found");
    }
}
