import { Router } from "express";
import { RegisterPatientsRouter, GetPatientsListRouter, GetPatientInfoRouter } from "./patients/index.js";
import { LoginRouter } from "./auth/index.js";
import { RegisterAppointmentRouter } from "./appointments/index.js";

export default () => {
    const app = Router();

    // Patients Routes
    app.use("/patients/register", RegisterPatientsRouter);
    app.use("/patients/list", GetPatientsListRouter);
    app.use("/patients/info", GetPatientInfoRouter);

    // Login Route
    app.use("/login", LoginRouter);

    // Appointment Route
    app.use("/appointments/register", RegisterAppointmentRouter);

    return app;
};