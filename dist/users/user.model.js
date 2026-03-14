"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
exports.default = initializeUserModel;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
function initializeUserModel(sequelize, dataTypes) {
    User.init({
        id: {
            type: dataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING,
            allowNull: true
        },
        firstName: {
            type: dataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: dataTypes.STRING,
            allowNull: true
        },
        role: {
            type: dataTypes.STRING,
            defaultValue: "user"
        },
        websiteUrl: {
            type: dataTypes.STRING,
            allowNull: true,
            defaultValue: "https://www.example.com"
        },
        createdAt: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        },
        updatedAt: {
            type: dataTypes.DATE,
            defaultValue: dataTypes.NOW
        }
    }, {
        sequelize,
        tableName: "users",
        timestamps: true
    });
    return User;
}
