import { Router, type Request, type Response } from "express";
import login from "./controller.js";
import { StatusCodes } from "http-status-codes";

const LoginRouter = Router();

const handleLogin = async (req: Request, res: Response) => {
    const response = await login(req, res);
    const status = response.hasError ? StatusCodes.UNPROCESSABLE_ENTITY : StatusCodes.OK;
    res.status(status).send(response);
};

LoginRouter.post("/", handleLogin);

export default LoginRouter;