import { Router, type Request, type Response } from "express";
import getPatientInfo from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetPatientInfoRouter = Router();

const handleGetPatientInfo = async (req: Request, res: Response) => {
    const response = await getPatientInfo(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetPatientInfoRouter.post("/", handleGetPatientInfo);

export default GetPatientInfoRouter;