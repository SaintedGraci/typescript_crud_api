import bcrypt from "bcryptjs";
import { db } from "./db";

export async function seedAdminAccount() {
    try {
        // Check if admin already exists
        const existingAdmin = await db.User.findOne({ 
            where: { email: 'admin@example.com' } 
        });

        if (existingAdmin) {
            console.log('Admin account already exists');
            return;
        }

        // Create admin account
        const hashedPassword = await bcrypt.hash('admin123', 10);
        
        const admin = await db.User.create({
            email: 'admin@example.com',
            password: hashedPassword,
            firstName: 'Admin',
            lastName: 'User',
            title: 'Mr',
            role: 'admin',
            isverified: true
        });

        console.log('✅ Admin account created successfully!');
        console.log('📧 Email: admin@example.com');
        console.log('🔑 Password: admin123');
        console.log('⚠️  Please change the password after first login!');
        
    } catch (error) {
        console.error('Error seeding admin account:', error);
    }
}
