"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
exports.initializeDB = initializeDB;
const config_json_1 = __importDefault(require("../../config.json"));
const promise_1 = __importDefault(require("mysql2/promise"));
const sequelize_1 = require("sequelize");
exports.db = {};
async function initializeDB() {
    const { host, port, username, password, database } = config_json_1.default.database;
    // 1. Create database if it doesn't exist
    const connection = await promise_1.default.createConnection({ host, port, user: username, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await connection.end();
    // 2. Connect to the database
    const sequelize = new sequelize_1.Sequelize(database, username, password, {
        host: host,
        port: port,
        dialect: "mysql"
    });
    // 3. Attach sequelize to the db object so it's "read" and accessible elsewhere
    exports.db.sequelize = sequelize;
    // 4. Initialize models 
    // Make sure the path to your user.model is exactly correct
    const { default: UserModel } = await Promise.resolve().then(() => __importStar(require("../users/user.model")));
    exports.db.User = UserModel(sequelize, sequelize_1.DataTypes);
    const { default: DepartmentModel } = await Promise.resolve().then(() => __importStar(require("../department/department.model")));
    exports.db.Department = DepartmentModel(sequelize, sequelize_1.DataTypes);
    const { default: EmployeeModel } = await Promise.resolve().then(() => __importStar(require("../employees/employees.model")));
    exports.db.Employee = EmployeeModel(sequelize, sequelize_1.DataTypes);
    const { default: RequestModel } = await Promise.resolve().then(() => __importStar(require("../requests/requests.model")));
    exports.db.Request = RequestModel(sequelize, sequelize_1.DataTypes);
    // 5. Sync models
    await sequelize.sync({ force: true });
    console.log("Database initialized successfully");
}
