import configs from "../../config.json";
import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

// Define the interface for your DB object
export interface Database {
    User?: any;
    Department?: any;
    Employee?: any;
    Request?: any;
    sequelize?: Sequelize; // Store the connection here!
}

export const db: Database = {};

export async function initializeDB(): Promise<void> {
    const { host, port, username, password, database } = configs.database;

    // 1. Create database if it doesn't exist
    const connection = await mysql.createConnection({ host, port, user: username, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await connection.end();

    // 2. Connect to the database
    const sequelize = new Sequelize(database, username, password, {
        host: host,
        port: port,
        dialect: "mysql"
    });

    // 3. Attach sequelize to the db object so it's "read" and accessible elsewhere
    db.sequelize = sequelize;

    // 4. Initialize models 
    // Make sure the path to your user.model is exactly correct
    const { default: UserModel } = await import("../users/user.model");
    db.User = UserModel(sequelize, DataTypes);

    const { default: DepartmentModel } = await import("../department/department.model");
    db.Department = DepartmentModel(sequelize, DataTypes);

    const { default: EmployeeModel } = await import("../employees/employees.model");
    db.Employee = EmployeeModel(sequelize, DataTypes);

    const { default: RequestModel } = await import("../requests/requests.model");
    db.Request = RequestModel(sequelize, DataTypes);

    // 4.5. Set up relationships
    // Department has many Employees
    db.Department.hasMany(db.Employee, {
        foreignKey: 'departmentId',
        as: 'employees'
    });
    
    // Employee belongs to Department
    db.Employee.belongsTo(db.Department, {
        foreignKey: 'departmentId',
        as: 'department'
    });

    // User has many Requests
    db.User.hasMany(db.Request, {
        foreignKey: 'userId',
        as: 'requests'
    });
    
    // Request belongs to User
    db.Request.belongsTo(db.User, {
        foreignKey: 'userId',
        as: 'user'
    });

    // 5. Sync models
    await sequelize.sync({ force: true });

    console.log("Database initialized successfully");
    
    // 6. Seed admin account
    const { seedAdminAccount } = await import("./seed");
    await seedAdminAccount();
}