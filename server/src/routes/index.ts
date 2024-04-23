import { Router } from "express";
import { RegisterPatientsRouter, GetPatientsListRouter, GetPatientInfoRouter } from "./patients/index.js";
import { RegisterAppointmentRouter, GetAppointmentListRouter, GetAppointmentInfoRouter, AddAppointmentDetailsRouter } from "./appointments/index.js";
import { GetDoctorsListRouter, GetDoctorInfoRouter, RegisterDoctorRouter } from "./doctors/index.js";
import { LoginRouter } from "./auth/index.js";
import { GetStatisticsRouter } from "./statistics/index.js";
import { GetDepartmentsRouter } from "./departments/index.js";

export default () => {
    const app = Router();

    // Patients Routes
    app.use("/patients/register", RegisterPatientsRouter);
    app.use("/patients/list", GetPatientsListRouter);
    app.use("/patients/info", GetPatientInfoRouter);

    // Doctors Routes
    app.use("/doctors/list", GetDoctorsListRouter);
    app.use("/doctors/info", GetDoctorInfoRouter);
    app.use("/doctors/register", RegisterDoctorRouter);

    // Login Route
    app.use("/login", LoginRouter);

    // Appointment Route
    app.use("/appointments/register", RegisterAppointmentRouter);
    app.use("/appointments/list", GetAppointmentListRouter);
    app.use("/appointments/info", GetAppointmentInfoRouter);
    app.use("/appointmentDetails/add", AddAppointmentDetailsRouter);

    // Statistics Route
    app.use("/statistics", GetStatisticsRouter);

    // Departments Route
    app.use("/departments", GetDepartmentsRouter);

    return app;
};