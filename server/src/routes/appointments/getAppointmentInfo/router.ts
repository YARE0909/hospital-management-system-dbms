import { Router, type Request, type Response } from "express";
import getAppointmentInfo from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetAppointmentInfoRouter = Router();

const handleGetAppointmentInfo = async (req: Request, res: Response) => {
    const response = await getAppointmentInfo(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetAppointmentInfoRouter.post("/", handleGetAppointmentInfo);

export default GetAppointmentInfoRouter;