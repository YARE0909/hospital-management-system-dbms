import { Router, type Request, type Response } from "express";
import getDoctorInfo from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetDoctorInfoRouter = Router();

const handleGetDoctorInfo = async (req: Request, res: Response) => {
    const response = await getDoctorInfo(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetDoctorInfoRouter.post("/", handleGetDoctorInfo);

export default GetDoctorInfoRouter;