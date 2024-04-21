import { Router, type Request, type Response } from "express";
import addAppointmentDetails from "./controller.js";
import { StatusCodes } from "http-status-codes";

const AddAppointmentDetailsRouter = Router();

const handleAddAppointmentDetails = async (req: Request, res: Response) => {
    const response = await addAppointmentDetails(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

AddAppointmentDetailsRouter.post("/", handleAddAppointmentDetails);

export default AddAppointmentDetailsRouter;