import express, { Application } from "express";
import cors from "cors";
import path from "path";
import { errorHandler } from "./_middleware/errorHandler";
import { initializeDB } from "./_helpers/db";
import usersController from "./users/user.controller";
import authController from "./auth/auth.controller";
import adminController from "./admin/admin.controller";
import departmentController from "./department/department.controller";
import employeeController from "./employees/employees.controller";
import requestController from "./requests/requests.controller";


const app: Application = express();

console.log("Creating Express app...");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

console.log("Middleware configured");

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));
console.log("Static files configured from:", path.join(__dirname, 'public'));

// Test route - add this FIRST before anything else
app.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT!");
    res.json({ message: "Server is working!" });
});

console.log("Test route added");

// API routes
console.log("Registering /api/auth routes...");
app.use("/api", authController);

console.log("Registering /api/admin routes...");
app.use("/api/admin", adminController);

console.log("Registering /api/users routes...");
app.use("/api/users", usersController);
console.log("Routes registered!");

console.log("Registering /api/departments routes...");
app.use("/api/departments", departmentController);
app.use("/api/register/department", departmentController); // Alias for HTML compatibility

console.log("Registering /api/employees routes...");
app.use("/api/employees", employeeController);

console.log("Registering /api/requests routes...");
app.use("/api/requests", requestController);

// Global error handler
app.use(errorHandler);

console.log("Error handler added");

// Start server and initialize database
const PORT = process.env.PORT || 4000;

initializeDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
            console.log("Test with: POST /api/users with body { email, password, title?, firstName?, lastName? }");
        });
    })
    .catch(err => {
        console.error("Failed to initialize the database:", err);
        process.exit(1);
    });