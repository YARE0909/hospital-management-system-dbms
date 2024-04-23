import { Router, type Request, type Response } from "express";
import getDepartments from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetDepartmentsRouter = Router();

const handleGetDepartments = async (req: Request, res: Response) => {
    const response = await getDepartments(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetDepartmentsRouter.get("/", handleGetDepartments);

export default GetDepartmentsRouter;