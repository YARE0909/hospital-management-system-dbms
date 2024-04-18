import { Router } from "express";
import { RegisterPatientsRouter, GetPatientsRouter } from "./patients/index.js";

export default () => {
    const app = Router();

    // Patients Routes
    app.use("/patients/register", RegisterPatientsRouter);
    app.use("/patients/get", GetPatientsRouter);

    return app;
};