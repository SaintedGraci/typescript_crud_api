# Employee Management System

A simple web application for managing employees, departments, and user requests. Built with TypeScript, Express, and MySQL.

## What is this?

This is an employee management system where:
- Regular users can create accounts, submit requests (like hardware, software, supplies), and track their status
- Admins can manage everything - approve/reject requests, add employees and departments, and verify new user accounts
- New users need admin approval before they can log in

Think of it as an internal company portal where employees can request things they need and admins can keep everything organized.

## How to get started

1. Make sure you have Node.js and MySQL installed on your computer

2. Open your terminal and install the dependencies:
```
npm install
```

3. Set up your database connection by editing the `config.json` file with your MySQL details:
```json
{
  "database": {
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "your-mysql-password",
    "database": "typescript_crud_api"
  }
}
```

4. Start the server:
```
npm start
```

5. Open your browser and go to `http://localhost:4000/login.html`

That's it! The database tables will be created automatically when you first run the server.

## Default admin login

The system creates a default admin account for you:
- Email: `admin@example.com`
- Password: `admin123`

Use this to log in and start managing the system. You should probably change the password after logging in.

## What can you do?

As a regular user:
- Register for an account (wait for admin to verify you)
- Submit requests for hardware, software, supplies, or maintenance
- Check the status of your requests (pending, approved, or rejected)

As an admin:
- Verify new user accounts so they can log in
- View and manage all user requests
- Add, edit, or remove employees
- Organize employees into departments
- Manage all user accounts

## Pages you can access

Once the server is running, you can visit:
- `/login.html` - Log in to your account
- `/register.html` - Create a new account
- `/userDashboard.html` - User's main page (after login)
- `/adminDashboard.html` - Admin's main page (after login)
- `/request.html` - Submit and view your requests
- `/employees.html` - Manage employees
- `/departments.html` - Manage departments
- `/accounts.html` - Admin can manage user accounts

## Tech stack

Built with TypeScript, Express.js, MySQL, and Sequelize. Frontend uses Bootstrap for styling.
