import { Router, type Request, type Response } from "express";
import getSpecializations from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetSpecializationsRouter = Router();

const handleGetSpecializations = async (req: Request, res: Response) => {
    const response = await getSpecializations(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetSpecializationsRouter.get("/", handleGetSpecializations);

export default GetSpecializationsRouter;