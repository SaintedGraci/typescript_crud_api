"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./_middleware/errorHandler");
const db_1 = require("./_helpers/db");
const user_controller_1 = __importDefault(require("./users/user.controller"));
const department_controller_1 = __importDefault(require("./department/department.controller"));
const employees_controller_1 = __importDefault(require("./employees/employees.controller"));
const requests_controller_1 = __importDefault(require("./requests/requests.controller"));
const app = (0, express_1.default)();
console.log("Creating Express app...");
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
console.log("Middleware configured");
// Test route - add this FIRST before anything else
app.get("/test", (req, res) => {
    console.log("TEST ROUTE HIT!");
    res.json({ message: "Server is working!" });
});
console.log("Test route added");
// API routes
console.log("Registering /api/users routes...");
app.use("/api/users", user_controller_1.default);
console.log("Routes registered!");
console.log("Registering /api/departments routes...");
app.use("/api/departments", department_controller_1.default);
console.log("Registering /api/employees routes...");
app.use("/api/employees", employees_controller_1.default);
console.log("Registering /api/requests routes...");
app.use("/api/requests", requests_controller_1.default);
// Global error handler
app.use(errorHandler_1.errorHandler);
console.log("Error handler added");
// Start server and initialize database
const PORT = process.env.PORT || 4000;
(0, db_1.initializeDB)()
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
