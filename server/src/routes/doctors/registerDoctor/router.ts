import { Router, type Request, type Response } from "express";
import registerDoctor from "./controller.js";
import { StatusCodes } from "http-status-codes";

const RegisterDoctorRouter = Router();

const handleRegisterDoctor = async (req: Request, res: Response) => {
    const response = await registerDoctor(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

RegisterDoctorRouter.post("/", handleRegisterDoctor);

export default RegisterDoctorRouter;