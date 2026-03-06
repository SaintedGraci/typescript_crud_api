import { allow } from "joi";
import { DataTypes, Model, Optional, Sequelize } from "sequelize";


export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    title: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
    websiteUrl  : string;

}


//define optional attributes for user creation
export interface UserCreationAttributes 
extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

export class User 
extends Model<UserAttributes, UserCreationAttributes>
implements UserAttributes {
    public id!: number;
    public email!: string;
    public password!: string;
    public title!: string;
    public firstName!: string;
    public lastName!: string;
    public role!: string;
    public websiteUrl!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function initializeUserModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
    User.init(
        {
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
        },
        {
            sequelize,
            tableName: "users",
            timestamps: true
        }
    );
    
    return User;
}
