import { Router, type Request, type Response } from "express";
import getDoctorsList from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetDoctorsListRouter = Router();

const handleGetDoctorsList = async (req: Request, res: Response) => {
    const response = await getDoctorsList(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetDoctorsListRouter.get("/", handleGetDoctorsList);

export default GetDoctorsListRouter;