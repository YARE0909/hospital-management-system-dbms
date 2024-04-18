import { Router, type Request, type Response } from "express";
import getPatients from "./controller.js";
import { StatusCodes } from "http-status-codes";

const RegisterPatientsRouter = Router();

const handleRegisterPatients = async (req: Request, res: Response) => {
    const response = await getPatients(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

RegisterPatientsRouter.post("/", handleRegisterPatients);

export default RegisterPatientsRouter;