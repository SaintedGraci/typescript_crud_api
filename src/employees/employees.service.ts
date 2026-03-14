import { db } from "../_helpers/db";
import { Employee, EmployeeCreationAttributes } from "./employees.model";

export const employeeService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll(): Promise<Employee[]> {
    return await db.Employee.findAll({
        include: [{
            model: db.Department,
            as: 'department',
            attributes: ['id', 'name', 'description']
        }]
    });
}

async function getById(id: number): Promise<Employee> {
    const employee = await db.Employee.findByPk(id, {
        include: [{
            model: db.Department,
            as: 'department',
            attributes: ['id', 'name', 'description']
        }]
    });
    if (!employee) {
        throw new Error("Employee not found");
    }
    return employee;
}

async function create(employee: EmployeeCreationAttributes): Promise<Employee> {
    try {
        const newEmployee = await db.Employee.create(employee);
        return newEmployee;
    } catch (error: any) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            throw new Error("Employee with this name already exists");
        }
        throw error;
    }
}


async function update(id: number, employee: EmployeeCreationAttributes): Promise<Employee> {    
    const existingEmployee = await db.Employee.findByPk(id);
    if (!existingEmployee) {
        throw new Error("Employee not found");
    }
    const { id: _, ...updateData } = employee;
    await existingEmployee.update(updateData);
    return existingEmployee;
}



async function _delete(id: number): Promise<void> {
    console.log("Service delete called with ID:", id);
    const deletedRows = await db.Employee.destroy({
        where: { id }
    });
    
    console.log("Deleted rows:", deletedRows);
    
    if (deletedRows === 0) {
        throw new Error("Employee not found");
    }
}