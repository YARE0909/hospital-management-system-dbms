import { Router, type Request, type Response } from "express";
import getPatients from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetPatientsRouter = Router();

const handleGetPatients = async (req: Request, res: Response) => {
    const response = await getPatients(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetPatientsRouter.get("/", handleGetPatients);

export default GetPatientsRouter;