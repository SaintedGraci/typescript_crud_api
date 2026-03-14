

import { DataTypes, Model, Optional, Sequelize } from "sequelize";


    export interface RequestAttributes {
       id: number;
       userId: number;
       requestType: string;
       purpose: string;
       status: string;
       createdAt: Date;
       updatedAt: Date;
    }


    //define optional attributes for request creation
    export interface RequestCreationAttributes 
    extends Optional<RequestAttributes, "id" | "createdAt" | "updatedAt"> {}

    export class Request 
    extends Model<RequestAttributes, RequestCreationAttributes>
    implements RequestAttributes {
        public id!: number;
        public userId!: number;
        public requestType!: string;
        public purpose!: string;
        public status!: string;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    export default function initializeRequestModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
        Request.init(
            {
                id: {
                    type: dataTypes.INTEGER.UNSIGNED,
                    primaryKey: true,
                    autoIncrement: true
                },
                userId: {
                    type: dataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                },
                requestType: { 
                    type: dataTypes.STRING,
                    allowNull: false
                },
                purpose: {
                    type: dataTypes.TEXT,
                    allowNull: false
                },
                status: {
                    type: dataTypes.STRING,
                    allowNull: false,
                    defaultValue: 'pending'
                },
                createdAt: {
                    type: dataTypes.DATE
                    // defaultValue: dataTypes.NOW
                    // allowNull: false
                },
                updatedAt: {
                    type: dataTypes.DATE
                }
            },
             {
                sequelize,
                tableName: "requests",
                timestamps: true
            }
        );
    
        return Request;
    }   