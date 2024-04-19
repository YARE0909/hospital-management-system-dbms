import { Router } from "express";
import { RegisterPatientsRouter, GetPatientsRouter } from "./patients/index.js";
import { LoginRouter } from "./auth/index.js";

export default () => {
    const app = Router();

    // Patients Routes
    app.use("/patients/register", RegisterPatientsRouter);
    app.use("/patients/get", GetPatientsRouter);

    // Login Route
    app.use("/login", LoginRouter);

    return app;
};