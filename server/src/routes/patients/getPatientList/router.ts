import { Router, type Request, type Response } from "express";
import getPatientsList from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetPatientsListRouter = Router();

const handleGetPatients = async (req: Request, res: Response) => {
    const response = await getPatientsList(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetPatientsListRouter.get("/", handleGetPatients);

export default GetPatientsListRouter;