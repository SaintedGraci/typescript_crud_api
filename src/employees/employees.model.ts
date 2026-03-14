

    import { DataTypes, Model, Optional, Sequelize } from "sequelize";


    export interface EmployeeAttributes {
        id: number;
        name: string;
        position: string;
        departmentId: number; // Foreign key to departments
        createdAt: Date;
        updatedAt: Date;
    }


    //define optional attributes for employee creation
    export interface EmployeeCreationAttributes 
    extends Optional<EmployeeAttributes, "id" | "createdAt" | "updatedAt"> {}

    export class Employee 
    extends Model<EmployeeAttributes, EmployeeCreationAttributes>
    implements EmployeeAttributes {
        public id!: number;
        public name!: string;
        public position!: string;
        public departmentId!: number;
        public readonly createdAt!: Date;
        public readonly updatedAt!: Date;
    }

    export default function initializeEmployeeModel(sequelize: Sequelize, dataTypes: typeof DataTypes) {
        Employee.init(
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
                position: {
                    type: dataTypes.STRING,
                    allowNull: false
                },
                departmentId: {
                    type: dataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                    references: {
                        model: 'departments',
                        key: 'id'
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'RESTRICT'
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
                tableName: "employees",
                timestamps: true
            }
        );
    
        return Employee;
    }
