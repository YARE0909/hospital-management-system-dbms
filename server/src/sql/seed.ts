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
    // await db.query(
    //     `INSERT INTO patients(first_name, last_name, date_of_birth, gender, email, mobile_no, password)
    //     VALUES ('John', 'Doe', '1990-01-31', 'male', 'john.doe@gmail.com', '1234567890', 'admin123')`
    // );
    // await db.query("INSERT INTO departments(id, name) VALUES (UUID(), 'dummyDepartment')");

    // await db.query("INSERT INTO specializations(id, name, department_id) VALUES (UUID(), 'dummySpecialization', (SELECT id FROM departments WHERE name = 'dummyDepartment'))");
    // await db.query(
    //     `INSERT INTO doctors 
    //     VALUES (UUID(), "Mike", "Anderson", "2004-03-31", "male", "8088175176", "doctor@gmail.com", "12341234", (SELECT id FROM specializations WHERE name = 'dummySpecialization'), NOW(), NOW());`
    // );
    // await db.query(
    //     `INSERT INTO appointments 
    //     VALUES (UUID(), (SELECT id FROM patients LIMIT 1), (SELECT id FROM doctors LIMIT 1), "2024-06-01", "completed", "checkUp", NOW(), NOW());`
    // );
    // await db.query(
    //     `INSERT INTO appointments 
    //     VALUES (UUID(), (SELECT id FROM patients LIMIT 1), (SELECT id FROM doctors LIMIT 1), "2024-05-31", "completed", "routine", NOW(), NOW());`
    // );
    // await db.query(
    //     `INSERT INTO appointments 
    //     VALUES (UUID(), (SELECT id FROM patients LIMIT 1), (SELECT id FROM doctors LIMIT 1), "2023-01-01", "pending", "checkUp", NOW(), NOW());`
    // );


    await db.query(`
    INSERT INTO departments (name) VALUES
    ('Cardiology'),
    ('Neurology'),
    ('Orthopedics'),
    ('Dermatology'),
    ('Pediatrics');
    `);

    await db.query(`
    INSERT INTO specializations (name, department_id)
    SELECT
        CONCAT('Specialization ', SUBSTRING(MD5(RAND()) FROM 1 FOR 5)),
        id
    FROM departments
    ORDER BY RAND()
    LIMIT 20;
    `);

    await db.query(`
    INSERT INTO patients (first_name, last_name, date_of_birth, gender, mobile_no, email, password)
    SELECT
        CONCAT('Patient', SUBSTRING(MD5(RAND()) FROM 1 FOR 5)),
        CONCAT('LastName', SUBSTRING(MD5(RAND()) FROM 1 FOR 5)),
        DATE_SUB(NOW(), INTERVAL FLOOR(10 + RAND() * 60) YEAR),
        IF(RAND() < 0.5, 'male', 'female'),
        LPAD(FLOOR(100000000 + RAND() * 900000000), 10, '0'),
        CONCAT('patient', SUBSTRING(MD5(RAND()) FROM 1 FOR 5), '@example.com'),
        MD5(RAND())
    FROM information_schema.tables
    LIMIT 20;
    `)

    await db.query(`
    INSERT INTO doctors (first_name, last_name, date_of_birth, gender, mobile_no, email, password, specialization_id)
    SELECT
        CONCAT('Doctor', SUBSTRING(MD5(RAND()) FROM 1 FOR 5)),
        CONCAT('LastName', SUBSTRING(MD5(RAND()) FROM 1 FOR 5)),
        DATE_SUB(NOW(), INTERVAL FLOOR(25 + RAND() * 40) YEAR),
        IF(RAND() < 0.5, 'male', 'female'),
        LPAD(FLOOR(100000000 + RAND() * 900000000), 10, '0'),
        CONCAT('doctor', SUBSTRING(MD5(RAND()) FROM 1 FOR 5), '@example.com'),
        MD5(RAND()),
        (SELECT id FROM specializations ORDER BY RAND() LIMIT 1)
    FROM information_schema.tables
    LIMIT 20;
    `);

    await db.query(`
    INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, type)
    SELECT
        p.id,
        d.id,
        rand_date_between(DATE_SUB(NOW(), INTERVAL 1 YEAR), NOW()),
        CASE
            WHEN RAND() < 0.7 THEN 'pending'
            ELSE 'completed'
        END,
        CASE
            WHEN RAND() < 0.3 THEN 'initialCheckUp'
            WHEN RAND() BETWEEN 0.3 AND 0.6 THEN 'routine'
            ELSE 'followUp'
        END
    FROM patients p
    CROSS JOIN doctors d
    ORDER BY RAND()
    LIMIT 20;
    `);

    await db.query(`
    INSERT INTO appointments (patient_id, doctor_id, appointment_date, status, type)
    SELECT
        p.id,
        d.id,
        DATE_ADD(app1.appointment_date, INTERVAL FLOOR(1 + RAND() * 7) DAY),
        CASE
            WHEN RAND() < 0.7 THEN 'pending'
            ELSE 'completed'
        END,
        CASE
            WHEN RAND() < 0.3 THEN 'initialCheckUp'
            WHEN RAND() BETWEEN 0.3 AND 0.6 THEN 'routine'
            ELSE 'followUp'
        END
    FROM appointments app1
    JOIN patients p ON app1.patient_id = p.id
    JOIN doctors d ON app1.doctor_id = d.id
    ORDER BY RAND()
    LIMIT 10;
    `);

    await db.query(`
    INSERT INTO appointment_details (appointment_id, \`condition\`, prescription, notes)
    SELECT
        a.id,
        CONCAT('Condition for Appointment ', a.id),
        CONCAT('Prescription for Appointment ', a.id),
        CONCAT('Notes for Appointment ', a.id)
    FROM appointments a
    ORDER BY RAND()
    LIMIT 20;
    `);

    await db.query(`
    INSERT INTO medical_records (appointment_id, height, weight, blood_pressure)
    SELECT
        a.id,
        ROUND(150 + RAND() * 50, 2),  -- Generate random height between 150 and 200 cm
        ROUND(50 + RAND() * 50, 2),   -- Generate random weight between 50 and 100 kg
        FLOOR(90 + RAND() * 30)       -- Generate random blood pressure between 90 and 120 mmHg
    FROM appointments a
    ORDER BY RAND()
    LIMIT 20;
    `);

    await db.query("COMMIT");

    console.log("Tables seeded successfully!");
} catch (error) {
    await db.query("ROLLBACK");
    console.log(error);
}

await db.end().then(() => console.log("Connection closed"));