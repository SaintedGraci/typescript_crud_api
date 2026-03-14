"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Department = void 0;
exports.default = initializeDepartmentModel;
const sequelize_1 = require("sequelize");
class Department extends sequelize_1.Model {
}
exports.Department = Department;
function initializeDepartmentModel(sequelize, dataTypes) {
    Department.init({
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: dataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: dataTypes.DATE
            // defaultValue: dataTypes.NOW  
            // allowNull: false
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    }, {
        sequelize,
        tableName: "departments",
        timestamps: true
    });
    return Department;
}
