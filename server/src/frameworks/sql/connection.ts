import mysql from "mysql2/promise";

let connectionInstance: mysql.Connection | null = null;

async function getConnection() {
    if (!connectionInstance) {
        connectionInstance = await mysql.createConnection({
            user: process.env.MYSQL_USER,
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            database: process.env.MYSQL_DATABASE,
            password: process.env.MYSQL_PASSWORD
        });
    }

    return connectionInstance;
}

export const db = await getConnection();
