import { Router, type Request, type Response } from "express";
import getAppointmentList from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetAppointmentListRouter = Router();

const handleGetAppointmentList = async (req: Request, res: Response) => {
    const response = await getAppointmentList(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetAppointmentListRouter.get("/", handleGetAppointmentList);

export default GetAppointmentListRouter;