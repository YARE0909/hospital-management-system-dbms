import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import "dotenv/config";

const filePath = import.meta.url.replace('file:///', '');
const initSqlPath = path.resolve(path.dirname(filePath), '../../src/sql/init.sql')
console.log(initSqlPath);

const sqlScripts = fs.readFileSync(initSqlPath, 'utf8')
    .toString()
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/\s+/g, ' ')
    .split(";")
    .map(Function.prototype.call, String.prototype.trim)
    .filter(function (el) { return el.length != 0 });

const db = await mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
});

await db.connect().then(() => console.log("Connected to MySQL"));

try {
    await db.beginTransaction();
    const promises = sqlScripts.map(async (script: string) => db.query(script));
    await Promise.all(promises);
    await db.commit();

    console.log("Tables created successfully!");
} catch (error) {
    await db.rollback();
    console.error(error);
}

await db.end().then(() => console.log("Connection closed"));