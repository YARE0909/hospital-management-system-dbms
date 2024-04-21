import { Router } from "express";
import { RegisterPatientsRouter, GetPatientsListRouter, GetPatientInfoRouter } from "./patients/index.js";
import { LoginRouter } from "./auth/index.js";
import { RegisterAppointmentRouter, GetAppointmentListRouter, GetAppointmentInfoRouter } from "./appointments/index.js";
import { GetStatisticsRouter } from "./statistics/index.js";
import { GetDoctorsListRouter } from "./doctors/index.js";

export default () => {
    const app = Router();

    // Patients Routes
    app.use("/patients/register", RegisterPatientsRouter);
    app.use("/patients/list", GetPatientsListRouter);
    app.use("/patients/info", GetPatientInfoRouter);

    // Doctors Routes
    app.use("/doctors/list", GetDoctorsListRouter)

    // Login Route
    app.use("/login", LoginRouter);

    // Appointment Route
    app.use("/appointments/register", RegisterAppointmentRouter);
    app.use("/appointments/list", GetAppointmentListRouter);
    app.use("/appointments/info", GetAppointmentInfoRouter)

    // Statistics Route
    app.use("/statistics", GetStatisticsRouter);

    return app;
};