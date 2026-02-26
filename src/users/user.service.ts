import bycrpt from "bcryptjs";
import {db} from "../_helpers/db";
import { Role } from "../_helpers/role";
import { User, UserCreationAttributes} from "./user.model";
import { get } from "node:http";


export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll(): Promise<User[]> {
    return await db.User.findAll();
}

async function getById(id: number): Promise<User> {
    const user = await db.User.findByPk(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

async function create(user: UserCreationAttributes): Promise<User> {
    const hashedPassword = await bycrpt.hash(user.password, 10);
    const newUser = await db.User.create({
        ...user,
        password: hashedPassword
    });
    return newUser;
}

async function update(id: number, user: UserCreationAttributes): Promise<User> {
    console.log("Service update called with:", { id, user });
    
    let updateData: any = { ...user };
    
    // Only hash password if it's provided
    if (user.password) {
        const hashedPassword = await bycrpt.hash(user.password, 10);
        updateData.password = hashedPassword;
    } else {
        // Remove password from update if not provided
        delete updateData.password;
    }
    
    const [affectedRows] = await db.User.update(updateData, {
        where: { id }
    });
    
    if (affectedRows === 0) {
        throw new Error("User not found");
    }
    
    // Return the updated user
    const updatedUser = await db.User.findByPk(id);
    return updatedUser!;
}

async function _delete(id: number): Promise<void> {
    console.log("Service delete called with ID:", id);
    const deletedRows = await db.User.destroy({
        where: { id }
    });
    
    console.log("Deleted rows:", deletedRows);
    
    if (deletedRows === 0) {
        throw new Error("User not found");
    }
}


async function getUser(id: number): Promise<User> {
    const user = await db.User.scope("withHash").findByPk(id);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

