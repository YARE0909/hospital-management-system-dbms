import express from "express";
import { Request, Response } from "express";
import mysql from "mysql";
import bodyParser from "body-parser";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ferrari@2004",
  database: "hospitalmanagementsystem",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to database: ", err);
    return;
  }
  console.log("Connected to database!");
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/patients", (req: Request, res: Response) => {
  connection.query("SELECT * FROM patient", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.post("/patients", (req: Request, res: Response) => {
  const { name, sex, address, contact } = req.body;

  console.log(req.body);

  if (!name || !sex || !address || !contact) {
    return res.status(400).send("Missing required fields");
  }

  const id = Math.floor(Math.random() * 1000);

  connection.query(
    "INSERT INTO patient (id, name, sex, address, contact) VALUES (?, ?, ?, ?, ?)",
    [id, name, sex, address, contact],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into database: ", err);
        return res.status(500).send("Error inserting data into database");
      }
      console.log("Data inserted into database successfully");
      // Respond with the inserted data or an appropriate success message
      res.status(201).send("Data inserted into database successfully");
    }
  );
});

app.get("/employee", (req: Request, res: Response) => {
  connection.query("SELECT * FROM employee", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.post("/employee", (req: Request, res: Response) => {
  const { name, position, department, salary } = req.body;

  console.log(req.body);

  if (!name || !position || !department || !salary) {
    return res.status(400).send("Missing required fields");
  }

  const id = Math.floor(Math.random() * 1000);
  const hireDate = new Date().toISOString().slice(0, 19).replace("T", " ");

  connection.query(
    "INSERT INTO employee (id, name, position, department, salary, hire_date) VALUES (?, ?, ?, ?, ?, ?)",
    [id, name, position, department, salary, hireDate],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into database: ", err);
        return res.status(500).send("Error inserting data into database");
      }
      console.log("Data inserted into database successfully");
      // Respond with the inserted data or an appropriate success message
      res.status(201).send("Data inserted into database successfully");
    }
  );
});

app.get("/doctor", (req: Request, res: Response) => {
  connection.query("SELECT * FROM doctor", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.post("/doctor", (req: Request, res: Response) => {
  const { employeeId, specialization } = req.body;

  console.log(req.body);

  if (!employeeId || !specialization) {
    return res.status(400).send("Missing required fields");
  }

  connection.query(
    "INSERT INTO doctor (employee_Id, specialization) VALUES (?, ?)",
    [employeeId, specialization],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into database: ", err);
        return res.status(500).send("Error inserting data into database");
      }
      console.log("Data inserted into database successfully");
      // Respond with the inserted data or an appropriate success message
      res.status(201).send("Data inserted into database successfully");
    }
  );
});

app.get("/nurse", (req: Request, res: Response) => {
  connection.query("SELECT * FROM nurse", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.post("/nurse", (req: Request, res: Response) => {
  const { employeeId, department } = req.body;

  console.log(req.body);

  if (!employeeId || !department) {
    return res.status(400).send("Missing required fields");
  }

  connection.query(
    "INSERT INTO nurse (employee_Id, department) VALUES (?, ?)",
    [employeeId, department],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into database: ", err);
        return res.status(500).send("Error inserting data into database");
      }
      console.log("Data inserted into database successfully");
      // Respond with the inserted data or an appropriate success message
      res.status(201).send("Data inserted into database successfully");
    }
  );
});

app.get("/prescription", (req: Request, res: Response) => {
  connection.query("SELECT * FROM prescription", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.post("/prescription", (req: Request, res: Response) => {
  const { prescriptionId, patientId, medicationId, dosage } = req.body;

  console.log(req.body);

  if (!prescriptionId || !medicationId || !dosage || !patientId) {
    return res.status(400).send("Missing required fields");
  }

  const id = Math.floor(Math.random() * 1000);
  const prescriptionDate = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  connection.query(
    "INSERT INTO prescription (prescription_id, patient_id, medication_id, dosage, prescription_date) VALUES (?, ?, ?, ?. ?)",
    [id, patientId, medicationId, dosage, prescriptionDate],
    (err, results) => {
      if (err) {
        console.error("Error inserting data into database: ", err);
        return res.status(500).send("Error inserting data into database");
      }
      console.log("Data inserted into database successfully");
      // Respond with the inserted data or an appropriate success message
      res.status(201).send("Data inserted into database successfully");
    }
  );
});

app.get("/record", (req: Request, res: Response) => {
  connection.query("SELECT * FROM record", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.get("/room", (req: Request, res: Response) => {
  connection.query("SELECT * FROM room", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.get("/medication", (req: Request, res: Response) => {
  connection.query("SELECT * FROM medication", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.get("/medicine", (req: Request, res: Response) => {
  connection.query("SELECT * FROM medicine", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.get("/tables", (req: Request, res: Response) => {
  connection.query("SHOW TABLES", (err, results) => {
    if (err) {
      console.error("Error connecting to database: ", err);
      res.send("Error connecting to database");
      return;
    }
    res.send(results);
  });
});

app.listen(3000, () => {
  console.log("Application started on port 3000!");
});
