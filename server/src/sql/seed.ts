import fs from "fs";
import mysql from "mysql2/promise";
import "dotenv/config";

const db = await mysql.createConnection({
    user: process.env.MYSQL_USER,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_PASSWORD
});

await db.connect().then(() => console.log("Connected to MySQL"));

await db.query("START TRANSACTION");
try {
    await db.query(
        `INSERT INTO patients(first_name, last_name, date_of_birth, gender, email, mobile_no, password)
        VALUES ('John', 'Doe', '1990-01-31', 'male', 'john.doe@gmail.com', '1234567890', 'admin123')`
    );
    await db.query("INSERT INTO departments(id, name) VALUES (UUID(), 'dummyDepartment')");

    await db.query("INSERT INTO specializations(id, name, department_id) VALUES (UUID(), 'dummySpecialization', (SELECT id FROM departments WHERE name = 'dummyDepartment'))");
    await db.query(
        `INSERT INTO doctors 
        VALUES (UUID(), "Mike", "Anderson", "2004-03-31", "male", "8088175176", "doctor@gmail.com", "12341234", (SELECT id FROM specializations WHERE name = 'dummySpecialization'), NOW(), NOW());`
    );
    await db.query(
        `INSERT INTO appointments 
        VALUES (UUID(), (SELECT id FROM patients LIMIT 1), (SELECT id FROM doctors LIMIT 1), "2024-06-01", "completed", "checkUp", NOW(), NOW());`
    );
    await db.query(
        `INSERT INTO appointments 
        VALUES (UUID(), (SELECT id FROM patients LIMIT 1), (SELECT id FROM doctors LIMIT 1), "2024-05-31", "completed", "routine", NOW(), NOW());`
    );
    await db.query(
        `INSERT INTO appointments 
        VALUES (UUID(), (SELECT id FROM patients LIMIT 1), (SELECT id FROM doctors LIMIT 1), "2023-01-01", "pending", "checkUp", NOW(), NOW());`
    );
    await db.query("COMMIT");
    console.log("Tables seeded successfully!");
} catch (error) {
    await db.query("ROLLBACK");
    console.log(error);
}

await db.end().then(() => console.log("Connection closed"));