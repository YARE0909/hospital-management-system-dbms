CREATE TABLE IF NOT EXISTS departments (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS patients (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    date_of_birth DATE NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    mobile_no CHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS doctors (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    date_of_birth DATE NOT NULL,
    gender ENUM('male', 'female') NOT NULL,
    mobile_no CHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    department_id CHAR(36) NOT NULL,
    specialization VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT doctors_department_id_fk FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS appointments (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    patient_id CHAR(36) NOT NULL,
    doctor_id CHAR(36) NOT NULL,
    appointment_date DATE NOT NULL,
    status ENUM('completed', 'pending', 'cancelled', 'noShow') NOT NULL,
    type ENUM('checkUp', 'routine', 'followUp') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT appointments_patient_id_fk FOREIGN KEY (patient_id) REFERENCES patients(id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT appointments_doctor_id_fk FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS appointment_details (
    id CHAR(36) DEFAULT (UUID()) PRIMARY KEY,
    appointment_id CHAR(36) NOT NULL,
    `condition` VARCHAR(255) NOT NULL,
    prescription VARCHAR(255) NOT NULL,
    notes VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
    CONSTRAINT appointment_details_appointment_id_fk FOREIGN KEY (appointment_id) REFERENCES appointments(id) ON DELETE CASCADE ON UPDATE CASCADE
);