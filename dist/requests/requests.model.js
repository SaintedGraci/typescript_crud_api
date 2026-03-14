"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
exports.default = initializeRequestModel;
const sequelize_1 = require("sequelize");
class Request extends sequelize_1.Model {
}
exports.Request = Request;
function initializeRequestModel(sequelize, dataTypes) {
    Request.init({
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
        tableName: "requests",
        timestamps: true
    });
    return Request;
}
