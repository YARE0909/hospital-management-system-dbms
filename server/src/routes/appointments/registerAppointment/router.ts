import { Router, type Request, type Response } from "express";
import registerAppointment from "./controller.js";
import { StatusCodes } from "http-status-codes";

const RegisterAppointmentRouter = Router();

const handleRegisterAppointment = async (req: Request, res: Response) => {
    const response = await registerAppointment(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

RegisterAppointmentRouter.post("/", handleRegisterAppointment);

export default RegisterAppointmentRouter;