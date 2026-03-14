"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
exports.default = initializeEmployeeModel;
const sequelize_1 = require("sequelize");
class Employee extends sequelize_1.Model {
}
exports.Employee = Employee;
function initializeEmployeeModel(sequelize, dataTypes) {
    Employee.init({
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
        tableName: "employees",
        timestamps: true
    });
    return Employee;
}
