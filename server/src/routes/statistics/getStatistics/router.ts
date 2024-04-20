import { Router, type Request, type Response } from "express";
import getStatistics from "./controller.js";
import { StatusCodes } from "http-status-codes";

const GetStatisticsRouter = Router();

const handleGetStatistics = async (req: Request, res: Response) => {
    const response = await getStatistics(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

GetStatisticsRouter.get("/", handleGetStatistics);

export default GetStatisticsRouter;