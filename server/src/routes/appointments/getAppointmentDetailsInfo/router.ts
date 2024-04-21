import { Router, type Request, type Response } from "express";
import getAppointmentDetailsInfo from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetAppointmentDetailsInfoRouter = Router();

const handleGetAppointmentDetailsInfo = async (req: Request, res: Response) => {
    const response = await getAppointmentDetailsInfo(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetAppointmentDetailsInfoRouter.post("/", handleGetAppointmentDetailsInfo);

export default GetAppointmentDetailsInfoRouter;