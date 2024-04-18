import express from "express";
import bodyParser from "body-parser";
import routes from "./routes/index.js";
import "dotenv/config";
import { validateEnv } from "./frameworks/utils/validateEnv.js";
import cors from "cors";

validateEnv();

const app = express();

app.use(cors()); // Use the cors middleware to enable CORS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(routes());

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
