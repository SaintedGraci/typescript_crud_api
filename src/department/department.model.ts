

    import { DataTypes, Model, Optional, Sequelize } from "sequelize";


    export interface DepartmentAttributes {
        id: number;
        name: string;
        description: string;
        createdAt: Date;
        updatedAt: Date;

    }


    //define optional attributes for department creation
    export interface DepartmentCreationAttributes 
    extends Optional<DepartmentAttributes, "id" | "createdAt" | "updatedAt"> {}

    export class Department 
    extends Model<DepartmentAttributes, DepartmentCreationAttributes>
    implements DepartmentAttributes {
        public id!: number;
        public name!: string;
        public description!: string;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    export default function initializeDepartmentModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
        Department.init(
            {
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
            },
            {
                sequelize,
                tableName: "departments",
                timestamps: true
            }
            );
        
        return Department;
    }

