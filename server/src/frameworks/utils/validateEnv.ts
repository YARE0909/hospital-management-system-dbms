import { cleanEnv, str, port } from "envalid";
import "dotenv/config";

export function validateEnv() {
    cleanEnv(process.env, {
        PORT: port(),
        MYSQL_USER: str(),
        MYSQL_HOST: str(),
        MYSQL_PORT: port(),
        MYSQL_DATABASE: str(),
        MYSQL_PASSWORD: str()
    });
}